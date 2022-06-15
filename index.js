function handleMouseClick(evt) {
	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}




window.onload = function () {
    console.log("Happy Gaming!");
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    framesPerSecond = 30;
    setInterval( function () {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});

}

var canvas;
var canvasContext;
var ballY = 600/2;
var ballX = 10;
var ballSpeedX = 10;
var ballSpeedY = 4;
// var hasBounced = false;
// var paddle1Y = (canvas.height/2-(100/2));
// var paddle2Y = (canvas.height/2-(100/2));
var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;


function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function ballReset() {
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;

    if(player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE) {

		// player1Score = 0;
		// player2Score = 0;
		showingWinScreen = true;

	}
}


function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y = paddle2Y + 6;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y = paddle2Y - 6;
	}
}

function moveEverything() {
    computerMovement();
    // ballX = ballX + ballSpeedX;
    // ballY = ballY + ballSpeedY
    // // ballSpeedX += 10;
    // if(ballX > 770) {
    //     ballSpeedX = -ballSpeedX;
    //     // hasBounced = true;
    // }

    // // if(ballX < 0) {
    // //     // if(hasBounced) {
    // //         ballSpeedX = -ballSpeedX;
    // //     // }
    // // }
    // // if (ballY < 10) {
    // //     ballSpeedY = -ballSpeedY;
    // // }

    // if(ballX < 20) {
	// 	if(ballY > paddle1Y &&
	// 		ballY < paddle1Y+PADDLE_HEIGHT) {
	// 		ballSpeedX = -ballSpeedX;
	// 	} else {
	// 		ballReset();	
	// 	}
	// }

    // if(ballY > canvas.height-10) {
    //     ballSpeedY = -ballSpeedY;
    // }

    ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	
	if(ballX < 0) {
		if(ballY > paddle1Y &&
			ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
                // vertical speed
            var deltaY = ballY
					-(paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
            player2Score++;
			ballReset();
            	
		}
	}
	if(ballX > canvas.width) {
		if(ballY > paddle2Y &&
			ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
                //vertical speed;
            var deltaY = ballY
					-(paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		} else {
            player1Score++;	
			ballReset();
            
		}
	}
	if(ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

}

function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {
    // canvasContext.fillStyle = "black";
    // canvasContext.fillRect(0,0, canvas.width, canvas.height);
    colorRect(0, 0, canvas.width, canvas.height, "black"); //black canvas

    //showing winning screen
    if(showingWinScreen) {
		canvasContext.fillStyle = 'white';
		canvasContext.fillText("click to continue", 100, 100);
		return;
	}

    //draw a net in the center
    drawNet();
    
    // canvasContext.fillStyle = "white";
    // canvasContext.fillRect(0, 250,10, 100)
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white"); //left white paddle


    // canvasContext.beginPath();
    // canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    // canvasContext.fill();

    colorCircle(ballX, ballY, 10, "white");  //white ball

        // canvasContext.fillStyle = "white";
    // canvasContext.fillRect(790, 250,10, 100);
    colorRect(canvas.width-10, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white"); //right white paddle

    // Score Display
    canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);

    if(showingWinScreen) {
		canvasContext.fillStyle = 'white';

		if(player1Score >= WINNING_SCORE) {
			canvasContext.fillText("Left Player Won", 350, 200);
		} else if(player2Score >= WINNING_SCORE) {
			canvasContext.fillText("Right Player Won", 350, 200);
		}

		canvasContext.fillText("click to continue", 350, 500);
		return;
    }

      
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}