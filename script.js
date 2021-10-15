const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpi = window.devicePixelRatio;
const screenWidth = window.innerWidth * dpi;
const screenHeight = window.innerHeight * dpi;



let cellNumber = 50;
let cellColor = 'blue'
let cellSize = screenWidth / cellNumber;
let cellMatrix = [];

function createCellMatrix() {
    for (let x = 0; x < cellNumber; x++) {
        cellMatrix[x] = [];
        for (let y = 0; y * cellSize < screenHeight; y++) {
            cellMatrix[x][y] = {};
        }
    }
}



function drawGrid() {
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= cellNumber; i++) {
        let x = cellSize * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, screenHeight);
        ctx.stroke();
        ctx.closePath();
    }

    for (let i = 0; i * cellSize <= screenHeight; i++) {
        let y = cellSize * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(screenWidth, y);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawCell(c, r) {
    let x = c * cellSize + 1;
    let y = r * cellSize + 1;
    let w = cellSize - 1;
    let h = cellSize - 1;
    ctx.fillStyle = cellColor;

    ctx.fillRect(x, y, w, h);
}

function clearCell(c, r) {
    let x = c * cellSize + 1;
    let y = r * cellSize + 1;
    let w = cellSize - 1;
    let h = cellSize - 1;

    ctx.clearRect(x, y, w, h);
}

//fixing differnce between virtual and actual device pixels
function fixDPI() {
    
    const style = {
        get width() {
            return getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        },
        
        get height() {
            return getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        }
    }

    canvas.setAttribute('width', style.width * dpi);
    canvas.setAttribute('height', style.height * dpi);
}

function draw() {
    fixDPI();
    drawGrid();
}

requestAnimationFrame(draw);
createCellMatrix();