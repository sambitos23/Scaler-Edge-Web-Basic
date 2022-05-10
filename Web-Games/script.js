let gamebox = document.getElementById('gamebox');
let context = gamebox.getContext('2d');

context.fillStyle = 'brown';

let posX = 0;
let posY = 0;

// Create box in a blank canvas in remove some area
// context.fillRect(10, 10, 100, 100);
// context.clearRect(20, 20, 30, 30);

// A smaill box is moving in a canvas
// setInterval(function() {
//   posX += 10;
//   posY += 10;
//   context.clearRect(0, 0, gamebox.width, gamebox.height);
//   context.fillRect(posX, posY, 20, 20); // x position, y positoin, width, height
// }, 2000);

// requestAnimationFrame useage
// function drawNext() {
//   posX += 1;
//   posY += 1;
//   context.clearRect(0, 0, gamebox.width, gamebox.height);
//   context.fillRect(posX, posY, 20, 20);
//   window.requestAnimationFrame(drawNext);
// }
// drawNext();

let enemy = {
  color: 'red',
  x: 100,
  y: 0,
  h: 50,
  w: 50,
  vx: 0,
  vy: 1,
}

let player = {
  color: 'blue',
  x: 0,
  y: 175,
  h: 50,
  w: 50,
  vx: 1,
  vy: 0,
}

function drawbox(box){
  context.fillStyle = box.color;
  context.fillRect(box.x, box.y, box.w, box.h);
}

function updateGameState() {
  enemy.y += enemy.vy;
  if (enemy.y + enemy.h > gamebox.height) {
    enemy.vy = -1;
  } else if (enemy.y < 0) {
    enemy.vy = 1;
  }
}

function updateGame() {
  // update game state
  updateGameState();
  // clear the canvas
  context.clearRect(0, 0, gamebox.width, gamebox.height);
  // draw the player
  drawbox(player);
  // draw the enemy
  drawbox(enemy);
  window.requestAnimationFrame(updateGame);
}

updateGame();