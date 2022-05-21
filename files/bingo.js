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
  document.getElementById('clear_all_button').disabled=true
  var cells = document.getElementsByTagName('td')
  for(var i = 0; i < cells.length; i++)
    if(i != 12)
      cells[i].className=''
  total_selected = 0
}

function make_card(){
  clear_all()
  var shuffled_values = shuffle(values)
  var cells = document.getElementsByTagName('td')
  for(var i = 0; i < cells.length; i++) {
    if(i != 12){
      var cell = cells[i]
      cell.innerHTML = shuffled_values[i]
      cell.onclick = function(event) {
        document.getElementById('clear_all_button').disabled=false
        e = event.srcElement
        if(e.className=='selected'){
          e.className=''
          total_selected--
          if(total_selected == 0)
            document.getElementById('clear_all_button').disabled=true
        } else {
          e.className='selected'
          total_selected++
        }
      }
    }
  }
}

window.onload = function() {
  make_card()
}
