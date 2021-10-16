const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpi = window.devicePixelRatio;
const screenWidth = window.innerWidth * dpi;
const screenHeight = window.innerHeight * dpi;


let cellNumber = 50;
let cellColor = 'blue'
let cellSize = screenWidth / cellNumber;
let ms = 1000;
let cellMatrix = [];
let direction = '';

window.addEventListener('keypress', event => changeDirection(event.code));

class SnakeNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SnakeList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addToTheEnd(data) {
        let node = new SnakeNode(data);

        if(this.length === 0) {
            // if there are no nodes, create head node
            this.head = node;
        }
        else {
            let current = this.head;

            while(current.next) {
                current = current.next;
            }

            current.next = new SnakeNode(data);
        }

        this.length++;
    }
}

function createCellMatrix() {
    for (let x = 0; x < cellNumber; x++) {
        cellMatrix[x] = [];
        for (let y = 0; y * cellSize < screenHeight; y++) {
            cellMatrix[x][y] = {};
        }
    }
}

function moveSnake(keyCode) {
    direction = keyCode;
    switch(direction) {
        case 'KeyW':
            console.log(keyCode);
            break;
        case 'KeyA':
            console.log(keyCode);
            break;
        case 'KeyS':
            console.log(keyCode);
            break;
        case 'KeyD':
            console.log(keyCode);
            break;
        default: 

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

async function run() {
    while(true) {
        await timeout(tick);

    }
}


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

requestAnimationFrame(draw);
createCellMatrix();
run();



