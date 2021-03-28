let canvas = document.getElementById('tutorial');

let ctx = canvas.getContext('2d');

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

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) dy = -dy;

  x += dx;
  y += dy;
}

setInterval(draw, 10);



