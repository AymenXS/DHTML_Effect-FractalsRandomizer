window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Canvas Settings
  ctx.fillStyle = "green";
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 1;
  ctx.shadowBlur = 4.5;

  // Effect Settings
  let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  const maxLevel = 8;
  const branches = 1;

  let sides = 10;
  let scale = 0.85;
  let spread = -0.2;
  let color = "hsl(" + Math.random() * 360 + "0,100%, 50%)";
  let lineWidth = 30;

  // Controls
  const randomizeButton = document.getElementById("randomizeButton");
  const resetButton = document.getElementById("resetButton");
  const sliderSpread = document.getElementById("spread");
  const labelSpread = document.querySelector('[for = "spread"]');
  const sliderSides = document.getElementById("sides");
  const labelSides = document.querySelector('[for = "sides"]');

  randomizeButton.addEventListener("click", function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  resetButton.addEventListener("click", function () {
    resetFractal();
    updateSliders();
    drawFractal();
  });

  sliderSpread.addEventListener("change", function (e) {
    spread = e.target.value;
    drawFractal();
    updateSliders();
  });

  sliderSides.addEventListener("change", function (e) {
    sides = e.target.value;
    drawFractal();
    updateSliders();
  });

  function updateSliders() {
    sliderSpread.value = spread;
    labelSpread.innerText = "Spread: " + Number(spread).toFixed(2);
    sliderSides.value = sides;
    labelSides.innerText = "Sides: " + sides;
  }
  updateSliders();

  let pointX = 0;
  let pointY = size;
  function drawBranch(level) {
    if (level === maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.bezierCurveTo(0, size * spread * -3, size * 5, size * 10 * spread, 0, 0);
    ctx.stroke();
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(pointX, pointY);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);

      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(-size / 2, 0, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.scale(0.95, 0.95);
      ctx.rotate((Math.PI * 6) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 18 + 2);
    spread = Math.random() * 0.6 - 0.3;
    color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
    lineWidth = Math.floor(Math.random() * 30 + 20);
  }

  function resetFractal() {
    sides = 15;
    scale = 0.85;
    spread = 0.2;
    sides = 5;
    color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
    lineWidth = 30;
  }

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
    ctx.fillStyle = "green";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowOffsetX = 1;
    ctx.shadowBlur = 4.5;
    drawFractal();
  });
});
