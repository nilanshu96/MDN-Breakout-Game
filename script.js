function draw() {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.rect(20, 20, 50,50);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
}

document.addEventListener("DOMContentLoaded", draw);

