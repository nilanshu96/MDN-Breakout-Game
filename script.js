let canvas = document.getElementById('tutorial');

let ctx = canvas.getContext('2d');

let interval;

let score = 0;
let lives = 3;

const ballRadius = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 5;
let dy = -5;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;


function drawBall(x, y, radius) {

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let r = 0; r < brickRowCount; r++) {
  bricks[r] = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[r][c] = { x: 0, y: 0, status: true };
  }
}

function drawBricks() {

  for (r = 0; r < brickRowCount; r++)
    for (c = 0; c < brickColumnCount; c++)
      if (bricks[r][c].status) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }

}

function rectangleCircleCollision(r, xc, yc, x1, y1, x2, y2) {

  //the calculation is based on the fact that the value of y is positive going downward from 0,0 unlike normal graphs where it gets negative 

  let xn = Math.max(x1, Math.min(xc, x2)); //closest x to circle's centre x on rectangle
  let yn = Math.max(y1, Math.min(yc, y2)); //closest y to circles' centre y on rectangle

  let diffX = xn - xc;
  let diffY = yn - yc;

  return (diffX * diffX + diffY * diffY) <= r * r;
}

function drawScore() {
  ctx.beginPath();
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
  // ctx.closePath();
}

function collisionDetection() {
  for (let r = 0; r < brickRowCount; r++)
    for (let c = 0; c < brickColumnCount; c++)
      if (bricks[r][c].status) {
        let b = bricks[r][c];
        if (rectangleCircleCollision(ballRadius, x, y, b.x, b.y, b.x + brickWidth, b.y + brickHeight)) {
          dy = -dy;
          b.status = false;
          score++;
        }
      }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall(x, y, ballRadius);
  drawPaddle();
  drawScore();
  drawLives();
  if (score === brickRowCount * brickColumnCount) {  
    alert("You Win!");
    score = 0;
    document.location.reload();
  }
  collisionDetection();

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (rectangleCircleCollision(ballRadius, x, y, paddleX, paddleY, paddleX + paddleWidth, paddleY)) { //last param is not paddlY+paddleHeight because we only care about the collision from the top of paddle
      dy = -dy;
      if (x < paddleX || x > paddleX + paddleWidth) dx = -dx;
    } else if (lives > 1) {
      lives--;
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 5;
      dy = -5;
      paddleX = (canvas.width - paddleWidth) / 2;
    } else {
      alert("Game Over!");
      lives = 3;
      document.location.reload();
    }
  }

  x += dx;
  y += dy;

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0
    }
  }

  requestAnimationFrame(draw);
}

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(event) {

  if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = true;
  } else if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = false;
  } else if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = false;
  }
}

draw();

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);


