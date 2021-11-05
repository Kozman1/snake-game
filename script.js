class SnakeNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Snake {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // data is node object with x and y coords
    addToTheEnd(data) {
        let node = new SnakeNode(data);

        if(this.length === 0) {
            // if there are no nodes, create head node
            this.head = node;
        }
        else {
            let current = this.head;
            // FIXME: something must be wrong with this loop, it won't exit 
            while(current.next) {
                current = current.next;
            }

            current.next = new SnakeNode(data);
        }

        this.length++;
    }

}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpi = window.devicePixelRatio;
const screenWidth = window.innerWidth * dpi;
const screenHeight = window.innerHeight * dpi;


let cellNumber = 50;
let cellColor = 'blue'
let cellSize = screenWidth / cellNumber;
let tick = 1000;
let cellMatrix = [];
let keyCode = '';
let snake = new Snake();
snake.addToTheEnd({ x: 1, y: 1 });



window.addEventListener('keypress', event => {
    switch(event.code) {
        case 'KeyW':
        case 'KeyA':
        case 'KeyS':
        case 'KeyD':
            keyCode = event.code;
            break;
    }
});



function createCellMatrix() {
    for (let x = 0; x < cellNumber; x++) {
        cellMatrix[x] = [];
        for (let y = 0; y * cellSize < screenHeight; y++) {
            cellMatrix[x][y] = {};
        }
    }
}

function moveSnake(keyCode) {
    let movement = { x: 0, y: 0 };
    switch(keyCode) {
        case 'KeyW':
            movement.x = 0;
            movement.y = -1;
            break;
        case 'KeyA':
            movement.x = -1;
            movement.y = 0;
            break;
        case 'KeyS':
            movement.x = 0;
            movement.y = 1;
            break;
        case 'KeyD':
            movement.x = 1;
            movement.y = 0;
            break;
    }

    let current = snake.head;
    clearCell(current.data.x, current.data.y);
    current.data.x += movement.x;
    current.data.y += movement.y;
    drawCell(current.data.x, current.data.y);
    while(current.next) {
        clearCell(current.next.data.x, current.next.data.y);
        current.next.data.x = current.data.x;
        current.next.data.y = current.data.y;
        drawCell(current.next.data.x, current.next.data.y);
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
        moveSnake(keyCode);
    }
}


function timeout(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));
}

requestAnimationFrame(draw);
createCellMatrix();
run();

// 51923803792e3acc48c86a4a95dd7518-4