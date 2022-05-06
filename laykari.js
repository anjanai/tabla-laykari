const patterns = [
    "", "1", "1-", "1-1", "1-1-",
    "1-1-." , "1-1-..", "1-1-...", "1-1-....",
    "1-1-.1-1-", "1-1-..1-1-", "1-1-...1-1-", "1-1-....1-1-",
    "1-1-1-.1-1-1-", "1-1-1-..1-1-1-", "1-1-1-...1-1-1-" , "1-1-1-....1-1-1-",
];

const notes = "C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C5 D5".split(/\s/);
const sampler = new Tone.Sampler({
    urls: {
	A4: "A4.mp3",
	C4: "C4.mp3",
	'D#4': "Ds4.mp3",
	'F#4': "Fs4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination();

let n=0;
let tempo=100;

function show_tempo_value(t) {
    document.getElementById("tempo_value").innerHTML=t;
}

function play(link) {
    const urlParams = new URLSearchParams(window.location.search);
    let m = link.innerText;
    let sequence = [];
    for (i=0; i<n; i++)
	for (j=0; j<m; j++)
	    sequence.push(notes[i]);
    playnotes(sequence);
}
    

async function playnotes(notes) {
    let audio = new Audio( 'clap.wav');
    let i=0;
    for ( note of notes) {
	if (i++==0) audio.play();
	sampler.triggerAttackRelease(note, "2n");
	if (i==n) i=0;
	await sleep(60000/tempo);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start () {
    let audio = new Audio( 'clap.wav');
    audio.play();
}

$( document ).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    n = urlParams.get('n');
    let gaps = urlParams.get('gaps');
    if (gaps === "") gaps = 1;
    if (! n) {
	alert ("<n> not specified in url parameters: using n=5&gaps");
	n = 5;
	gaps = 1;
    }
	
    for (let i=1; i<=16; i++) {
	let str = "";

	for (let j=1; j<=n; j++)
	    str += patterns[i].replaceAll("1", j.toString());
	    
	if (! gaps) {
	    str = str.split('');
	    let digit;
	    for (let j=0; j<str.length; j++) {
		if (str[j] > '0' && str[j] <= '9') digit = str[j];
		else str[j] = digit;
	    }
	    str = str.join('');
	}

	// Template literals with backticks
	let arr = str.match(new RegExp(`.{${n}}`, 'g'));
	let tr = "<tr>";
	tr += "<th>" + '<a href=# onClick=play(this)>' + i + "</a></th>";
	let prev_digit = 0;
	$.each(arr, function(_, val) {
	    tr += "<td>";
	    let digits = val.split('');
	    $.each(digits, function (_, digit) {
		if (digit > "0" && digit <= "9" && digit != prev_digit) {
		    tr += "<font color=salmon>" + digit + "</font>";
		    prev_digit = digit;
		} else
		    tr += digit;
	    });
	});
	tr += "</tr>";
	$('#laykari').append(tr);

	//console.log (str);
    }
});
 

