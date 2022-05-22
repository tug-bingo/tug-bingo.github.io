var total_selected = 0

function shuffle(array) {
    var i = array.length,
	j = 0,
	temp;

    while (i--) {
	j = Math.floor(Math.random() * (i+1));

	// swap randomly chosen element with current element
	temp = array[i];
	array[i] = array[j];
	array[j] = temp;
    }
    return array;
}

function clear_all(){
    clear_button.disabled=true;
    //var cells = document.getElementsByTagName('td');
    for(var i = 0; i < cells.length; i++)
	if(i != 12)
	    cells[i].className='';
    total_selected = 0;
}
function bingo_phrase() {
    alert('BINGO!!!');
}

function bingo_check_diagonal_backslash(cell) {
    var num = 1;

    for(var l = cell + 6; num < 5 && (cells[l].className == 'selected' || cells[l].className == 'center-spot'); l += 6)
	++num;

    if( num == 5 ) setTimeout(bingo_phrase, 100);
}

function bingo_check_diagonal_slash(cell) {
    var num = 1;

    for(var l = cell + 4; num < 5 && (cells[l].className == 'selected' || cells[l].className == 'center-spot'); l += 4)
	++num;

    if( num == 5 ) setTimeout(bingo_phrase, 100);
}

function bingo_check_column(col) {
    var num = 1;

    for(var j = col + 5; num < 5 && (cells[j].className == 'selected' || cells[j].className == 'center-spot'); j += 5)
	++num;

    if( num == 5 ) setTimeout(bingo_phrase, 100);
}

function bingo_check_line(line) {
    var num = 1;

    for(var k = (line * 5) + 1; num < 5 && (cells[k].className == 'selected' || cells[k].className == 'center-spot'); ++k )
	++num;

    if( num == 5 ) setTimeout(bingo_phrase, 100);
}

function is_bingo() {
    if( cells[0].className == 'selected' ) bingo_check_diagonal_backslash(0);
    if( cells[4].className == 'selected' ) bingo_check_diagonal_slash(4);

    for( var i = 0; i < 5; ++i ) {
	if( cells[i].className == 'selected' ) bingo_check_column(i);
	if( cells[5*i].className == 'selected') bingo_check_line(i);
    }
}

function make_card(){
    clear_all();
    var shuffled_values = shuffle(values);
    for(var i = 0; i < cells.length; i++) {
	if(i != 12){
	    var cell = cells[i];
	    cell.innerHTML = shuffled_values[i];
	    cell.onclick = function(event) {
		document.getElementById('clear_all_button').disabled=false;
		e = event.srcElement;
		if(e.className=='selected'){
		    e.className='';
		    total_selected--;
		    if(total_selected == 0)
			document.getElementById('clear_all_button').disabled=true;
		} else {
		    e.className='selected';
		    total_selected++;
		    is_bingo();
		}
	    }
	}
    }
}

window.onload = function() {
    cells = document.getElementsByTagName('td');
    clear_button = document.getElementById('clear_all_button');
    make_card();
}
