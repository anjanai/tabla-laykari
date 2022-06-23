const abcd = "C2 C4 D4 E4 F4 G4 A4 B4 C5 D5".split(/\s/);
const srgm = "- s r g m p d n S R".split(' ');

const notemap =  abcd.reduce(function(notemap, field, index) {
  notemap[srgm[index]] = field;
  return notemap;
}, {})

const comps = [
    {
	name: `Khanda Jaati Chakradaar`,
	bols: `धागेतिटक	तगदीगने		नागेतिटक	तगदीगने
धा-ति-धा	-क्डधा-ने	धा-ति-धा	-क्डधा-ने
धा-ति-धा	-क्डधा-ने	धा---- `.repeat(3),
	notes: `srrgg  mmppd  rggmm ppddn
S-n-S -RS-R S-n-S -RS-R
S-n-S -RS-R S---- `.repeat(3),
	bpb: 5,
    },
    
];  


const sampler = new Tone.Sampler({
    urls: {
	A4: "A4.mp3",
	C4: "C4.mp3",
	'D#4': "Ds4.mp3",
	'F#4': "Fs4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

let tempo=20;

function show_tempo_value(t) {
    document.getElementById("tempo_value").innerHTML=t;
    tempo = t;
}


let bg;
let clap = new Audio( 'clap.wav');

async function playnotes(notes,index) {
    let i=0;
    let j=0;
    let prevnote;
    console.log (notes);
    for ( note of notes) {
	if (i++==0) {
	    clap.play();
	    $('#'+index+'_'+j).css("background-color","silver");
	}

	sampler.triggerAttackRelease(note, "2n");

	await sleep(60000/tempo/comps[index].bpb);
	if (i==comps[index].bpb) {
	     i=0;
	    $('#'+index+'_'+j++).css("background-color", bg);
	}
	
    }
}

// Creation of an AbortController signal
let controller;
let signal;


function sleep(ms) {
    //return new Promise(resolve => setTimeout(resolve, ms));
    if (signal.aborted)
	return Promise.reject(new DOMException('Aborted', 'AbortError'));
	
    return new Promise((resolve, reject) => {
	const timeout = window.setTimeout(resolve, ms, 'Promise Resolved')
	// Listen for abort event on signal
	signal.addEventListener('abort', () => {
	    window.clearTimeout(timeout);
	    reject(new DOMException('Aborted', 'AbortError'));
	});
    });
}

function start () {
    let audio = new Audio( 'clap.wav');
    audio.play();
}

$( document ).ready(function() {
    let tr = "<tr>"
    for (let i=0; i<comps.length; i++) {
	tr += `<td ><a href=# onClick=play_comp(this.innerText-1)>${i+1}</a>`;
	tr += `<td>${comps[i].name}</a>`;
	tr += make_table(i);
	tr += "</tr>";
	$("#comps").append(tr);
    }
    bg =  $('.table-dark').css("background-color");
    document.getElementById("tempo_slider").value = tempo;
});

function play_comp(index) {
    controller = new AbortController();
    signal = controller.signal;
    
    let str = comps[index].notes;
    let  sequence = [];
    let j=0;
    for (i=0; i<str.length; i++) {
	if (str[i].trim() === '') continue;
	if (str[i] in notemap) 
	    sequence.push(notemap[str[i]]);
	else
	    sequence.push(str[i]);
    }
    playnotes(sequence,index);
};


function make_table (index) {
    let str = comps[index].bols;
    let table = `<table class=" table-bordered comp-table">`;
    let arr = str.trim().split(/\s+/);
    for (let i=0; i<arr.length; i++) {
	if (i%4 == 0) table += '<tr>';
	id = index + "_" + i;
	console.log (id);
	table += `<td id=${id}>${arr[i]}</td>`;
	if (i%4 == 3) table += '</tr>';
    }
    table += `</table>`;
    return table;
};    
