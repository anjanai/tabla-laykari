const pattern = "1---2---3---4---5---6---7---";

const notes = "C4 D4 E4 F4 G4 A4 B4 C5 C5 B4 A4 G4 E4 D4 C4".split(/\s/);
const srgm = "s r g m p d n S S n d p m g r s";

const sampler = new Tone.Sampler({
    urls: {
	A4: "A4.mp3",
	C4: "C4.mp3",
	'D#4': "Ds4.mp3",
	'F#4': "Fs4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

let tempo=100;

function show_tempo_value(t) {
    document.getElementById("tempo_value").innerHTML=t;
    tempo = t;
}

// Creation of an AbortController signal
let controller;
let signal;


function playRow(m) {
    controller = new AbortController();
    signal = controller.signal;
    let sequence = [];
    let str = pattern.substring(0,m*4);
    console.log (str, str.len, str.length);
    let j=0;
    for (i=0; i<str.length; i++) {
	if (str[i] > '0' && str[i] <= '9')
	    sequence.push(notes[j++]);
	else
	    sequence.push("-");
    }
    console.log (sequence);
    playnotes(sequence,m);
}

let bg;
let clap = new Audio( 'clap.wav');

async function playnotes(notes,m) {
    let i=0;
    let j=1;
    let prevnote;
    for ( note of notes) {
	if (i++==0) {
	    clap.play();
	    $('#'+m+'_'+j).css("background-color","silver");
	}
	if (note != "-")
	    sampler.triggerAttackRelease(note, "2n");

	await sleep(60000/tempo/m);
	if (i==m) {
	    i=0;
	    $('#'+m+'_'+j++).css("background-color", bg);
	}
	
    }
}



function stopAudio() {
    controller.abort();
    $('td').css("background-color",bg);
}
    

async function startAudio() {
    for (let i=1; i<=7; i++) {
	playRow(i);
	await sleep (4 * 60000/tempo);
    }
}


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
    for (let i=1; i<=7; i++) {
	let arr = pattern.match(new RegExp(`.{${i}}`, 'g')).slice(0,4);
	let tr  = "<tr>";
	tr += "<th>" + '<a href=# onClick=playRow(this.innerText)>' + i + "</a></th>";
	let prev_digit = 0;
	j = 1;
	$.each(arr, function(_, val) {
	    tr += `<td id=${i}_${j++}>`;
	    let digits = val.split('');
	    $.each(digits, function (_, digit) {
		if (digit > "0" && digit <= "9" && digit != prev_digit) {
		    tr += "<font color=salmon>" + digit + "</font>";
		    prev_digit = digit;
		} else
		    tr += digit;
	    });
	    tr += "</td>";
	});
	tr += "</tr>";
	$('#laykari').append(tr);
    }
    bg =  $('.table-dark').css("background-color");
});
 

