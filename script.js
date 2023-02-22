window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Canvas Settings
  ctx.fillStyle = "green";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 1;
  ctx.shadowBlur = 4.5;

  // Effect Settings
  const size = canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
  const maxLevel = 4;
  const branches = 2;
  let sides = 5;
  let scale = 0.5;
  let spread = 0.5;
  let color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";

  // Controls
  const randomizeButton = document.getElementById("randomizeButton");

  function drawBranch(level) {
    if (level === maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(spread);
      ctx.scale(scale, scale);

      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(-spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.4 + 0.2;
    spread = Math.random() * Math.PI + 0.1;
    color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
    drawFractal();
  }
  randomizeButton.addEventListener("click", function () {
    randomizeFractal();
    drawFractal();
  });
});