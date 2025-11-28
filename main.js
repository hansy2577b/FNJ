
console.clear()

let json = null;
let custom_song_1 = "yo";
let custom_song_2 = "yo";
let time = 0;
let line = 0;
let play = true;
let game_key = ["q","s"];

let left_press = false;
let right_press = false;

console.log(json)

// generate note

fetch("/asset/custom-song-folder/"+custom_song_1+"/song/"+custom_song_2+"/uo.json")
  .then(response => response.json())
  .then(m => json = m);
  
setInterval(function loop() {
  if (play == true) {
    time += 0.001;
    console.log("")
  }
  
  
  if (time >= json.note[line][0] & play == true) {
    line++;
    console.log("next: ",json.note[line - 1][0]);
    make_note(json.note[line - 1][1]);
  }
  
  if (line >= json.note.length & play == true) {
    play = false;
    time = 0;
    line = 0;
    console.log("end");
    clearInterval("loop");
  }
},0.1)

// key 

 document.addEventListener('keydown', function(event) {
   if (event.key == game_key[0]) {
     document.getElementById('button-left').style.backgroundColor = "#282828";
     left_press = true
   }
 });
 
document.addEventListener('keyup', function(event) { // end key
  if (event.key == game_key[0]) {
    document.getElementById('button-left').style.backgroundColor = "#5a5a5a";
    left_press = false
  }
});

 document.addEventListener('keydown', function(event) {
  if (event.key == game_key[1]) {
    document.getElementById('button-right').style.backgroundColor = "#282828";
    right_press = true
  }
});

document.addEventListener('keyup', function(event) { // end key
  if (event.key == game_key[1]) {
    document.getElementById('button-right').style.backgroundColor = "#5a5a5a";
    right_press = false
  }
});



function make_note(left_right) {
  const note = document.createElement("p");
  var can_move = true;
  var move = 500;
  document.body.appendChild(note);
  
  note.style.backgroundColor = "#282890";
  note.style.width = "100px";
  note.style.height = "20px";
  note.style.position = "absolute";
  note.style.top = "500px"
  
  if (left_right == "left") {
    note.style.left = "9px";
  } 
  
  if (left_right == "right") {
    note.style.left = "120px";
  }
  
  setInterval(function() {
      if (can_move == true) {
        move -= 2
        note.style.top = move + "px";
      }
      
      if (move <= 30) {
        if (left_right == "left" & left_press == true & can_move == true) {
          note.remove();
          add_rank("good");
          can_move = false;
          left_press = false;
        }
        
        if (left_right == "right" & right_press == true & can_move == true) {
          note.remove();
          add_rank("good");
          can_move = false;
          right_press = false;
        }
      }
      
      if (move <= -100 & can_move == true) {
        note.remove();
        add_rank("bad")
        can_move = false;
        clearInterval(make_note);
      }
  },1)
  
}

add_rank("null")

function add_rank(name) {
  const rank = document.createElement("p");
  var can_move = true;
  var move = 100;
  var wait = 1;
  var move2 = -2;
  document.body.appendChild(rank);
 
  // note.style.backgroundColor = 'darkgreen';
  rank.style.width = "200px";
  rank.style.height = "80px";
  rank.style.position = "absolute";
  rank.style.top = "100px";
  rank.style.left = "200px";
  rank.style.backgroundImage = "url(" +'/asset/picture/'+name+'.png'+")";
  rank.style.backgroundSize = "210px"
  rank.style.opacity = 0.9
  
  setInterval(function(param) {
    if (can_move == true) {
      rank.style.top = move + "px";
      rank.style.opacity = wait;
      move += 1 + move2;
      move2 += 0.02;
      wait -= 0.0047;
    }
    
    if (wait <= -0.2) {
      rank.remove();
      can_move = false;
    }
  },1)
}