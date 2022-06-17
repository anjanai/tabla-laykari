
const angas = `anudrut 1 U
 drut 2 O
laghu 3/4/5/7/9 |
guru 8 S
plut 12 8
kaakpaad 16 +`.split(/\s+/);;

const taals = `dhruv |O|| mathya |O| roopak O| jhampa |U triputa |OO atta ||OO ek |`.split(' ');

let symbol2name = [];
let symbol2value = [];
let akshars = [];

$( document ).ready(function() {
    let tr = "<tr>";
    $.each("Anga Value Symbol".split(' '), function (_,val) {
	tr += `<th>${val}</th>`;
    });
    tr += "</tr>";
    tr += "<tr>";
    for (let i=0; i<angas.length;) {
	symbol2name[angas[i+2]] = angas[i];
	symbol2value[angas[i+2]] = angas[i+1];
	for (let j=0; j<3; j++,i++) tr += `<td>${angas[i]}</td>`;
        tr += "</tr>";
    }
    $("#angas").append(tr);

    
    tr = "<tr>";
    $.each("Taal Symbol Angas Tishra Chatushra Khanda Mishra Sankeerna".split(' '), function (_,val) {
	tr += `<th>${val}</th>`;
    });
    tr += "</tr>";
    for (let i=0; i<taals.length;) {
	let symbol = taals[i+1];
	for (let j=0; j<2; j++,i++) tr += `<td>${taals[i]}</td>`;
	tr += `<td>${get_angas(symbol)}</td>`;
	tr += get_values(symbol);
        tr += "</tr>";
    }
    $('#taals').append(tr);

    tr = "";
    for (let i=0; i<taals.length;i+=2) {
	let symbol = taals[i+1];
	tr += "<tr>";
	tr += `<td class="text-center table-success" colspan=5>Taal : ${taals[i]} ${symbol}</td>`;
	tr += "</tr>";
	tr += "<tr>";

	$.each("3 4 5 7 9".split(' '), function (_,jaati) {
	    //tr += `<td>${jaati}</td>`;
	    //tr += `<td>${akshars[symbol+jaati]}</td>`;
	    //tr += "</tr">;
	    
	    tr += gati_table(akshars[symbol+jaati],jaati);
	});

    	tr += `</tr>`;
    }

    $('#gatis').append(tr);
    
});

function gati_table(total,jaati) {
    let n = parseInt(total.split(' ').pop());
    let str = `<td class="text-center">${jaati}<br>${total}<br>`;
    str += `<table class="table-sm table-bordered"><tr><td>Gati</td>`;
    $.each("3 4 5 7 9".split(' '), function (_,gati) {
	str += `<td>${gati}</td>`;
    });
    str += "</tr><tr><td>Maatras</td>";
    $.each("3 4 5 7 9".split(' '), function (_,gati) {
	str += `<td>${gati*n}</td>`;
    });
    str += "</tr></table>";
    return str;
}

		    

function get_values(symbol) {
    str = '';
    $.each("3 4 5 7 9".split(' '), function (_,val) {
	let total=0;
	let td = '';
	$.each(symbol.split(''), function (_,c) {
	    let ch = ( c == '|' ? val : symbol2value[c]);
	    td += ch + " ";
	    total += parseInt(ch);
	});
	td += "= " + total;
	akshars[symbol+val] = td;
	str += `<td>${td}</td>`;
    });
    return str;
}

function get_angas(symbol) {
    let str='';
    $.each(symbol.split(''), function (_,c) {
	str += symbol2name[c] + " ";
    });
    return str;
}

