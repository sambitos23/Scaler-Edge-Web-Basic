let gamebox = document.getElementById('gamebox');
let context = gamebox.getContext('2d');
let controller = new AbortController();
let flag = true;
let fc =0, bc =0;
let game_over = false;
let lvl = document.getElementById('level');
let temp = parseInt(lvl.textContent);
let next_level = document.getElementById("nextLevel");
let restart_level = document.getElementById("restartLevel");
let player = {
    name:'player',
    color: 'green',
    x: 0,
    y: 60,
    w: 20,
    h: 20,
    vx: 3,
    vy: 0,
}
let princes = {
    name: 'princes',
    x:280,
    y: 60,
    w: 20,
    h: 20.
}
let enemy1 = {
    name: 'enemy',
    color: 'red',
    x: 100,
    y: 0,
    w: 20,
    h: 15,
    vx: 0,
    vy: 1,
}
let enemy2 = {
    name: 'enemy',
    color: 'red',
    x: 200,
    y: 0,
    w: 20,
    h: 15,
    vx: 0,
    vy: 1.5,
}
function drawBox(box){
    // context.fillStyle = box.color;
    // context.fillRect(box.x, box.y, box.w, box.h);
    let img = document.getElementById(box.name);
    context.drawImage(img, box.x, box.y, box.w, box.h);
}

function updateGameState(enemy) {
    enemy.y += enemy.vy ;
    if( enemy.y + enemy.h > gamebox.height){
        enemy.vy = -1*enemy.vy;
    }else if(enemy.y < 0){
        enemy.vy = -enemy.vy;
    }
}
function checkPosition(enemy){
    if((player.x + player.w )> enemy.x && player.x <= (enemy.x + enemy.w)){
        if( enemy.y >= 45 && enemy.y <= 80){
            // controller.abort();
            flag = false;
            game_over = true;
        }
    }
    else if(player.x <= (enemy.x + enemy.w) && player.x >= (enemy.x - enemy.w)){
        if( enemy.y >= 45 && enemy.y <= 80){
            // controller.abort();
            flag = false;
            game_over = true;
        }
    }
}
function gameover(){
    context.font = "20px Arial";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText("Game Over!", gamebox.width/2, gamebox.height/2);

    // flag = false;
    restart_level.style.visibility = 'visible' ;
}
function finish(){
    context.font = "20px Arial";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText("Level Complete!", gamebox.width/2, gamebox.height/2);
    // controller.abort();
    flag = false;
    next_level.style.visibility = 'visible';
}

function moveRight(){
    let img = document.getElementById("player");
    if(fc==0)img.src = "media/MF2.png";
    else if(fc==1) img.src = "media/MF3.png";
    else img.src = "media/MF1.png";
    fc += 1;
    fc %= 3;
    player.x += player.vx;
    checkPosition(enemy1);
    checkPosition(enemy2);
}
function moveLeft(){
    let img = document.getElementById("player");
    if(bc==0)img.src = "media/MB2.png";
    else if(bc==1) img.src = "media/MB3.png";
    else img.src = "media/MB1.png";
    bc += 1;
    bc %= 3;
    player.x -= player.vx;
    checkPosition(enemy1);
    checkPosition(enemy2);
}

function updateGame(){
    // update the game 
    updateGameState(enemy1);
    updateGameState(enemy2);

    // clear the Canvas
    context.clearRect(0, 0, gamebox.width, gamebox.height);

    // draw player
    drawBox(player);
    drawBox(princes);
    // draw enemy
    drawBox(enemy1);
    drawBox(enemy2);
    if(player.x >= 260) finish();
    if(flag)requestAnimationFrame(updateGame);
    if(game_over) gameover();
}
document.addEventListener("keydown", (event) =>{
    const keyName = event.key;
    // 39
    if(keyName === 'ArrowRight'){
        if(player.x+ player.w <= gamebox.width - princes.w)moveRight();
    }
    // or use event.keyCode == '37'
    else if( keyName === 'ArrowLeft'){
        if(player.x > 0) moveLeft();
    }
}, {signal: controller.signal});
function increase_speed(enemy){
    if(enemy.vy<0)enemy.vy -= 0.5;
    else enemy.vy += 0.5;
}

next_level.addEventListener('click', (event) =>{
    
    temp += 1;
    lvl.textContent = temp;
    
    increase_speed(enemy1);
    increase_speed(enemy2);
    increase_speed(player);
    flag = true;
    player.x = 0;
    updateGame();
    next_level.style.visibility = 'hidden';
}, false);

restart_level.addEventListener('click', (event) =>{
    flag = true;
    game_over = false;
    player.x = 0;
    restart_level.style.visibility = 'hidden' ;
    updateGame();
}, false);
updateGame();
