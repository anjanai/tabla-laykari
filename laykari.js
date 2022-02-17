const patterns = [
    "", "1", "1-", "1-1", "1-1-",
    "1-1-." , "1-1-..", "1-1-...", "1-1-....",
    "1-1-.1-1-", "1-1-..1-1-", "1-1-...1-1-", "1-1-....1-1-",
    "1-1-1-.1-1-1-", "1-1-1-..1-1-1-", "1-1-1-...1-1-1-" , "1-1-1-....1-1-1-",
];

$( document ).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const n = urlParams.get('n');
    let gaps = urlParams.get('gaps');
    if (gaps === "") gaps = 1;
	
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
	
	let arr = str.match(new RegExp('.{1,' + n + '}', 'g'));
	let tr = "<tr>";
	tr += "<th>" + i + "</th>";
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
 

