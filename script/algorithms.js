const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const canvas4 = document.getElementById('canvas4');
const canvas5 = document.getElementById('canvas5');
// const ctx = canvas1.getContext('2d');

// Function to plot a pixel on the canvas
async function plotPixel(x, y, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black'; // Set the color of the pixel
    ctx.fillRect(x, y, 2, 2); // Draw a single pixel at (x, y)
}

async function plotCirclePoints (xc, yc, x, y, canvas) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    // const canvasRadius = Math.min(canvas.width, canvas.height) / 2;

    const xc = canvasWidth / 2;
    const yc = canvasHeight / 2;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(xc + x , yc + y, 2, 2); // Top-right
    ctx.fillRect(xc - x , yc + y, 2, 2); // Top-left
    ctx.fillRect(xc + x , yc - y, 2, 2); // Bottom-right
    ctx.fillRect(xc - x , yc - y, 2, 2); // Bottom-left
    ctx.fillRect(xc + y, yc + x , 2, 2); // Right-top
    ctx.fillRect(xc - y, yc + x , 2, 2); // Left-top
    ctx.fillRect(xc + y, yc - x , 2, 2); // Right-bottom
    ctx.fillRect(xc - y, yc - x , 2, 2); // Left-bottom
};

// DDA Line Algorithm
async function drawDDA(x1,y1,x2,y2) {
    console.log(x1,y1,x2,y2);
    let startTime = new Date().getTime();
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        plotPixel(Math.round(x), Math.round(y), canvas1);
        x += xIncrement;
        y += yIncrement;
    }
    let endTime = new Date().getTime();
    let timeDifference = (endTime - startTime);
    let result = `The time for computing DDA line algorithm is ${timeDifference}ms`;
    console.log(startTime, endTime);
    console.log(result);
    return result;
}

// Bresenham Line Algorithm
async function drawBresenham(x1, y1, x2, y2) {
    let startTime = new Date().getTime();
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let x = x1;
    let y = y1;
    let steps = dx - 1;

    let p = (2*dy)-dx;

    for (i=0; i<steps; i++){
        plotPixel(x, y, canvas2);

        if (p < 0){
            x += 1;
            y = y;
            p += 2 * dy;
        }
        else{
            x += 1;
            y += 1;
            p += (2 * dy)- (2 * dx);
        }
    }
    let endTime = new Date().getTime();
    let timeDifference = (endTime - startTime);
    let result = `The time for computing Bresenham line algorithm is ${timeDifference}ms`;
    console.log(startTime, endTime);
    console.log(result);
    return result;
}

// Midpoint Line Algorithm
async function drawMidpointLine(x1, y1, x2, y2) {
    let startTime = new Date().getTime();
    const dx = x2 - x1;
    const dy = y2 - y1;

    let d = (2 * dy) - dx; // Initial decision parameter
    let dd = 2 * (dy - dx);
    let x = x1;
    let y = y1;

    while (x <= x2 && y <= y2) {
        plotPixel(x, y, canvas3);

        if (d < 0) {
            x += 1;
            y = y;
            d += 2 * dy;
        } else {
            x += 1;
            y += 1;
            d += 2 * (dd);
        }
    }
    let endTime = new Date().getTime();
    let timeDifference = (endTime - startTime);
    let result = `The time for computing mid point line algorithm is ${timeDifference}ms`;
    console.log(startTime, endTime);
    console.log(result);
    return result;
}

//Bresenham circle algorithm
async function bresenhamCircle(x_center, y_center, radius) {
    let startTime = new Date().getTime();
    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;

    while (x <= y) {
        plotCirclePoints(x_center, y_center, x, y, canvas4);
        if (d < 0) {
            d += 4 * x + 6;
        } else {
            d += 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
    let endTime = new Date().getTime();
    let timeDifference = (endTime - startTime);
    let result = `The time for computing bresenham circle algorithm is ${timeDifference}ms`;
    console.log(startTime, endTime);
    console.log(result);
    return result;
}

// Midpoint Circle Algorithm
async function midpointCircle(x_center, y_center, radius) {
    let startTime = new Date().getTime();
    let x = 0;
    let y = radius;
    let d = 1 - radius;

    while (x <= y) {
        plotCirclePoints(x_center, y_center, x, y, canvas5);
        if (d < 0) {
            d += 2 * x + 3;
        } else {
            d += 2 * (x - y) + 5;
            y--;
        }
        x++;
    }
    let endTime = new Date().getTime();
    let timeDifference = (endTime - startTime);
    let result = `The time for computing mid point circle algorithm is ${timeDifference}ms`;
    console.log(startTime, endTime);
    console.log(result);
    return result;
}

async function handleTransition (){
    let leftSide = document.querySelector(".values")
    let rightSide = document.querySelector(".diagrams")
    leftSide.style.width = "90%"
    rightSide.style.display = "flex"
}

async function handleLineAlgorithm () {
    await handleTransition()
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);
    let x2 = parseInt(document.getElementById("x2").value);
    let y2 = parseInt(document.getElementById("y2").value);
    await drawDDA(x1,y1,x2,y2);
    await drawBresenham(x1,y1,x2,y2);
    await drawMidpointLine(x1,y1,x2,y2);
}

async function handleTransition2 (){
    let leftSide = document.querySelector(".values2")
    let rightSide = document.querySelector(".diagrams2")
    leftSide.style.width = "90%"
    rightSide.style.display = "flex"
}

async function handleCircleAlgorithm() {
    await handleTransition2()

    let x = parseInt(document.getElementById("x").value);
    let y = parseInt(document.getElementById("y").value);
    let radius = parseInt(document.getElementById("radius").value);
    await bresenhamCircle(x, y, radius);
    await midpointCircle(x, y, radius);
}