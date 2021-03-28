let canvas = document.getElementById('tutorial');

let ctx = canvas.getContext('2d');

let interval;

const ballRadius = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

function drawBall(x, y, radius) {

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(x, y, ballRadius);
  drawPaddle();

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game Over!");
      document.location.reload();
      clearInterval(interval);
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

interval = setInterval(draw, 10);

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);


