
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 10;
const WIDTH = canvas.width / GRID_SIZE;
const HEIGHT = canvas.height / GRID_SIZE;

const directions = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0],
};

const players = [
    { x: 10, y: 10, dx: 1, dy: 0, color: "cyan", keys: ['w','a','s','d'], trail: [] },
    { x: WIDTH - 10, y: HEIGHT - 10, dx: -1, dy: 0, color: "orange", keys: ['ArrowUp','ArrowLeft','ArrowDown','ArrowRight'], trail: [] }
];

const occupied = new Set();

function keyHandler(e) {
    for (const p of players) {
        const idx = p.keys.indexOf(e.key);
        if (idx >= 0) {
            if (idx === 0 && p.dy === 0) { p.dx = 0; p.dy = -1; }
            if (idx === 1 && p.dx === 0) { p.dx = -1; p.dy = 0; }
            if (idx === 2 && p.dy === 0) { p.dx = 0; p.dy = 1; }
            if (idx === 3 && p.dx === 0) { p.dx = 1; p.dy = 0; }
        }
    }
}

document.addEventListener('keydown', keyHandler);

function update() {
    for (const p of players) {
        p.x += p.dx;
        p.y += p.dy;
        const key = p.x + ',' + p.y;

        if (p.x < 0 || p.y < 0 || p.x >= WIDTH || p.y >= HEIGHT || occupied.has(key)) {
            alert(p.color + " lost!");
            document.location.reload();
            return;
        }

        occupied.add(key);
        p.trail.push({ x: p.x, y: p.y });
    }
}

function draw() {
    for (const p of players) {
        ctx.fillStyle = p.color;
        for (const seg of p.trail) {
            ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
    }
}

function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 100);
