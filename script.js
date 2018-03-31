window.onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const SQSIZE = 20;
  const MARGIN = 10;

  const width = 19;
  const height = 11;

  const end = [
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,1,0,1,0,0,1,0,0,1,1,0,1,1,0,1,0,1,0,
      0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,0,1,0,0,
      0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,1,1,0,0,1,1,0,0,0,1,0,0,1,0,1,0,1,0,
      0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
      0,1,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,
      0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,
      0,1,1,0,0,1,1,0,0,1,0,1,0,0,1,0,0,1,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ];

  let isEnd = false;
  const grid = [];
  for (let i = 0; i < end.length; i++) {
    grid[i] = parseInt(Math.random()+0.5);
  }

  function drawGrid() {
    for (let i = 0; i < end.length; i++) {
      ctx.beginPath();
      ctx.arc((1 + i%width) * (SQSIZE+MARGIN), parseInt(1 + i/width) * (SQSIZE+MARGIN), SQSIZE/2, 0, 2*Math.PI);
      if (grid[i] == 0) {
        ctx.stroke();
      }
      else {
        ctx.fill();
      }
    }
  }

  function drawGrid2() {
    for (let i = 0; i < end.length; i++) {
      ctx.beginPath();
      ctx.arc((1 + i%width) * (SQSIZE+MARGIN), parseInt(1 + i/width) * (SQSIZE+MARGIN), SQSIZE/2, 0, 2*Math.PI);
      if (grid[i] == 1) {
        ctx.fill();
      }
    }
  }

  let requestID;

  function oneAwayTwoTowards() {
    const same = [];
    const diff = [];
    for (let i = 0; i < end.length; i++) {
      if (end[i] == grid[i]) {
        same.push(i);
      }
      else {
        diff.push(i);
      }
    }

    if (diff.length == 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isEnd = true;
      return;
    }

    if (diff.length <= 2) {
      for (let i = 0; i < end.length; i++) {
        grid[i] = end[i];
      }
      return;
    }

    let v = same[parseInt(Math.random() * same.length)];
    grid[v] = grid[v] == 0 ? 1 : 0;

    let x = parseInt(Math.random() * diff.length);
    let y = parseInt(Math.random() * diff.length);
    while (x == y) {
      y = parseInt(Math.random() * diff.length);
    }

    let u = diff[x];
    grid[u] = grid[u] == 0 ? 1 : 0;
    let u2 = diff[y];
    grid[u2] = grid[u2] == 0 ? 1 : 0;
  }


  let lastUpdate;

  function main(timestamp) {
    requestID = window.requestAnimationFrame(main);

    let gap = timestamp - lastUpdate;
    if (isNaN(gap)) {
      lastUpdate = timestamp;
      return;
    }
    if (gap < Math.pow(10, document.getElementById('slider').value/10)) {
      return;
    }
    lastUpdate = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isEnd) {
      drawGrid2();
    }
    else {
      oneAwayTwoTowards();
      drawGrid();
    }
  }

  drawGrid();
  main();

  const btn = document.getElementById('reset');
  btn.onclick = function() {
    for (let i = 0; i < end.length; i++) {
      grid[i] = parseInt(Math.random()+0.5);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    isEnd = false;
  }
};
