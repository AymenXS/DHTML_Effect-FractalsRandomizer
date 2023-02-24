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
  const maxLevel = 6;
  const branches = 2;
  let size = canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
  let sides = 5;
  let scale = 0.7;
  let spread = 0.6;
  let color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
  let lineWidth = Math.floor(Math.random() * 10 + 5);

  // Controls
  const randomizeButton = document.getElementById("randomizeButton");
  const resetButton = document.getElementById("resetButton");
  const sliderSpread = document.getElementById("spread");
  const labelSpread = document.querySelector('[for = "spread"]');
  const sliderSides = document.getElementById("sides");
  const labelSides = document.querySelector('[for = "sides"]');

  randomizeButton.addEventListener("click", function () {
    randomizeFractal();
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

  function drawBranch(level) {
    if (level === maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);

      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
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
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }
  drawFractal();

  function randomizeFractal() {
    lineWidth = Math.floor(Math.random() * 10 + 5);
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.4 + 0.4;
    spread = Math.random() * Math.PI + 0.1;
    color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
    drawFractal();
    updateSliders();
  }

  function resetFractal() {
    sides = 5;
    scale = 0.5;
    spread = 0.7;
    sides = 5;
    color = "hsl(" + Math.floor(Math.random() * 360) + "0,100%, 50%)";
    lineWidth = 15;
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
