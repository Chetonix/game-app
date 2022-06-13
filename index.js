var canvas;
var canvasContext;
var ballY = 0;

window.onload = function () {
    console.log("Happy Gaming!");
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    setInterval( drawEverything, 1000);

}


function drawEverything() {

    ballY = ballY + 10;

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(canvas.width/2, ballY, 20, 20);
}