

window.onload = function () {
    console.log("Happy Gaming!");
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    framesPerSecond = 30;
    setInterval( function () {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

}

var canvas;
var canvasContext;
var ballY = 600/2;
var ballX = 10;
var ballSpeedX = 10;
var hasBounced = false;
function moveEverything() {
    ballX = ballX + ballSpeedX;
    // ballSpeedX += 10;
    if(ballX > 770) {
        ballSpeedX = -ballSpeedX;
        // hasBounced = true;
    }
    // if (hasBounced) {
    //     if(ballX > 0) {
    //         ballSpeedX = -ballSpeedX;
    //     }
        
    // }
}

function drawEverything() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 250,10, 100)
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(ballX, ballY, 20, 20);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(790, 250,10, 100)
}