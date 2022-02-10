// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

$( document ).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const n = urlParams.get('n');

    for (let i=1; i<16; i++) {
	//console.log ("i = {0}".format(i));
	let str = "";
	for (let j=1; j<=n; j++) {
	    let jstr = j.toString();
	    str += jstr;
	    for (let k=1; k<i; k++)
		str += k%2 ? "-" : jstr;
	}

	let arr = str.match(new RegExp('.{1,' + n + '}', 'g'));
	console.log (arr);
	let tr = $('<tr>');
	$('<th>').html(i).appendTo(tr);  
	$.each(arr, function(_, val) {
	    $('<td>').html(val).appendTo(tr);  
	});
	$('#laykari').append(tr);

	//console.log (str);
    }
});
 

