// ===== Quantum Learning Page - Interactive JavaScript =====

// ============================================================
// 1. HERO PARTICLE BACKGROUND
// ============================================================
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((w * h) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: ['#60a5fa', '#a78bfa', '#f472b6', '#22d3ee'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

// ============================================================
// 2. SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================================
// 3. QUBIT STATES INTERACTIVE
// ============================================================
const qubitStates = {
  q0: { theta: 45, phi: 0 },
  q1: { theta: 0, phi: 0 }
};

function calcAlpha(theta) {
  return Math.cos((theta * Math.PI / 180) / 2);
}

function calcBeta(theta, phi) {
  const r = Math.sin((theta * Math.PI / 180) / 2);
  return { re: Math.cos(phi * Math.PI / 180) * r, im: Math.sin(phi * Math.PI / 180) * r };
}

function calcProb(alpha, beta) {
  const p0 = alpha * alpha;
  const p1 = beta.re * beta.re + beta.im * beta.im;
  return { p0: p0 * 100, p1: p1 * 100 };
}

function updateQubitDisplay(id) {
  const state = qubitStates[id];
  const alpha = calcAlpha(state.theta);
  const beta = calcBeta(state.theta, state.phi);
  const prob = calcProb(alpha, beta);

  const card = document.getElementById(id);
  if (!card) return;

  card.querySelector('.alpha-val').textContent = alpha.toFixed(3);
  card.querySelector('.beta-val').textContent = beta.re.toFixed(3);
  card.querySelector('.zero-pct').textContent = prob.p0.toFixed(1) + '%';
  card.querySelector('.one-pct').textContent = prob.p1.toFixed(1) + '%';
  card.querySelector('.zero-bar').style.width = prob.p0 + '%';
  card.querySelector('.one-bar').style.width = prob.p1 + '%';
  card.querySelector('.theta-val').textContent = state.theta.toFixed(1) + '\u00B0';
  card.querySelector('.phi-val').textContent = state.phi.toFixed(1) + '\u00B0';

  updateBlochCanvas();
}

function initQubitControls() {
  ['q0', 'q1'].forEach(id => {
    const thetaSlider = document.getElementById(id + '-theta');
    const phiSlider = document.getElementById(id + '-phi');
    if (thetaSlider) {
      thetaSlider.addEventListener('input', (e) => {
        qubitStates[id].theta = parseFloat(e.target.value);
        updateQubitDisplay(id);
      });
    }
    if (phiSlider) {
      phiSlider.addEventListener('input', (e) => {
        qubitStates[id].phi = parseFloat(e.target.value);
        updateQubitDisplay(id);
      });
    }
  });
}

// ============================================================
// 4. BLOCH SPHERE (Canvas 2D)
// ============================================================
let blochRotation = { theta: 45, phi: 0 };

function updateBlochCanvas() {
  blochRotation = { ...qubitStates.q0 };
  drawBlochSphere();
}

function drawBlochSphere() {
  const canvas = document.getElementById('bloch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.parentElement.clientWidth;
  canvas.width = size * 2;
  canvas.height = size * 2;
  ctx.scale(2, 2);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  ctx.clearRect(0, 0, size, size);

  // Background gradient
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  grad.addColorStop(0, 'rgba(96, 165, 250, 0.03)');
  grad.addColorStop(1, 'rgba(10, 14, 26, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Sphere outline
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Equator (ellipse)
  ctx.beginPath();
  ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Meridian
  ctx.beginPath();
  ctx.ellipse(cx, cy, r * 0.3, r, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Axes
  const axesLen = r * 1.15;
  // Z axis
  drawArrow(ctx, cx, cy + axesLen, cx, cy - axesLen, 'rgba(226, 232, 240, 0.4)');
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 13px Inter, sans-serif';
  ctx.fillText('|0\u27E9', cx + 8, cy - axesLen + 4);
  ctx.fillText('|1\u27E9', cx + 8, cy + axesLen - 4);

  // X axis
  drawArrow(ctx, cx - axesLen, cy, cx + axesLen, cy, 'rgba(226, 232, 240, 0.25)');
  ctx.fillText('+X', cx + axesLen + 5, cy + 4);
  ctx.fillText('-X', cx - axesLen - 28, cy + 4);

  // State vector
  const thetaRad = blochRotation.theta * Math.PI / 180;
  const phiRad = blochRotation.phi * Math.PI / 180;

  const sx = cx + r * Math.sin(thetaRad) * Math.cos(phiRad);
  const sy = cy - r * Math.cos(thetaRad);

  // Vector line
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(sx, sy);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Glow
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(sx, sy, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Projection dashed line
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx, cy);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 8;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - 0.4), y2 - headLen * Math.sin(angle - 0.4));
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle + 0.4), y2 - headLen * Math.sin(angle + 0.4));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function initBlochPresets() {
  document.querySelectorAll('.bloch-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theta = parseFloat(btn.dataset.theta);
      const phi = parseFloat(btn.dataset.phi);
      qubitStates.q0.theta = theta;
      qubitStates.q0.phi = phi;
      const thetaSlider = document.getElementById('q0-theta');
      const phiSlider = document.getElementById('q0-phi');
      if (thetaSlider) thetaSlider.value = theta;
      if (phiSlider) phiSlider.value = phi;
      updateQubitDisplay('q0');
      document.querySelectorAll('.bloch-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============================================================
// 5. CIRCUIT BUILDER
// ============================================================
const circuitPresets = {
  bell: {
    name: 'Bell State',
    desc: 'Entangled pair',
    wires: [
      { label: 'Q0', gates: [{ type: 'H', pos: 30 }, { type: 'CNOT', pos: 60, target: 1 }] },
      { label: 'Q1', gates: [{ type: 'CNOT-T', pos: 60, control: 0 }] }
    ],
    output: [
      { state: '|00\u27E9', pct: 50 },
      { state: '|11\u27E9', pct: 50 }
    ]
  },
  ghz: {
    name: 'GHZ State',
    desc: '3-qubit entanglement',
    wires: [
      { label: 'Q0', gates: [{ type: 'H', pos: 25 }, { type: 'CNOT', pos: 50, target: 1 }, { type: 'CNOT', pos: 75, target: 2 }] },
      { label: 'Q1', gates: [{ type: 'CNOT-T', pos: 50, control: 0 }, { type: 'CNOT', pos: 75, target: 2 }] },
      { label: 'Q2', gates: [{ type: 'CNOT-T', pos: 75, control: 0 }] }
    ],
    output: [
      { state: '|000\u27E9', pct: 50 },
      { state: '|111\u27E9', pct: 50 }
    ]
  },
  random: {
    name: 'Random Rotation',
    desc: 'Complex superposition',
    wires: [
      { label: 'Q0', gates: [{ type: 'H', pos: 20 }, { type: 'S', pos: 40 }, { type: 'T', pos: 60 }, { type: 'X', pos: 80 }] },
      { label: 'Q1', gates: [{ type: 'Z', pos: 20 }, { type: 'H', pos: 50 }, { type: 'S', pos: 75 }] }
    ],
    output: [
      { state: '|00\u27E9', pct: 25 },
      { state: '|01\u27E9', pct: 25 },
      { state: '|10\u27E9', pct: 25 },
      { state: '|11\u27E9', pct: 25 }
    ]
  },
  bitflip: {
    name: 'Bit Flip',
    desc: 'Returns to |0\u27E9',
    wires: [
      { label: 'Q0', gates: [{ type: 'X', pos: 30 }, { type: 'X', pos: 60 }] },
      { label: 'Q1', gates: [] }
    ],
    output: [
      { state: '|00\u27E9', pct: 100 }
    ]
  }
};

let currentCircuit = 'bell';

function renderCircuit(presetKey) {
  currentCircuit = presetKey;
  const preset = circuitPresets[presetKey];
  const container = document.getElementById('circuit-visual');
  if (!container) return;

  let wiresHTML = '<div class="circuit-wires">';

  preset.wires.forEach(wire => {
    let gatesHTML = '';
    wire.gates.forEach(gate => {
      if (gate.type === 'CNOT') {
        gatesHTML += `<div class="cnot-target" style="left:${gate.pos}%"></div>`;
        // Vertical line connecting control to target
        const controlWire = preset.wires.find(w => w.label === wire.label.replace(/\d/, wire.label.match(/\d/)[0]));
        if (gate.target !== undefined) {
          gatesHTML += `<div class="cnot-line" style="left:${gate.pos}%;top:-24px;height:calc(100% + 48px)"></div>`;
        }
      } else if (gate.type === 'CNOT-T') {
        gatesHTML += `<div class="cnot-dot" style="left:${gate.pos}%"></div>`;
      } else {
        const gateClass = gate.type.toLowerCase() + '-gate';
        gatesHTML += `<div class="wire-gate ${gateClass}" style="left:${gate.pos}%">${gate.type}</div>`;
      }
    });

    wiresHTML += `
      <div class="circuit-wire">
        <span class="wire-label">${wire.label}</span>
        <div class="wire-line">${gatesHTML}</div>
      </div>`;
  });

  wiresHTML += '</div>';
  container.innerHTML = wiresHTML;

  // Render output
  renderCircuitOutput(preset);

  // Update active preset
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === presetKey);
  });
}

function renderCircuitOutput(preset) {
  const output = document.getElementById('circuit-output');
  if (!output || !preset.output) return;

  let html = '<h4>Measurement Output</h4>';
  preset.output.forEach(o => {
    html += `
      <div class="output-row">
        <span class="output-state">${o.state}</span>
        <div class="output-prob">
          <div class="output-prob-fill" style="width:${o.pct}%"></div>
        </div>
        <span class="output-pct">${o.pct}%</span>
      </div>`;
  });
  output.innerHTML = html;
}

function initCircuitPresets() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderCircuit(btn.dataset.preset);
    });
  });
  renderCircuit('bell');
}

// ============================================================
// 6. QUANTUM VS CLASSICAL MAZE GAME
// ============================================================
class MazeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.size = 12;
    this.cellSize = 0;
    this.maze = [];
    this.quantumPos = { x: 0, y: 0 };
    this.classicalPos = { x: 0, y: 0 };
    this.goal = { x: 0, y: 0 };
    this.quantumPaths = [];
    this.classicalSteps = 0;
    this.quantumSteps = 0;
    this.classicalTime = 0;
    this.quantumTime = 0;
    this.running = false;
    this.quantumDone = false;
    this.classicalDone = false;
    this.animFrame = null;

    this.resize();
    this.generateMaze();
    this.draw();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.cellSize = Math.floor(Math.min(rect.width, rect.height) / this.size);
    this.canvas.width = this.cellSize * this.size;
    this.canvas.height = this.cellSize * this.size;
  }

  generateMaze() {
    // Simple recursive backtracker
    this.maze = [];
    for (let y = 0; y < this.size; y++) {
      this.maze[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.maze[y][x] = { visited: false, walls: { top: true, right: true, bottom: true, left: true } };
      }
    }

    const stack = [];
    const start = { x: 0, y: 0 };
    this.maze[0][0].visited = true;
    stack.push(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = this.getUnvisitedNeighbors(current.x, current.y);

      if (neighbors.length === 0) {
        stack.pop();
      } else {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWall(current, next);
        this.maze[next.y][next.x].visited = true;
        stack.push(next);
      }
    }

    this.goal = { x: this.size - 1, y: this.size - 1 };
    this.quantumPos = { x: 0, y: 0 };
    this.classicalPos = { x: 0, y: 0 };
    this.quantumPaths = [[{ x: 0, y: 0 }]];
    this.classicalSteps = 0;
    this.quantumSteps = 0;
    this.classicalTime = 0;
    this.quantumTime = 0;
    this.quantumDone = false;
    this.classicalDone = false;
  }

  getUnvisitedNeighbors(x, y) {
    const neighbors = [];
    if (y > 0 && !this.maze[y - 1][x].visited) neighbors.push({ x, y: y - 1 });
    if (x < this.size - 1 && !this.maze[y][x + 1].visited) neighbors.push({ x: x + 1, y });
    if (y < this.size - 1 && !this.maze[y + 1][x].visited) neighbors.push({ x, y: y + 1 });
    if (x > 0 && !this.maze[y][x - 1].visited) neighbors.push({ x: x - 1, y });
    return neighbors;
  }

  removeWall(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 1) { this.maze[a.y][a.x].walls.right = false; this.maze[b.y][b.x].walls.left = false; }
    if (dx === -1) { this.maze[a.y][a.x].walls.left = false; this.maze[b.y][b.x].walls.right = false; }
    if (dy === 1) { this.maze[a.y][a.x].walls.bottom = false; this.maze[b.y][b.x].walls.top = false; }
    if (dy === -1) { this.maze[a.y][a.x].walls.top = false; this.maze[b.y][b.x].walls.bottom = false; }
  }

  canMove(x, y, dir) {
    const cell = this.maze[y][x];
    if (dir === 'up' && !cell.walls.top) return true;
    if (dir === 'down' && !cell.walls.bottom) return true;
    if (dir === 'left' && !cell.walls.left) return true;
    if (dir === 'right' && !cell.walls.right) return true;
    return false;
  }

  getReachable(startX, startY) {
    const visited = new Set();
    const queue = [{ x: startX, y: startY }];
    visited.add(`${startX},${startY}`);

    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const dirs = [
        { dir: 'up', dx: 0, dy: -1 },
        { dir: 'right', dx: 1, dy: 0 },
        { dir: 'down', dx: 0, dy: 1 },
        { dir: 'left', dx: -1, dy: 0 }
      ];

      for (const { dir, dx, dy } of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && !visited.has(`${nx},${ny}`) && this.canMove(x, y, dir)) {
          visited.add(`${nx},${ny}`);
          queue.push({ x: nx, y: ny });
        }
      }
    }

    return visited;
  }

  // Quantum: explores ALL paths simultaneously
  quantumStep() {
    if (this.quantumDone) return;

    const newPaths = [];
    this.quantumPaths.forEach(path => {
      const last = path[path.length - 1];
      const dirs = [
        { dir: 'up', dx: 0, dy: -1 },
        { dir: 'right', dx: 1, dy: 0 },
        { dir: 'down', dx: 0, dy: 1 },
        { dir: 'left', dx: -1, dy: 0 }
      ];

      for (const { dir, dx, dy } of dirs) {
        const nx = last.x + dx;
        const ny = last.y + dy;
        if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && this.canMove(last.x, last.y, dir)) {
          const newPath = [...path, { x: nx, y: ny }];
          if (nx === this.goal.x && ny === this.goal.y) {
            this.quantumPaths = [newPath];
            this.quantumDone = true;
            this.quantumSteps = newPath.length - 1;
            return;
          }
          newPaths.push(newPath);
        }
      }
    });

    // Prune duplicates and limit
    const seen = new Set();
    this.quantumPaths = newPaths.filter(p => {
      const key = `${p[p.length - 1].x},${p[p.length - 1].y}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 20);

    this.quantumSteps++;
  }

  // Classical: greedy DFS
  classicalStep() {
    if (this.classicalDone) return;

    const pos = this.classicalPos;
    const dirs = [
      { dir: 'right', dx: 1, dy: 0 },
      { dir: 'down', dx: 0, dy: 1 },
      { dir: 'up', dx: 0, dy: -1 },
      { dir: 'left', dx: -1, dy: 0 }
    ];

    // Try to move toward goal
    let moved = false;
    for (const { dir, dx, dy } of dirs) {
      const nx = pos.x + dx;
      const ny = pos.y + dy;
      if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && this.canMove(pos.x, pos.y, dir)) {
        if (nx === this.goal.x && ny === this.goal.y) {
          this.classicalPos = { x: nx, y: ny };
          this.classicalSteps++;
          this.classicalDone = true;
          return;
        }
        // Prefer closer to goal
        const curDist = Math.abs(pos.x - this.goal.x) + Math.abs(pos.y - this.goal.y);
        const newDist = Math.abs(nx - this.goal.x) + Math.abs(ny - this.goal.y);
        if (newDist < curDist) {
          this.classicalPos = { x: nx, y: ny };
          this.classicalSteps++;
          moved = true;
          break;
        }
      }
    }

    if (!moved) {
      // Random valid move
      const validDirs = dirs.filter(({ dir, dx, dy }) => {
        const nx = pos.x + dx;
        const ny = pos.y + dy;
        return nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && this.canMove(pos.x, pos.y, dir);
      });

      if (validDirs.length > 0) {
        const { dx, dy } = validDirs[Math.floor(Math.random() * validDirs.length)];
        this.classicalPos = { x: this.classicalPos.x + dx, y: this.classicalPos.y + dy };
        this.classicalSteps++;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    const cs = this.cellSize;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw maze cells
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const px = x * cs;
        const py = y * cs;
        const cell = this.maze[y][x];

        ctx.fillStyle = 'rgba(26, 34, 54, 0.5)';
        ctx.fillRect(px, py, cs, cs);

        ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
        ctx.lineWidth = 2;

        if (cell.walls.top) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + cs, py); ctx.stroke(); }
        if (cell.walls.right) { ctx.beginPath(); ctx.moveTo(px + cs, py); ctx.lineTo(px + cs, py + cs); ctx.stroke(); }
        if (cell.walls.bottom) { ctx.beginPath(); ctx.moveTo(px, py + cs); ctx.lineTo(px + cs, py + cs); ctx.stroke(); }
        if (cell.walls.left) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + cs); ctx.stroke(); }
      }
    }

    // Goal
    const gx = this.goal.x * cs + cs / 2;
    const gy = this.goal.y * cs + cs / 2;
    ctx.beginPath();
    ctx.arc(gx, gy, cs * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(52, 211, 153, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#34d399';
    ctx.font = `${cs * 0.35}px Inter`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u2605', gx, gy);

    // Quantum paths
    this.quantumPaths.forEach(path => {
      if (path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x * cs + cs / 2, path[0].y * cs + cs / 2);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x * cs + cs / 2, path[i].y * cs + cs / 2);
      }
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    // Quantum position(s)
    this.quantumPaths.forEach(path => {
      const last = path[path.length - 1];
      ctx.beginPath();
      ctx.arc(last.x * cs + cs / 2, last.y * cs + cs / 2, cs * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Classical position
    ctx.beginPath();
    ctx.arc(this.classicalPos.x * cs + cs / 2, this.classicalPos.y * cs + cs / 2, cs * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(251, 146, 60, 0.9)';
    ctx.fill();
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Start marker
    ctx.beginPath();
    ctx.arc(cs / 2, cs / 2, cs * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.fill();
  }

  updateStats() {
    const cTime = document.getElementById('classical-time');
    const qTime = document.getElementById('quantum-time');
    const cSteps = document.getElementById('classical-steps');
    const qSteps = document.getElementById('quantum-steps');
    if (cTime) cTime.textContent = this.classicalSteps + ' steps';
    if (qTime) qTime.textContent = this.quantumSteps + ' steps';
    if (cSteps) cSteps.textContent = this.classicalSteps;
    if (qSteps) qSteps.textContent = this.quantumSteps;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.generateMaze();
    this.run();
  }

  run() {
    if (!this.running) return;

    // Quantum is faster - multiple steps per frame
    for (let i = 0; i < 3; i++) {
      if (!this.quantumDone) this.quantumStep();
    }
    if (!this.classicalDone) this.classicalStep();

    this.draw();
    this.updateStats();

    if (!this.quantumDone || !this.classicalDone) {
      this.animFrame = requestAnimationFrame(() => this.run());
    } else {
      this.running = false;
    }
  }

  stop() {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  reset() {
    this.stop();
    this.generateMaze();
    this.draw();
    this.updateStats();
  }
}

// ============================================================
// 7. PATTERN GAME (Quantum Superposition Puzzle)
// ============================================================
class PatternGame {
  constructor(gridId) {
    this.grid = document.getElementById(gridId);
    if (!this.grid) return;
    this.size = 4;
    this.pattern = [];
    this.playerPattern = [];
    this.score = 0;
    this.round = 0;
    this.quantumMode = true;
    this.showingPattern = false;

    this.init();
  }

  init() {
    this.grid.innerHTML = '';
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'pattern-cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.toggleCell(i));
      this.grid.appendChild(cell);
    }
  }

  generatePattern() {
    this.pattern = [];
    const count = this.quantumMode ? 4 : 2;
    while (this.pattern.length < count) {
      const idx = Math.floor(Math.random() * this.size * this.size);
      if (!this.pattern.includes(idx)) this.pattern.push(idx);
    }
  }

  showPattern() {
    this.showingPattern = true;
    this.playerPattern = [];
    this.grid.querySelectorAll('.pattern-cell').forEach(c => {
      c.className = 'pattern-cell';
    });

    this.pattern.forEach((idx, i) => {
      setTimeout(() => {
        const cell = this.grid.children[idx];
        cell.classList.add(this.quantumMode ? 'quantum-lit' : 'classical-lit');
      }, i * 200);
    });

    setTimeout(() => {
      this.grid.querySelectorAll('.pattern-cell').forEach(c => {
        c.className = 'pattern-cell';
      });
      this.showingPattern = false;
    }, this.pattern.length * 200 + 1000);
  }

  toggleCell(idx) {
    if (this.showingPattern) return;
    if (this.playerPattern.includes(idx)) {
      this.playerPattern = this.playerPattern.filter(i => i !== idx);
      this.grid.children[idx].className = 'pattern-cell';
    } else {
      this.playerPattern.push(idx);
      this.grid.children[idx].classList.add(this.quantumMode ? 'quantum-lit' : 'classical-lit');
    }

    if (this.playerPattern.length === this.pattern.length) {
      setTimeout(() => this.checkPattern(), 300);
    }
  }

  checkPattern() {
    const sorted1 = [...this.pattern].sort();
    const sorted2 = [...this.playerPattern].sort();
    const correct = sorted1.every((v, i) => v === sorted2[i]);

    this.grid.querySelectorAll('.pattern-cell').forEach((cell, i) => {
      if (this.pattern.includes(i)) {
        if (correct) {
          cell.className = 'pattern-cell correct';
        } else if (this.playerPattern.includes(i)) {
          cell.className = 'pattern-cell wrong';
        }
      }
    });

    if (correct) {
      this.score += this.quantumMode ? 2 : 1;
    }

    this.updateScore();

    setTimeout(() => {
      this.nextRound();
    }, 1500);
  }

  nextRound() {
    this.round++;
    this.generatePattern();
    this.showPattern();
    this.updateScore();
  }

  updateScore() {
    const scoreEl = document.getElementById('pattern-score');
    const roundEl = document.getElementById('pattern-round');
    if (scoreEl) scoreEl.textContent = this.score;
    if (roundEl) roundEl.textContent = this.round;
  }

  start() {
    this.score = 0;
    this.round = 0;
    this.generatePattern();
    this.showPattern();
    this.updateScore();
  }
}

// ============================================================
// 8. PARALLEL COMPUTATION DEMO
// ============================================================
class ParallelDemo {
  constructor() {
    this.running = false;
    this.classicalProgress = [0, 0, 0, 0, 0, 0, 0, 0];
    this.quantumProgress = 0;
    this.paths = 8;
    this.classicalCurrent = 0;
  }

  start() {
    this.running = true;
    this.classicalProgress = [0, 0, 0, 0, 0, 0, 0, 0];
    this.quantumProgress = 0;
    this.classicalCurrent = 0;
    this.animate();
  }

  animate() {
    if (!this.running) return;

    // Classical: one path at a time
    if (this.classicalCurrent < this.paths) {
      this.classicalProgress[this.classicalCurrent] += 5;
      if (this.classicalProgress[this.classicalCurrent] >= 100) {
        this.classicalProgress[this.classicalCurrent] = 100;
        this.classicalCurrent++;
      }
    }

    // Quantum: all at once
    if (this.quantumProgress < 100) {
      this.quantumProgress += 2.5;
      if (this.quantumProgress > 100) this.quantumProgress = 100;
    }

    this.render();

    if (this.classicalCurrent < this.paths || this.quantumProgress < 100) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.running = false;
    }
  }

  render() {
    for (let i = 0; i < this.paths; i++) {
      const fill = document.getElementById(`classical-path-${i}`);
      if (fill) fill.style.width = this.classicalProgress[i] + '%';
    }

    for (let i = 0; i < this.paths; i++) {
      const fill = document.getElementById(`quantum-path-${i}`);
      if (fill) fill.style.width = this.quantumProgress + '%';
    }

    const cTimer = document.getElementById('parallel-classical-timer');
    const qTimer = document.getElementById('parallel-quantum-timer');
    const completed = this.classicalProgress.filter(p => p >= 100).length;
    if (cTimer) cTimer.textContent = completed + '/' + this.paths;
    if (qTimer) qTimer.textContent = (this.quantumProgress >= 100 ? this.paths : 0) + '/' + this.paths;
  }
}

// ============================================================
// 9. INTERACTIVE BLOCH SPHERE WITH GATES
// ============================================================
class InteractiveBlochSphere {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.theta = 0;
    this.phi = 0;
    this.targetTheta = 0;
    this.targetPhi = 0;
    this.animating = false;

    this.resize();
    this.draw();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 400);
    this.canvas.width = size * 2;
    this.canvas.height = size * 2;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.displaySize = size;
  }

  applyGate(gate) {
    const thetaRad = this.theta * Math.PI / 180;
    const phiRad = this.phi * Math.PI / 180;

    switch (gate) {
      case 'H': {
        // Hadamard: maps |0> to |+>, |1> to |->
        const newTheta = Math.acos(Math.sin(thetaRad));
        const newPhi = this.phi;
        this.targetTheta = newTheta * 180 / Math.PI;
        this.targetPhi = newPhi;
        break;
      }
      case 'X': {
        this.targetTheta = 180 - this.theta;
        this.targetPhi = this.phi;
        break;
      }
      case 'Z': {
        this.targetTheta = this.theta;
        this.targetPhi = (this.phi + 180) % 360;
        break;
      }
      case 'S': {
        this.targetTheta = this.theta;
        this.targetPhi = (this.phi + 90) % 360;
        break;
      }
      case 'T': {
        this.targetTheta = this.theta;
        this.targetPhi = (this.phi + 45) % 360;
        break;
      }
      case 'Y': {
        this.targetTheta = 180 - this.theta;
        this.targetPhi = (this.phi + 180) % 360;
        break;
      }
      case '|0>': {
        this.targetTheta = 0;
        this.targetPhi = 0;
        break;
      }
      case '|1>': {
        this.targetTheta = 180;
        this.targetPhi = 0;
        break;
      }
      case '|+>': {
        this.targetTheta = 90;
        this.targetPhi = 0;
        break;
      }
      case '|->': {
        this.targetTheta = 90;
        this.targetPhi = 180;
        break;
      }
    }

    this.animate();
  }

  animate() {
    this.animating = true;
    const step = () => {
      const dt = (this.targetTheta - this.theta) * 0.12;
      const dp = (this.targetPhi - this.phi) * 0.12;

      this.theta += dt;
      this.phi += dp;

      if (Math.abs(dt) < 0.1 && Math.abs(dp) < 0.1) {
        this.theta = this.targetTheta;
        this.phi = this.targetPhi;
        this.animating = false;
      }

      this.draw();

      if (this.animating) {
        requestAnimationFrame(step);
      }

      // Update state display
      this.updateStateDisplay();
    };
    step();
  }

  updateStateDisplay() {
    const alpha = Math.cos(this.theta * Math.PI / 360);
    const betaR = Math.cos(this.phi * Math.PI / 180) * Math.sin(this.theta * Math.PI / 360);
    const betaI = Math.sin(this.phi * Math.PI / 180) * Math.sin(this.theta * Math.PI / 360);
    const p0 = alpha * alpha * 100;
    const p1 = (betaR * betaR + betaI * betaI) * 100;

    const ket0 = document.getElementById('ibm-ket0');
    const ket1 = document.getElementById('ibm-ket1');
    const p0El = document.getElementById('ibm-p0');
    const p1El = document.getElementById('ibm-p1');
    const thetaEl = document.getElementById('ibm-theta');
    const phiEl = document.getElementById('ibm-phi');

    if (ket0) ket0.textContent = `|0\u27E9 ${p0.toFixed(1)}%`;
    if (ket1) ket1.textContent = `|1\u27E9 ${p1.toFixed(1)}%`;
    if (p0El) p0El.style.width = p0 + '%';
    if (p1El) p1El.style.width = p1 + '%';
    if (thetaEl) thetaEl.textContent = this.theta.toFixed(1) + '\u00B0';
    if (phiEl) phiEl.textContent = this.phi.toFixed(1) + '\u00B0';
  }

  draw() {
    const ctx = this.ctx;
    const size = this.displaySize;
    const cx = size;
    const cy = size;
    const r = size * 0.7;

    ctx.save();
    ctx.clearRect(0, 0, size * 2, size * 2);

    // Background
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.2);
    grad.addColorStop(0, 'rgba(96, 165, 250, 0.04)');
    grad.addColorStop(1, 'rgba(10, 14, 26, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size * 2, size * 2);

    // Sphere
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Equator
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Meridian
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.3, r, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Axes
    const al = r * 1.15;
    this.drawAxis(ctx, cx, cy + al, cx, cy - al, 'rgba(226, 232, 240, 0.35)');
    this.drawAxis(ctx, cx - al, cy, cx + al, cy, 'rgba(226, 232, 240, 0.2)');

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('|0\u27E9', cx + 10, cy - al + 6);
    ctx.fillText('|1\u27E9', cx + 10, cy + al - 2);
    ctx.fillText('+X', cx + al + 8, cy + 5);

    // State vector
    const thetaRad = this.theta * Math.PI / 180;
    const phiRad = this.phi * Math.PI / 180;
    const sx = cx + r * Math.sin(thetaRad) * Math.cos(phiRad);
    const sy = cy - r * Math.cos(thetaRad);

    // Arc from Z axis
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.35, -Math.PI / 2, -Math.PI / 2 + thetaRad, false);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Theta label
    const labelAngle = -Math.PI / 2 + thetaRad / 2;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('\u03B8', cx + r * 0.45 * Math.cos(labelAngle), cy + r * 0.45 * Math.sin(labelAngle) + 4);

    // Vector line with glow
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Point
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Projection
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, cy);
    ctx.moveTo(sx, sy);
    ctx.lineTo(cx, sy);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }

  drawAxis(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - 0.35), y2 - 10 * Math.sin(angle - 0.35));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle + 0.35), y2 - 10 * Math.sin(angle + 0.35));
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// ============================================================
// 10. QUANTUM COIN FLIP GAME
// ============================================================
class CoinFlipGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.state = 'ready'; // ready, superposition, collapsed
    this.result = null; // 'heads' or 'tails'
    this.theta = 90; // 0=always heads, 90=50/50, 180=always tails
    this.rotation = 0;
    this.spinSpeed = 0;
    this.superpositionTime = 0;
    this.totalFlips = 0;
    this.headsCount = 0;
    this.tailsCount = 0;
    this.history = [];
    this.glowPhase = 0;
    this.running = false;
    this.animFrame = null;

    this.resize();
    this.draw();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 320);
    this.canvas.width = size * 2;
    this.canvas.height = size * 2;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.displaySize = size;
  }

  flip() {
    if (this.state === 'superposition') return;
    this.state = 'superposition';
    this.result = null;
    this.spinSpeed = 12 + Math.random() * 6;
    this.superpositionTime = 0;
    this.running = true;
    this.animate();
    this.updateButtons();
  }

  measure() {
    if (this.state !== 'superposition') return;
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);

    const headsProb = Math.cos(this.theta * Math.PI / 360);
    const pHeads = headsProb * headsProb;
    this.result = Math.random() < pHeads ? 'heads' : 'tails';

    if (this.result === 'heads') {
      this.headsCount++;
    } else {
      this.tailsCount++;
    }
    this.totalFlips++;
    this.history.push(this.result);

    this.state = 'collapsed';
    this.spinSpeed = 0;
    this.rotation = this.result === 'heads' ? 0 : Math.PI;
    this.draw();
    this.updateStats();
    this.updateButtons();
  }

  animate() {
    if (!this.running) return;

    this.rotation += this.spinSpeed * 0.016;
    this.spinSpeed *= 0.997;
    this.superpositionTime += 0.016;
    this.glowPhase += 0.05;

    this.draw();
    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    const size = this.displaySize;
    const cx = size;
    const cy = size * 0.7;

    ctx.clearRect(0, 0, size * 2, size * 2);

    // Quantum glow when in superposition
    if (this.state === 'superposition') {
      const glowAlpha = 0.15 + Math.sin(this.glowPhase) * 0.1;
      const glowR = size * 0.3 + Math.sin(this.glowPhase * 0.7) * size * 0.05;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grad.addColorStop(0, `rgba(139, 92, 246, ${glowAlpha})`);
      grad.addColorStop(0.5, `rgba(96, 165, 250, ${glowAlpha * 0.5})`);
      grad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size * 2, size * 2);

      // Quantum particles
      for (let i = 0; i < 8; i++) {
        const angle = (this.glowPhase * 0.5 + i * Math.PI / 4) % (Math.PI * 2);
        const dist = size * 0.2 + Math.sin(this.glowPhase + i) * size * 0.05;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(px, py, 2 + Math.sin(this.glowPhase + i) * 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.4 + Math.sin(this.glowPhase + i) * 0.3})`;
        ctx.fill();
      }
    }

    // Coin
    const coinRadius = size * 0.18;
    const scaleX = Math.abs(Math.cos(this.rotation));

    // Coin shadow
    ctx.beginPath();
    ctx.ellipse(cx, cy + coinRadius + 5, coinRadius * 0.8, coinRadius * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();

    // Coin body
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(Math.max(scaleX, 0.05), 1);

    // Coin gradient
    const coinGrad = ctx.createLinearGradient(-coinRadius, -coinRadius, coinRadius, coinRadius);
    if (this.state === 'superposition') {
      coinGrad.addColorStop(0, '#8b5cf6');
      coinGrad.addColorStop(0.5, '#60a5fa');
      coinGrad.addColorStop(1, '#a78bfa');
    } else if (this.result === 'heads') {
      coinGrad.addColorStop(0, '#fbbf24');
      coinGrad.addColorStop(0.5, '#f59e0b');
      coinGrad.addColorStop(1, '#d97706');
    } else {
      coinGrad.addColorStop(0, '#60a5fa');
      coinGrad.addColorStop(0.5, '#3b82f6');
      coinGrad.addColorStop(1, '#2563eb');
    }

    ctx.beginPath();
    ctx.arc(0, 0, coinRadius, 0, Math.PI * 2);
    ctx.fillStyle = coinGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Coin face
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${coinRadius * 0.7}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

    if (this.state === 'superposition') {
      ctx.fillText('|?\u27E9', 0, 0);
    } else if (this.result === 'heads') {
      ctx.fillText('H', 0, 0);
    } else {
      ctx.fillText('T', 0, 0);
    }

    ctx.restore();

    // State label
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px Inter, sans-serif';
    if (this.state === 'superposition') {
      ctx.fillStyle = '#a78bfa';
      ctx.fillText('SUPERPOSITION', cx, cy + coinRadius + 40);
      ctx.font = '13px Inter, sans-serif';
      ctx.fillStyle = 'rgba(167, 139, 250, 0.7)';
      ctx.fillText('Prob: ' + (Math.cos(this.theta * Math.PI / 360) * Math.cos(this.theta * Math.PI / 360) * 100).toFixed(1) + '% |0\u27E9 + ' + (Math.sin(this.theta * Math.PI / 360) * Math.sin(this.theta * Math.PI / 360) * 100).toFixed(1) + '% |1\u27E9', cx, cy + coinRadius + 60);
    } else if (this.state === 'collapsed') {
      ctx.fillStyle = this.result === 'heads' ? '#fbbf24' : '#60a5fa';
      ctx.fillText(this.result === 'heads' ? 'HEADS' : 'TAILS', cx, cy + coinRadius + 40);
    } else {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.fillText('Click "Flip" to start', cx, cy + coinRadius + 40);
    }

    // Probability distribution bar
    this.drawDistributionBar(ctx, size);
  }

  drawDistributionBar(ctx, size) {
    const barY = size * 1.55;
    const barW = size * 1.6;
    const barH = 16;
    const barX = (size * 2 - barW) / 2;

    // Background
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 8);
    ctx.fill();

    if (this.totalFlips > 0) {
      const headsFrac = this.headsCount / this.totalFlips;
      const tailsFrac = this.tailsCount / this.totalFlips;

      // Heads portion
      ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW * headsFrac, barH, 8);
      ctx.fill();

      // Tails portion
      ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
      ctx.beginPath();
      ctx.roundRect(barX + barW * headsFrac, barY, barW * tailsFrac, barH, [0, 8, 8, 0]);
      ctx.fill();
    }

    // Labels
    ctx.textAlign = 'center';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Heads: ' + this.headsCount + '  Tails: ' + this.tailsCount, size, barY - 8);

    // Ideal line at 50%
    ctx.beginPath();
    ctx.moveTo(size, barY);
    ctx.lineTo(size, barY + barH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  updateStats() {
    const totalEl = document.getElementById('coin-total');
    const headsEl = document.getElementById('coin-heads');
    const tailsEl = document.getElementById('coin-tails');
    if (totalEl) totalEl.textContent = this.totalFlips;
    if (headsEl) headsEl.textContent = this.headsCount;
    if (tailsEl) tailsEl.textContent = this.tailsCount;
    this.updateDistBars();
  }

  updateButtons() {
    const flipBtn = document.getElementById('coin-flip-btn');
    const measureBtn = document.getElementById('coin-measure-btn');
    if (flipBtn) flipBtn.disabled = this.state === 'superposition';
    if (measureBtn) measureBtn.disabled = this.state !== 'superposition';
  }

  setTheta(val) {
    this.theta = val;
    const thetaDisplay = document.getElementById('coin-theta-val');
    if (thetaDisplay) thetaDisplay.textContent = val;
    this.draw();
    this.updateDistBars();
  }

  updateDistBars() {
    const headsBar = document.getElementById('coin-heads-bar');
    const tailsBar = document.getElementById('coin-tails-bar');
    const headsPct = document.getElementById('coin-heads-pct');
    const tailsPct = document.getElementById('coin-tails-pct');
    if (this.totalFlips > 0) {
      const h = (this.headsCount / this.totalFlips * 100);
      const t = (this.tailsCount / this.totalFlips * 100);
      if (headsBar) headsBar.style.width = h + '%';
      if (tailsBar) tailsBar.style.width = t + '%';
      if (headsPct) headsPct.textContent = h.toFixed(1) + '%';
      if (tailsPct) tailsPct.textContent = t.toFixed(1) + '%';
    }
  }

  reset() {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.state = 'ready';
    this.result = null;
    this.rotation = 0;
    this.spinSpeed = 0;
    this.totalFlips = 0;
    this.headsCount = 0;
    this.tailsCount = 0;
    this.history = [];
    this.draw();
    this.updateStats();
    this.updateButtons();
  }
}

// ============================================================
// 11. QUANTUM ENTANGLEMENT LAB
// ============================================================
class EntanglementLab {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.q0Theta = 0;
    this.q1Theta = 0;
    this.entangled = false;
    this.measurementHistory = [];
    this.particles = [];
    this.particlePhase = 0;
    this.running = false;
    this.animFrame = null;

    this.resize();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 500);
    this.canvas.width = size * 2;
    this.canvas.height = size * 2;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.displaySize = size;
  }

  setQ0Theta(val) {
    this.q0Theta = val;
    if (this.entangled) {
      this.q1Theta = 180 - val;
    }
    this.draw();
  }

  setQ0Phi(val) {
    this.q0Phi = val;
    this.draw();
  }

  entangle() {
    this.entangled = true;
    this.q1Theta = 180 - this.q0Theta;
    this.draw();
    this.updateEntanglementStatus();
  }

  measure() {
    const q0Heads = Math.random() < (Math.cos(this.q0Theta * Math.PI / 360) ** 2);
    const result = q0Heads ? 'Heads' : 'Tails';

    // Anti-correlated when entangled
    const q1Result = this.entangled ? (q0Heads ? 'Tails' : 'Heads') :
      (Math.random() < (Math.cos(this.q1Theta * Math.PI / 360) ** 2) ? 'Heads' : 'Tails');

    this.measurementHistory.unshift({
      q0: result,
      q1: q1Result,
      correlated: this.entangled
    });

    if (this.measurementHistory.length > 20) this.measurementHistory.pop();

    this.draw();
    this.updateMeasurementHistory();
    this.updateEntanglementStatus();
  }

  updateEntanglementStatus() {
    const statusEl = document.getElementById('entangle-result');
    if (statusEl) {
      statusEl.textContent = this.entangled ? '\u2728 ENTANGLED \u2014 Q0 and Q1 are now correlated!' : '';
      statusEl.style.color = this.entangled ? '#a78bfa' : 'rgba(148, 163, 184, 0.7)';
    }
  }

  updateMeasurementHistory() {
    const listEl = document.getElementById('entangle-history');
    if (!listEl) return;

    listEl.innerHTML = '';
    this.measurementHistory.forEach(entry => {
      const li = document.createElement('li');
      li.style.padding = '4px 8px';
      li.style.marginBottom = '4px';
      li.style.borderRadius = '6px';
      li.style.background = entry.correlated ? 'rgba(139, 92, 246, 0.1)' : 'rgba(96, 165, 250, 0.1)';
      li.style.fontSize = '13px';
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      const q0Color = entry.q0 === 'Heads' ? '#fbbf24' : '#60a5fa';
      const q1Color = entry.q1 === 'Heads' ? '#fbbf24' : '#60a5fa';
      li.innerHTML = `<span style="color:${q0Color}">Q0: ${entry.q0}</span> → <span style="color:${q1Color}">Q1: ${entry.q1}</span>` +
        (entry.correlated ? ' <span style="color:#34d399;font-size:11px">✓ correlated</span>' : '');
      listEl.appendChild(li);
    });
  }

  animate() {
    this.running = true;
    this.particlePhase += 0.03;
    this.draw();
    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  draw() {
    const ctx = this.ctx;
    const size = this.displaySize;
    ctx.clearRect(0, 0, size * 2, size * 2);

    const q0cx = size * 0.3;
    const q1cx = size * 1.7;
    const cy = size * 0.85;
    const sphereR = size * 0.28;

    // Connection line when entangled
    if (this.entangled) {
      // Animated particles along connection
      const numParticles = 12;
      for (let i = 0; i < numParticles; i++) {
        const t = ((i / numParticles + this.particlePhase * 0.1) % 1);
        const px = q0cx + (q1cx - q0cx) * t;
        const py = cy + Math.sin(t * Math.PI * 4 + this.particlePhase) * 10;
        const alpha = 0.2 + Math.sin(this.particlePhase + i * 0.5) * 0.15;

        ctx.beginPath();
        ctx.arc(px, py, 2 + Math.sin(this.particlePhase + i) * 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.fill();
      }

      // Connection line
      ctx.beginPath();
      ctx.moveTo(q0cx + sphereR, cy);
      ctx.lineTo(q1cx - sphereR, cy);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Bloch sphere for Q0
    this.drawBlochSphere(ctx, q0cx, cy, sphereR, this.q0Theta, '#60a5fa', 'Q0');

    // Draw Bloch sphere for Q1
    const q1Theta = this.entangled ? 180 - this.q0Theta : this.q1Theta;
    this.drawBlochSphere(ctx, q1cx, cy, sphereR, q1Theta, '#a78bfa', 'Q1');
  }

  drawBlochSphere(ctx, cx, cy, r, theta, color, label) {
    // Sphere outline
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = color.replace(')', ', 0.25)').replace('rgb', 'rgba').replace('#', '');
    ctx.strokeStyle = `${color}40`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Equator
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `${color}20`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Axes
    const al = r * 1.1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + al);
    ctx.lineTo(cx, cy - al);
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('|0\u27E9', cx, cy - al - 8);
    ctx.fillText('|1\u27E9', cx, cy + al + 14);
    ctx.fillText(label, cx, cy + r * 0.5);

    // State vector
    const thetaRad = theta * Math.PI / 180;
    const sx = cx + r * Math.sin(thetaRad);
    const sy = cy - r * Math.cos(thetaRad);

    // Vector line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Glow point
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(sx, sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  stop() {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}

// ============================================================
// HELP TOOLTIP SYSTEM (Basic/Advanced Tabs)
// ============================================================
class HelpSystem {
  constructor() {
    this.activeTooltip = null;
    this.activeTab = 'basic';
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.help-trigger');
      if (trigger) {
        e.stopPropagation();
        const id = trigger.dataset.help;
        if (this.activeTooltip && this.activeTooltip.dataset.helpId === id) {
          this.close();
          return;
        }
        this.show(trigger, id);
        return;
      }
      const tab = e.target.closest('.help-tab');
      if (tab) {
        e.stopPropagation();
        this.switchTab(tab.dataset.tab);
        return;
      }
      if (!e.target.closest('.help-bubble')) {
        this.close();
      }
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    if (!this.activeTooltip) return;
    this.activeTooltip.querySelectorAll('.help-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    const basic = this.activeTooltip.querySelector('.help-tab-basic');
    const adv = this.activeTooltip.querySelector('.help-tab-advanced');
    if (basic) basic.style.display = tab === 'basic' ? 'block' : 'none';
    if (adv) adv.style.display = tab === 'advanced' ? 'block' : 'none';
  }

  show(trigger, id) {
    this.close();
    this.activeTab = 'basic';
    const info = this.getInfo(id);
    if (!info) return;

    const bubble = document.createElement('div');
    bubble.className = 'help-bubble';
    bubble.dataset.helpId = id;

    const basicHtml = this.renderContent(info.basic);
    const advHtml = this.renderContent(info.advanced);

    bubble.innerHTML =
      '<div class="help-bubble-header"><span>' + info.title + '</span><button class="help-bubble-close">&times;</button></div>' +
      '<div class="help-tabs"><button class="help-tab active" data-tab="basic">Beginner</button><button class="help-tab" data-tab="advanced">Advanced</button></div>' +
      '<div class="help-tab-content help-tab-basic">' + basicHtml + '</div>' +
      '<div class="help-tab-content help-tab-advanced" style="display:none">' + advHtml + '</div>';

    bubble.querySelector('.help-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    document.body.appendChild(bubble);

    const tr = trigger.getBoundingClientRect();
    let left = tr.left;
    if (left + 370 > window.innerWidth) left = window.innerWidth - 380;
    if (left < 10) left = 10;
    bubble.style.left = left + 'px';
    bubble.style.top = (tr.bottom + 10) + 'px';

    requestAnimationFrame(() => {
      if (tr.bottom + bubble.offsetHeight + 20 > window.innerHeight) {
        bubble.style.top = Math.max(10, tr.top - bubble.offsetHeight - 10) + 'px';
      }
    });

    this.activeTooltip = bubble;
  }

  renderContent(data) {
    if (!data) return '<p style="padding:14px 16px;color:rgba(148,163,184,0.5);">No details available.</p>';
    var html = '';
    if (data.text) html += '<div class="help-bubble-text">' + data.text + '</div>';
    if (data.steps) {
      html += '<div class="help-bubble-steps">';
      data.steps.forEach(function(s, i) {
        html += '<div class="help-step"><span class="help-step-num">' + (i + 1) + '</span><span>' + s + '</span></div>';
      });
      html += '</div>';
    }
    if (data.analogy) {
      html += '<div class="help-analogy">' + data.analogy + '</div>';
    }
    return html;
  }

  close() {
    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
    }
  }

  getInfo(id) {
    return this.data[id] || null;
  }

  get data() {
    return {
      'qubit-toggle': {
        title: 'Classical Bit',
        basic: {
          text: 'A classical bit is like a light switch \u2014 it\u2019s either ON (1) or OFF (0). Never both at the same time. Click the cells to flip between 0 and 1.',
          analogy: 'Think of it like a coin lying on a table. It shows either heads OR tails. It can\u2019t show both at once.',
        },
        advanced: {
          text: 'A classical bit stores exactly one binary value: 0 or 1. It has no concept of superposition \u2014 the fundamental difference between classical and quantum information.',
        },
      },
      'qubit-sliders': {
        title: 'Qubit State Explorer',
        basic: {
          text: 'A qubit is like a coin that can be spun. While spinning, it\u2019s kind of heads AND tails at the same time. The sliders let you control this:',
          steps: [
            '<strong>\u03B8 (theta)</strong> \u2014 Controls the balance. Slide left = more likely to be |0\u27E9. Slide right = more likely to be |1\u27E9. Middle = 50/50.',
            '<strong>\u03C6 (phi)</strong> \u2014 Controls the \u201Cflavor\u201D of the superposition. It doesn\u2019t change the probabilities you measure, but it affects how this qubit interacts with other qubits.',
            'The probability bars update instantly as you drag \u2014 showing your chances of measuring 0 or 1.',
          ],
          analogy: 'Imagine shaking a box with a marble inside. \u03B8 controls how the marble is biased toward one side. You won\u2019t know which side until you open the box (measure).',
        },
        advanced: {
          text: 'The state is |\u03C8\u27E9 = \u03B1|0\u27E9 + \u03B2|1\u27E9 where \u03B1 = cos(\u03B8/2) and \u03B2 = sin(\u03B8/2)\u00B7e^(i\u03C6). \u03B8 is the polar angle on the Bloch sphere, \u03C6 is the azimuthal angle.',
          steps: [
            '\u03B8 = 0\u00B0 \u2192 |\u03C8\u27E9 = |0\u27E9 (100% probability of measuring 0)',
            '\u03B8 = 90\u00B0 \u2192 equal superposition (50/50 measurement)',
            '\u03B8 = 180\u00B0 \u2192 |\u03C8\u27E9 = |1\u27E9 (100% probability of measuring 1)',
            '\u03C6 affects the relative phase between |0\u27E9 and |1\u27E9 components',
            'Constraint: |\u03B1|\u00B2 + |\u03B2|\u00B2 = 1 (probabilities always sum to 100%)',
          ],
        },
      },
      'bloch-presets': {
        title: 'Bloch Sphere Presets',
        basic: {
          text: 'Click these buttons to jump the golden arrow to famous quantum states. The arrow shows what state the qubit is in right now.',
          steps: [
            '<strong>|0\u27E9</strong> \u2014 Arrow points UP (north pole). The qubit is definitely 0.',
            '<strong>|1\u27E9</strong> \u2014 Arrow points DOWN (south pole). The qubit is definitely 1.',
            '<strong>|+\u27E9</strong> \u2014 Arrow points RIGHT (equator). It\u2019s a 50/50 mix of 0 and 1.',
            '<strong>|\u2212\u27E9</strong> \u2014 Arrow points LEFT. Also 50/50, but with a \u201Cnegative\u201D twist.',
            '<strong>|i\u27E9</strong> \u2014 Arrow points toward you. 50/50 with a different twist.',
            '<strong>45\u00B0 Mix</strong> \u2014 Arrow halfway between top and equator. About 85% chance of 0.',
          ],
          analogy: 'The Bloch sphere is like a globe. North pole = definitely 0. South pole = definitely 1. The equator = maximum uncertainty (50/50). Any point in between = some mix.',
        },
        advanced: {
          text: 'Each point on the Bloch sphere corresponds to a unique pure qubit state |\u03C8\u27E9 = cos(\u03B8/2)|0\u27E9 + sin(\u03B8/2)e^(i\u03C6)|1\u27E9.',
          steps: [
            '|0\u27E9 at \u03B8=0\u00B0 (north pole)',
            '|1\u27E9 at \u03B8=180\u00B0 (south pole)',
            '|+\u27E9 = (|0\u27E9+|1\u27E9)/\u221A2 at \u03B8=90\u00B0, \u03C6=0\u00B0',
            '|\u2212\u27E9 = (|0\u27E9\u2212|1\u27E9)/\u221A2 at \u03B8=90\u00B0, \u03C6=180\u00B0',
            '|i\u27E9 = (|0\u27E9+i|1\u27E9)/\u221A2 at \u03B8=90\u00B0, \u03C6=90\u00B0',
            'Measurement collapses to |0\u27E9 or |1\u27E9 with probabilities cos\u00B2(\u03B8/2) and sin\u00B2(\u03B8/2)',
          ],
        },
      },
      'circuit-bell': {
        title: 'Bell State Circuit',
        basic: {
          text: 'This circuit takes two separate qubits and makes them into an entangled pair \u2014 like two magic dice that always show the same number when rolled.',
          steps: [
            '<strong>Step 1:</strong> We flip a \u201Cquantum coin\u201D on Q0 \u2014 it\u2019s now randomly 0 or 1 (superposition).',
            '<strong>Step 2:</strong> We connect Q0 to Q1 with a special gate. Now Q1 copies whatever Q0 is.',
            '<strong>Result:</strong> Either both are 0 (|00\u27E9) or both are 1 (|11\u27E9). 50/50 chance.',
            'The spooky part: neither qubit has a definite value until you measure. But they always agree!',
          ],
          analogy: 'Imagine putting one cat in a box in London and another in Tokyo. When you open the London box and find a black cat, the Tokyo box instantly contains a black cat too. No signal was sent \u2014 they were linked from the start.',
        },
        advanced: {
          text: 'Creates the Bell state |\u03A6+\u27E9 = (|00\u27E9 + |11\u27E9)/\u221A2 through H gate on Q0 followed by CNOT(Q0\u2192Q1).',
          steps: [
            'H|0\u27E9 = (|0\u27E9+|1\u27E9)/\u221A2 on Q0',
            'CNOT flips Q1 when Q0=1: (|00\u27E9+|11\u27E9)/\u221A2',
            'Measurement yields |00\u27E9 or |11\u27E9 with equal probability',
            'This is the simplest entangled state \u2014 maximally entangled',
            'Cannot be written as a product of individual qubit states',
          ],
        },
      },
      'circuit-ghz': {
        title: 'GHZ State Circuit',
        basic: {
          text: 'This circuit entangles THREE qubits together. It\u2019s like the Bell state but with one extra qubit \u2014 now all three must agree.',
          steps: [
            '<strong>Step 1:</strong> Flip a quantum coin on Q0 (superposition \u2014 random 0 or 1).',
            '<strong>Step 2:</strong> Connect Q0 to Q1 \u2014 now Q1 copies Q0.',
            '<strong>Step 3:</strong> Connect Q0 to Q2 \u2014 now Q2 also copies Q0.',
            '<strong>Result:</strong> All three are either |000\u27E9 or |111\u27E9. 50/50.',
            'If you measure ANY one of them, you instantly know all three.',
          ],
          analogy: 'Three magic dice in three different cities. When you roll one and get a 6, the other two instantly show 6 as well \u2014 even though they haven\u2019t been touched.',
        },
        advanced: {
          text: 'GHZ state: |GHZ\u27E9 = (|000\u27E9 + |111\u27E9)/\u221A2. A 3-qubit maximally entangled state.',
          steps: [
            'H on Q0: (|0\u27E9+|1\u27E9)/\u221A2 \u2297 |0\u27E9 \u2297 |0\u27E9',
            'CNOT(Q0\u2192Q1): creates Bell pair between Q0, Q1',
            'CNOT(Q0\u2192Q2): extends entanglement to Q2',
            'Used to test Bell inequalities with 3 particles',
            'More fragile to decoherence than Bell pairs',
          ],
        },
      },
      'circuit-random': {
        title: 'Random Rotation Circuit',
        basic: {
          text: 'This circuit applies several different quantum operations to create a perfectly mixed state \u2014 all four outcomes become equally likely.',
          steps: [
            '<strong>H gate</strong> \u2014 Creates a 50/50 superposition.',
            '<strong>S gate</strong> \u2014 Adds a quarter-turn \u201Ctwist\u201D to the quantum wave.',
            '<strong>T gate</strong> \u2014 Adds an eighth-turn \u201Ctwist\u201D.',
            '<strong>X gate</strong> \u2014 Flips the qubit (like NOT).',
            '<strong>Result:</strong> |00\u27E9, |01\u27E9, |10\u27E9, |11\u27E9 all get exactly 25% chance.',
          ],
          analogy: 'It\u2019s like taking a die and spinning it on every axis \u2014 when it finally stops, every face has an equal chance of facing up.',
        },
        advanced: {
          text: 'Applies H, S, T, X gates to Q0 and Z, H, S to Q1, creating a uniform superposition over all 4 basis states.',
          steps: [
            'The combination of phase gates (S, T) and bit flip (X) creates complex interference',
            'Result: equal probability amplitudes for all basis states',
            'Demonstrates how gate sequences create specific output distributions',
          ],
        },
      },
      'circuit-bitflip': {
        title: 'Bit Flip Circuit',
        basic: {
          text: 'This circuit shows that quantum operations can be undone. Flip a qubit, then flip it back \u2014 it returns to exactly where it started.',
          steps: [
            '<strong>First X gate:</strong> Flips |0\u27E9 to |1\u27E9 (like a NOT gate).',
            '<strong>Second X gate:</strong> Flips |1\u27E9 back to |0\u27E9.',
            '<strong>Result:</strong> Back to 100% |0\u27E9. Nothing changed!',
          ],
          analogy: 'It\u2019s like doing a cartwheel and then doing another cartwheel in reverse \u2014 you end up exactly where you started.',
        },
        advanced: {
          text: 'Demonstrates unitarity: X\u00B7X = I (identity). All quantum gates are reversible.',
          steps: [
            'X|0\u27E9 = |1\u27E9',
            'X|1\u27E9 = |0\u27E9',
            'Therefore X\u00B2 = I (applying X twice gives identity)',
            'This is because quantum gates are unitary matrices: X\u2020X = I',
            'Unlike classical AND/OR gates which lose information',
          ],
        },
      },
      'circuit-gate-H': {
        title: 'Hadamard Gate (H)',
        basic: {
          text: 'The H gate is like a \u201Cquantum coin flipper.\u201D It takes a definite state (like |0\u27E9) and puts it into a perfectly balanced superposition.',
          steps: [
            'Input |0\u27E9 \u2192 Output: 50% chance of |0\u27E9, 50% chance of |1\u27E9',
            'Input |1\u27E9 \u2192 Output: 50% chance of |0\u27E9, 50% chance of |1\u27E9',
            'This is the gate that creates superposition \u2014 the core of quantum computing!',
          ],
          analogy: 'Imagine a coin that\u2019s been sitting on \u201Cheads.\u201D The H gate spins it \u2014 now it\u2019s equally likely to land on heads or tails when you stop it.',
        },
        advanced: {
          text: 'H = 1/\u221A2 [1 1; 1 -1]. Rotates 180\u00B0 around the X+Z diagonal axis of the Bloch sphere.',
          steps: [
            'H|0\u27E9 = (|0\u27E9+|1\u27E9)/\u221A2 = |+\u27E9',
            'H|1\u27E9 = (|0\u27E9-|1\u27E9)/\u221A2 = |\u2212\u27E9',
            'H is its own inverse: H\u00B2 = I',
            'Used in nearly every quantum algorithm',
          ],
        },
      },
      'circuit-gate-X': {
        title: 'Pauli-X Gate (NOT)',
        basic: {
          text: 'The X gate flips a qubit \u2014 |0\u27E9 becomes |1\u27E9 and vice versa. It\u2019s the quantum version of a light switch toggle.',
          steps: [
            '|0\u27E9 \u2192 |1\u27E9 (turns 0 into 1)',
            '|1\u27E9 \u2192 |0\u27E9 (turns 1 into 0)',
            'Exactly like a classical NOT gate!',
          ],
          analogy: 'Flipping a light switch. ON \u2192 OFF, OFF \u2192 ON.',
        },
        advanced: {
          text: 'X = [0 1; 1 0]. 180\u00B0 rotation around the X axis of the Bloch sphere. Also called a \u201Cbit flip.\u201D',
          steps: [
            'X is unitary and self-inverse: X\u00B2 = I',
            'In the Bloch sphere picture: flips \u03B8 to \u03C0\u2212\u03B8',
            'Does not affect the phase (\u03C6)',
          ],
        },
      },
      'circuit-gate-Z': {
        title: 'Pauli-Z Gate (Phase Flip)',
        basic: {
          text: 'The Z gate is sneaky \u2014 it doesn\u2019t change what you\u2019d measure (0 is still 0, 1 is still 1), but it changes the \u201Cquantum flavor\u201D (phase). This matters when qubits interact with each other.',
          steps: [
            '|0\u27E9 \u2192 |0\u27E9 (no change \u2014 you\u2019d still measure 0)',
            '|1\u27E9 \u2192 \u2212|1\u27E9 (still 1, but with a negative sign)',
            'You can\u2019t see this change by measuring, but it affects quantum interference.',
          ],
          analogy: 'It\u2019s like giving a ball a spin in the opposite direction. The ball looks the same, but if it collides with another spinning ball, the result will be different.',
        },
        advanced: {
          text: 'Z = [1 0; 0 -1]. 180\u00B0 rotation around the Z axis. Flips the phase of |1\u27E9.',
          steps: [
            'Z|0\u27E9 = |0\u27E9',
            'Z|1\u27E9 = \u2212|1\u27E9',
            'Does not change measurement probabilities',
            'Critical for creating quantum interference effects',
          ],
        },
      },
      'circuit-gate-S': {
        title: 'S Gate (Phase Gate)',
        basic: {
          text: 'The S gate adds a small \u201Ctwist\u201D to the quantum wave. It doesn\u2019t change measurement probabilities, but it shifts the phase by 90\u00B0 \u2014 half of what the Z gate does.',
          steps: [
            '|0\u27E9 \u2192 |0\u27E9 (no change)',
            '|1\u27E9 \u2192 i|1\u27E9 (adds a 90\u00B0 phase shift)',
            'You can\u2019t see this by measuring, but it affects how qubits interfere with each other.',
          ],
          analogy: 'Like giving a spinning top a gentle nudge \u2014 it\u2019s still spinning the same way, but now it\u2019s slightly out of sync with where it was before.',
        },
        advanced: {
          text: 'S = [1 0; 0 i]. 90\u00B0 rotation around the Z axis. S = \u221AZ (applying S twice gives Z).',
          steps: [
            'S\u00B2 = Z',
            'Also called the \u201Cphase gate\u201D',
            'Used in many quantum error correction codes',
          ],
        },
      },
      'circuit-gate-T': {
        title: 'T Gate (\u03C0/8 Gate)',
        basic: {
          text: 'The T gate adds an even smaller twist \u2014 half of what S does. It shifts the phase by 45\u00B0. This tiny gate is super important for building reliable quantum computers.',
          steps: [
            '|0\u27E9 \u2192 |0\u27E9 (no change)',
            '|1\u27E9 \u2192 e^(i\u03C0/4)|1\u27E9 (adds a 45\u00B0 phase shift)',
            'So small you can\u2019t even see it on the Bloch sphere, but it\u2019s essential for error correction.',
          ],
          analogy: 'Like barely tapping a spinning top \u2014 it\u2019s a tiny adjustment, but precision matters in quantum computing.',
        },
        advanced: {
          text: 'T = [1 0; 0 e^(i\u03C0/4)]. 45\u00B0 rotation around Z. T = \u221AS. Critical for fault-tolerant quantum computing.',
          steps: [
            'T\u00B2 = S',
            'Called \u201C\u03C0/8 gate\u201D (not to be confused with a \u03C0/8 rotation)',
            'The T gate is the most expensive gate in fault-tolerant implementations',
            'Required for universal quantum computation',
          ],
        },
      },
      'circuit-gate-CNOT': {
        title: 'CNOT Gate (Controlled-NOT)',
        basic: {
          text: 'The CNOT gate connects two qubits. It looks at the first qubit (the \u201Ccontrol\u201D), and if it\u2019s 1, it flips the second qubit (the \u201Ctarget\u201D). If the control is 0, nothing happens.',
          steps: [
            'Control=0, Target=0 \u2192 stays |00\u27E9 (nothing happens)',
            'Control=0, Target=1 \u2192 stays |01\u27E9 (nothing happens)',
            'Control=1, Target=0 \u2192 becomes |11\u27E9 (target flips to 1!)',
            'Control=1, Target=1 \u2192 becomes |10\u27E9 (target flips to 0!)',
            'This is the gate that creates entanglement between qubits!',
          ],
          analogy: 'Like a conditional switch: \u201CIF this qubit is ON, THEN flip that qubit.\u201D It\u2019s the quantum version of \u201Cif X then Y.\u201D',
        },
        advanced: {
          text: 'CNOT flips the target qubit conditioned on the control qubit being |1\u27E9. It\u2019s a two-qubit gate essential for entanglement.',
          steps: [
            '|00\u27E9 \u2192 |00\u27E9',
            '|01\u27E9 \u2192 |01\u27E9',
            '|10\u27E9 \u2192 |11\u27E9',
            '|11\u27E9 \u2192 |10\u27E9',
            'Matrix: [1 0 0 0; 0 1 0 0; 0 0 0 1; 0 0 1 0]',
            'H + CNOT creates a Bell state from |00\u27E9',
          ],
        },
      },
      'gate-try': {
        title: 'Try Gates on Bloch Sphere',
        basic: {
          text: 'Click any gate button below the sphere and watch the golden arrow move! Each gate rotates the arrow to a new position, showing how the qubit state changes.',
          steps: [
            'The golden arrow = your qubit\u2019s current state',
            'Click H to see it move to the equator (superposition)',
            'Click X to flip it from top to bottom (or vice versa)',
            'Click Z to rotate it sideways (phase flip)',
            'Try pressing H then X then Z to see different rotations!',
          ],
          analogy: 'The Bloch sphere is like a globe, and the arrow is a compass needle. Each gate spins the needle to a different direction.',
        },
        advanced: {
          text: 'Each gate applies a unitary transformation, rotating the state vector on the Bloch sphere. Watch the probability display update in real-time.',
        },
      },
      'maze-start': {
        title: 'Quantum Maze Race',
        basic: {
          text: 'A race between a quantum computer and a classical computer through a maze. The quantum computer explores ALL paths at once, while the classical one checks paths one by one.',
          steps: [
            '<strong>Blue dots</strong> = Quantum computer (explores every path simultaneously)',
            '<strong>Orange dot</strong> = Classical computer (moves one step at a time)',
            '<strong>Star</strong> = The goal at the bottom-right',
            'Click \u201CStart Race\u201D and watch the quantum solver reach the goal first!',
          ],
          analogy: 'Imagine searching a maze. The classical computer is one person walking. The quantum computer is like having 100 clones \u2014 one goes down every corridor at the same time.',
        },
        advanced: {
          text: 'Demonstrates quantum parallelism: the quantum solver explores all valid paths simultaneously via superposition, while the classical solver uses greedy DFS with Manhattan distance heuristic.',
        },
      },
      'maze-reset': {
        title: 'New Maze',
        basic: {
          text: 'Generates a brand new random maze. The exit is always at the bottom-right corner. Try it a few times \u2014 the quantum solver wins every time!',
        },
        advanced: {
          text: 'Uses recursive backtracker algorithm to generate a perfect maze (exactly one path between any two points).',
        },
      },
      'pattern-start': {
        title: 'Pattern Memory Game',
        basic: {
          text: 'A memory game! Watch which cells light up, then click them back in the same order. Quantum mode is harder (more cells) but scores double.',
          steps: [
            'Watch the cells that flash \u2014 memorize which ones lit up',
            'Click the same cells to recreate the pattern',
            'You must select the exact same cells (order doesn\u2019t matter)',
            'Quantum mode: 4 cells light up (harder, 2 points)',
            'Classical mode: 2 cells light up (easier, 1 point)',
          ],
          analogy: 'Like Simon Says, but with quantum cells. The quantum version shows more patterns at once because qubits can hold more information simultaneously.',
        },
        advanced: {
          text: 'Demonstrates quantum memory advantage: a quantum system can store and process superpositions of 4 states simultaneously, versus 2 for classical bits.',
        },
      },
      'pattern-quantum': {
        title: 'Quantum Mode',
        basic: {
          text: 'In quantum mode, 4 random cells light up at once \u2014 like a qubit that can \u201Cremember\u201D 4 things simultaneously. This is harder to remember, but each correct answer earns 2 points!',
        },
        advanced: {
          text: 'Simulates a qubit in superposition of 4 computational basis states. The quantum advantage is that more information is processed in parallel.',
        },
      },
      'pattern-classical': {
        title: 'Classical Mode',
        basic: {
          text: 'In classical mode, only 2 cells light up \u2014 like a regular bit that can only handle one thing at a time. Easier to remember, but only 1 point per correct answer.',
        },
        advanced: {
          text: 'Represents classical information processing where each bit stores exactly one value. No superposition, no parallelism.',
        },
      },
      'parallel-start': {
        title: 'Parallel Computation',
        basic: {
          text: 'Watch a classical computer process 8 tasks one at a time while a quantum computer does all 8 at once!',
          steps: [
            '<strong>Top (Classical):</strong> Each bar fills up ONE AT A TIME \u2014 task 1, then task 2, then task 3...',
            '<strong>Bottom (Quantum):</strong> ALL bars fill up AT THE SAME TIME \u2014 everything happens in parallel!',
            'The quantum side finishes almost instantly while the classical side is still working.',
          ],
          analogy: 'Like a teacher grading papers. Classical = grading one paper at a time. Quantum = grading all papers simultaneously.',
        },
        advanced: {
          text: 'Demonstrates quantum parallelism: a quantum computer with n qubits can process 2^n inputs simultaneously. Here, 8 paths are processed in parallel.',
        },
      },
      'coin-flip': {
        title: 'Quantum Coin Flip',
        basic: {
          text: 'A quantum coin that can be both heads AND tails at the same time! Click \u201CFlip\u201D to start spinning (superposition), then \u201CMeasure\u201D to see which one it lands on.',
          steps: [
            '<strong>1. Flip</strong> \u2014 The coin enters superposition (spinning with a purple glow)',
            '<strong>2. Measure</strong> \u2014 The coin collapses to either heads or tails',
            'Adjust the \u03B8 slider to control the bias before flipping',
            'Flip many times to see the statistics match the probabilities!',
          ],
          analogy: 'A spinning coin is both heads and tails until it lands. The \u03B8 slider tilts the table \u2014 making one side more likely.',
        },
        advanced: {
          text: 'Models a qubit measurement. The coin state is cos(\u03B8/2)|H\u27E9 + sin(\u03B8/2)|T\u27E9. Measurement collapses to |H\u27E9 with probability cos\u00B2(\u03B8/2).',
        },
      },
      'coin-measure': {
        title: 'Measure the Coin',
        basic: {
          text: 'This stops the spinning and picks a result \u2014 heads or tails. The probability depends on the \u03B8 setting. With \u03B8=90\u00B0, it\u2019s a fair 50/50 coin.',
          steps: [
            'The coin must be in superposition (spinning) first',
            'Clicking Measure collapses it to one definite state',
            'With \u03B8=90\u00B0: 50% heads, 50% tails',
            'With \u03B8=45\u00B0: ~85% heads, ~15% tails',
            'Flip many times to see the distribution match!',
          ],
          analogy: 'Like catching a spinning coin mid-air and slapping it on the table. You see one side \u2014 but the other side was always possible.',
        },
        advanced: {
          text: 'Simulates projective measurement. The wavefunction collapses to an eigenstate of the measurement operator with probabilities given by the Born rule.',
        },
      },
      'coin-theta': {
        title: 'Probability Bias (\u03B8)',
        basic: {
          text: 'This slider controls how likely heads vs tails is when you measure.',
          steps: [
            '\u03B8 = 0\u00B0 \u2192 Always heads (like a coin weighted to one side)',
            '\u03B8 = 45\u00B0 \u2192 About 85% heads, 15% tails',
            '\u03B8 = 90\u00B0 \u2192 Exactly fair: 50% heads, 50% tails',
            '\u03B8 = 135\u00B0 \u2192 About 15% heads, 85% tails',
            '\u03B8 = 180\u00B0 \u2192 Always tails',
          ],
          analogy: 'Like tilting a spinning coin table. \u03B8=0\u00B0 tilts all the way to heads. \u03B8=90\u00B0 is perfectly level. \u03B8=180\u00B0 tilts all the way to tails.',
        },
        advanced: {
          text: '\u03B8 controls the polar angle of the qubit state. P(heads) = cos\u00B2(\u03B8/2), P(tails) = sin\u00B2(\u03B8/2). At \u03B8=90\u00B0, the state is |+\u27E9.',
        },
      },
      'entangle-btn': {
        title: 'Entangle Qubits',
        basic: {
          text: 'This links two qubits together so they become \u201Ctwins\u201D \u2014 when you measure one, you instantly know the other, no matter how far apart they are.',
          steps: [
            '<strong>Before:</strong> Q0 and Q1 are separate \u2014 measuring one tells you nothing about the other',
            '<strong>After clicking:</strong> They become entangled (a \u201CBell pair\u201D)',
            'Now if Q0 measures as Heads, Q1 will ALWAYS be Tails (and vice versa)',
            'They always give opposite results!',
          ],
          analogy: 'Imagine putting one red ball and one blue ball into two boxes randomly. When you open your box and see red, you instantly know the other box has blue \u2014 even if it\u2019s on the moon!',
        },
        advanced: {
          text: 'Creates the Bell state |\u03A6+\u27E9 = (|01\u27E9+|10\u27E9)/\u221A2 (anti-correlated). The qubits are maximally entangled.',
          steps: [
            'Before: separable state |\u03C8\u2080\u27E9\u2297|\u03C8\u2081\u27E9',
            'After: entangled state that cannot be factored',
            'Measurement of Q0 collapses the entire joint state',
            'Demonstrates non-locality (Bell inequality violation)',
          ],
        },
      },
      'entangle-measure': {
        title: 'Measure Both',
        basic: {
          text: 'Measures both qubits at the same time. When they\u2019re entangled, you\u2019ll see they always give OPPOSITE results \u2014 that\u2019s the \u201Cspooky\u201D correlation!',
          steps: [
            'Click this after entangling to see the correlation',
            'When entangled: Q0=Heads \u2192 Q1=Tails (always!)',
            'When entangled: Q0=Tails \u2192 Q1=Heads (always!)',
            'The history log shows all your previous measurements',
            'Try it many times \u2014 they ALWAYS give opposite results!',
          ],
          analogy: 'Like flipping two coins that are magically linked. Every single time one lands heads, the other lands tails. No exceptions!',
        },
        advanced: {
          text: 'Performs projective measurement on both qubits. For the anti-correlated Bell state, outcomes are always (H,T) or (T,H) with equal probability.',
        },
      },
      'entangle-theta': {
        title: 'Q0 Theta Slider',
        basic: {
          text: 'Adjusts Q0\u2019s starting angle. After you click \u201CEntangle,\u201D Q1 automatically mirrors this angle on the opposite side \u2014 that\u2019s what makes them correlated.',
        },
        advanced: {
          text: 'Sets the initial \u03B8 for Q0. After entanglement, Q1\u2019s state becomes anti-correlated: \u03B8\u2081 = 180\u00B0 - \u03B8\u2080.',
        },
      },
      'ibm-H': {
        title: 'Hadamard Gate',
        basic: {
          text: 'Click this to put the qubit into superposition \u2014 the arrow will move to the equator. Now it\u2019s a 50/50 mix of |0\u27E9 and |1\u27E9!',
        },
        advanced: {
          text: 'Applies H = 1/\u221A2 [1 1; 1 -1]. Rotates the state to the X+Z equatorial plane.',
        },
      },
      'ibm-X': {
        title: 'Pauli-X Gate',
        basic: {
          text: 'Click this to flip the qubit \u2014 if the arrow points up, it\u2019ll flip to down (and vice versa). Like a NOT gate.',
        },
        advanced: {
          text: 'Applies X = [0 1; 1 0]. 180\u00B0 rotation around the X axis of the Bloch sphere.',
        },
      },
      'ibm-Z': {
        title: 'Pauli-Z Gate',
        basic: {
          text: 'Click this to flip the \u201Cquantum flavor\u201D without changing the probabilities. The arrow stays at the same height but rotates sideways.',
        },
        advanced: {
          text: 'Applies Z = [1 0; 0 -1]. 180\u00B0 rotation around the Z axis. Phase flip.',
        },
      },
      'ibm-S': {
        title: 'S Gate',
        basic: {
          text: 'Click this for a 90\u00B0 twist \u2014 like Z but gentler. The arrow rotates a quarter turn around the vertical axis.',
        },
        advanced: {
          text: 'Applies S = [1 0; 0 i]. 90\u00B0 rotation around Z. S = \u221AZ.',
        },
      },
      'ibm-T': {
        title: 'T Gate',
        basic: {
          text: 'Click this for a tiny 45\u00B0 twist \u2014 even gentler than S. The smallest standard rotation.',
        },
        advanced: {
          text: 'Applies T = [1 0; 0 e^(i\u03C0/4)]. 45\u00B0 rotation around Z. T = \u221AS.',
        },
      },
      'ibm-reset': {
        title: 'Reset to |0\u27E9',
        basic: {
          text: 'Resets the qubit to the |0\u27E9 state \u2014 arrow points straight up to the north pole.',
        },
        advanced: {
          text: 'Sets \u03B8=0\u00B0, \u03C6=0\u00B0, corresponding to the |0\u27E9 computational basis state.',
        },
      },
      'ibm-plus': {
        title: 'Set to |+\u27E9',
        basic: {
          text: 'Sets the qubit to the |+\u27E9 state \u2014 arrow points to the equator. This is a perfect 50/50 superposition.',
        },
        advanced: {
          text: 'Sets \u03B8=90\u00B0, \u03C6=0\u00B0, corresponding to |+\u27E9 = (|0\u27E9+|1\u27E9)/\u221A2.',
        },
      },
    };
  }
}

// ============================================================
// 12. QUANTUM HISTORY TIMELINE
// ============================================================
function initQuantumTimeline() {
  const container = document.getElementById('history');
  if (!container) return;

  const events = [
    { year: '1980', title: 'Benioff\'s Quantum Mechanical Turing Machine', desc: 'Paul Benioff proposes the first quantum mechanical model of computation.' },
    { year: '1982', title: 'Feynman\'s Quantum Computer Proposal', desc: 'Richard Feynman suggests that quantum systems could simulate physics more efficiently than classical computers.' },
    { year: '1984', title: 'BB84 Quantum Key Distribution', desc: 'Bennett and Brassard introduce the first quantum cryptography protocol.' },
    { year: '1985', title: 'Deutsch\'s Universal Quantum Computer', desc: 'David Deutsch describes a universal quantum computer, establishing the theoretical foundation for quantum computing.' },
    { year: '1993', title: 'Quantum Teleportation Proposed', desc: 'Bennett, Brassard, and others propose the teleportation of quantum states using entanglement (EPR/Bell).' },
    { year: '1994', title: 'Shor\'s Algorithm', desc: 'Peter Shor develops a quantum algorithm for factoring large integers exponentially faster than classical methods.' },
    { year: '1996', title: 'Grover\'s Search Algorithm', desc: 'Lov Grover demonstrates a quantum algorithm for searching unsorted databases with quadratic speedup.' },
    { year: '1998', title: 'First 2-Qubit Quantum Computer', desc: 'Researchers at Oxford create the first working 2-qubit quantum computer using nuclear magnetic resonance.' },
    { year: '2019', title: 'Google Quantum Supremacy', desc: 'Google\'s Sycamore processor completes a calculation in 200 seconds that would take a supercomputer 10,000 years.' },
    { year: '2022', title: 'Nobel Prize in Physics', desc: 'Nobel Prize awarded to Aspect, Clauser, and Zeilinger for experiments with entangled photons.' },
    { year: '2024', title: 'Google Willow Chip', desc: 'Google announces the Willow quantum chip with 105 qubits and real-time error correction breakthroughs.' }
  ];

  let html = '<div class="timeline">';
  events.forEach((event, i) => {
    html += `
      <div class="timeline-item ${i % 2 === 0 ? 'left' : 'right'} fade-in">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">${event.year}</span>
          <h4 class="timeline-title">${event.title}</h4>
          <p class="timeline-desc">${event.desc}</p>
        </div>
      </div>`;
  });
  html += '</div>';

  container.innerHTML = html;

  // Re-observe new fade-in elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================================
// 14. SMOOTH SCROLL NAV
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('.learn-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// 15. CLASSICAL BIT TOGGLER
// ============================================================
function initClassicalBit() {
  const bits = document.querySelectorAll('.classical .bit-cell');
  bits.forEach(bit => {
    bit.addEventListener('click', () => {
      bit.classList.toggle('active');
      bit.textContent = bit.classList.contains('active') ? '1' : '0';
    });
  });
}

// ============================================================
// INIT ALL
// ============================================================
var mazeGame, patternGame, parallelDemo, interactiveBloch, coinFlipGame, entanglementLab, helpSystem;

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  initScrollAnimations();
  initSmoothScroll();
  initClassicalBit();
  initQubitControls();
  initBlochPresets();
  initCircuitPresets();
  initQuantumTimeline();

  // Initialize Q0 display
  updateQubitDisplay('q0');
  updateQubitDisplay('q1');

  // Games
  mazeGame = new MazeGame('maze-canvas');
  patternGame = new PatternGame('pattern-grid');
  parallelDemo = new ParallelDemo();
  interactiveBloch = new InteractiveBlochSphere('interactive-bloch-canvas');
  coinFlipGame = new CoinFlipGame('coin-canvas');
  entanglementLab = new EntanglementLab('entangle-canvas');
  helpSystem = new HelpSystem();

  // Gate buttons for interactive bloch
  document.querySelectorAll('.gate-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      interactiveBloch.applyGate(btn.dataset.gate);
    });
  });

  // Maze controls
  const mazeStart = document.getElementById('maze-start');
  const mazeReset = document.getElementById('maze-reset');
  if (mazeStart) mazeStart.addEventListener('click', () => mazeGame.start());
  if (mazeReset) mazeReset.addEventListener('click', () => mazeGame.reset());

  // Pattern controls
  const patternStart = document.getElementById('pattern-start');
  if (patternStart) patternStart.addEventListener('click', () => patternGame.start());

  // Parallel controls
  const parallelStart = document.getElementById('parallel-start');
  if (parallelStart) parallelStart.addEventListener('click', () => parallelDemo.start());

  // Coin Flip controls
  const coinFlipBtn = document.getElementById('coin-flip-btn');
  const coinMeasureBtn = document.getElementById('coin-measure-btn');
  const coinResetBtn = document.getElementById('coin-reset-btn');
  const coinThetaSlider = document.getElementById('coin-theta');
  if (coinFlipBtn) coinFlipBtn.addEventListener('click', () => coinFlipGame.flip());
  if (coinMeasureBtn) coinMeasureBtn.addEventListener('click', () => coinFlipGame.measure());
  if (coinResetBtn) coinResetBtn.addEventListener('click', () => coinFlipGame.reset());
  if (coinThetaSlider) coinThetaSlider.addEventListener('input', (e) => coinFlipGame.setTheta(parseFloat(e.target.value)));

  // Entanglement controls
  const entangleBtn = document.getElementById('entangle-btn');
  const entangleMeasureBtn = document.getElementById('entangle-measure-btn');
  const entangleQ0Slider = document.getElementById('entangle-theta');
  const entanglePhiSlider = document.getElementById('entangle-phi');
  if (entangleBtn) entangleBtn.addEventListener('click', () => entanglementLab.entangle());
  if (entangleMeasureBtn) entangleMeasureBtn.addEventListener('click', () => entanglementLab.measure());
  if (entangleQ0Slider) entangleQ0Slider.addEventListener('input', (e) => entanglementLab.setQ0Theta(parseFloat(e.target.value)));
  if (entanglePhiSlider) entanglePhiSlider.addEventListener('input', (e) => entanglementLab.setQ0Phi(parseFloat(e.target.value)));

  // Resize handler
  window.addEventListener('resize', () => {
    if (interactiveBloch) { interactiveBloch.resize(); interactiveBloch.draw(); }
    if (mazeGame) { mazeGame.resize(); mazeGame.draw(); }
    if (coinFlipGame) { coinFlipGame.resize(); coinFlipGame.draw(); }
    if (entanglementLab) { entanglementLab.resize(); }
  });
});
