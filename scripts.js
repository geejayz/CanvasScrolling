window.onload = function(){
//All the game's program code goes here
console.log('Script Loaded');

//The canvas
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//Object to create sprites from
var spriteObject = {
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 64,
	sourceHeight: 64,
	x: 0,
	y: 0,
	width: 64,
	height: 64,
	vx: 0,
	vy: 0,
	rotation: 0,
	alpha: 1,
	visible: true	
};



//Arrays to store the game objects and assets to load
var sprites = [];
var assetsToLoad = [];

//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;

//################# ASSETS ###################//

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "images/mapExample.png";
assetsToLoad.push(image);

//############################################//


//################# OBJECTS ##################//
var background = Object.create(spriteObject);
background.sourceX = 64;
background.sourceWidth = 2400;
background.sourceHeight = 1800;
background.width = 4800;
background.height = 3600;
background.x = 0;
background.y = 0;
sprites.push(background);

var viewport = {
	x:0,
	y:0,
	width: canvas.width,
	height: canvas.height
};

var marker = Object.create(spriteObject);
marker.x = (background.x + background.width/2)-marker.width/2;
marker.y = (background.y + background.height/2)-marker.height/2;
sprites.push(marker);


//###########################################//

window.addEventListener("keydown", keydownHandler, false);
window.addEventListener("keyup", keyupHandler, false);



//Game states
var LOADING = 0;
var PLAYING = 1;
var GAMEOVER = 2;
var gameState = LOADING; //Set initial state to loading until all assets are in memory
//console.log(gameState);


//Controls
var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var ACTION = 32; //spacebar

//Movement
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

function loadHandler() {
	
	//Add 1 to assetsLoaded each time this loadHandler function is called
	assetsLoaded++;
	//console.log('assetsLoaded: ' + assetsLoaded + ' | ' + 'assetsToLoad: ' + assetsToLoad.length);
	
	if(assetsLoaded === assetsToLoad.length) {
		
		//All assets loaded - Start game
		//console.log('All assets loaded');
		
		//Remove the eventlisteners(s)
		image.removeEventListener("load",loadHandler, false);
		
		//Start the game
		gameState = PLAYING;
		
		update();
	}
}

function update() {
	//Run the animation loop 
	//requestAnimationFrame runs at about 60 times per second
	requestAnimationFrame(update, canvas);
	
	switch(gameState) {
		case LOADING:
		//console.log('Loading');
		break;
		
		case PLAYING:
		//console.log('PLAYING');
		playGame();
		break;
		
		case GAMEOVER:
		endGame();
		break;
	}
	
	
	//Render the animation
	render();
}

function playGame() {
	//Left
	if(moveLeft) {
		marker.vx = -4;
	}
	
	//Right
	if(moveRight) {
		marker.vx = +4;
	}
	
	//Up
	if(moveUp) {
		marker.vy = -4;
	}
	
	//Down
	if(moveDown) {
		marker.vy = +4;
	}
	
	//Conflict
	if(moveLeft && moveRight) {
		marker.vx = 0;
	}
	
	if(moveUp && moveDown) {
		marker.vy = 0;
	}
	
	//Not moving
	if(!moveLeft && !moveRight) {
		marker.vx = 0;
	}
	
	if(!moveUp && !moveDown) {
		marker.vy = 0;
	}
	
	
	//Move marker and keep within boundary
	
	marker.x = Math.max(0, Math.min(marker.x + marker.vx, background.width - marker.width));
	marker.y = Math.max(0, Math.min(marker.y + marker.vy, background.height - marker.height));
	
	//Center the viewport over the marker
	viewport.x = (marker.x + marker.width/2) - viewport.width/2;
	viewport.y = (marker.y + marker.height/2) - viewport.height/2;
	
	if(viewport.x < background.x) {
		viewport.x = background.x;
	}
	
	if(viewport.y < background.y) {
		viewport.y = background.y;
	}	
	
}

function render() {
	//Clear the previous animation frame
	drawingSurface.clearRect(0,0, canvas.width, canvas.height);
	
	drawingSurface.save();
	drawingSurface.translate(0-viewport.x, 0-viewport.y);
		
	
	//Ensure sprite array contains is not empty
	if(sprites.length !==0) {
		//console.log('Finding Sprites');
		//Loop through all of the sprites in turn
		for (var i=0; i < sprites.length; i++) {
			var sprite = sprites[i];
			//Draw sprite onto canvas if its visible property is true
			if(sprite.visible) {
				drawingSurface.drawImage
				(
					image,
					sprite.sourceX, sprite.sourceY,
					sprite.sourceWidth, sprite.sourceHeight,
					
					//This is the x and y co-ordinates of where to draw onto on the canvas
					Math.floor(sprite.x), Math.floor(sprite.y),
					sprite.width, sprite.height
				);
			}
		}
	}
	

	drawingSurface.restore();
}

function random(min,max) {
	
}

function keydownHandler(event) {
	switch(event.keyCode) {
		case UP:
		moveUp = true;
		break;
		
		case DOWN:
		moveDown = true;
		break;
		
		case LEFT:
		moveLeft = true;
		break;
		
		case RIGHT:
		moveRight = true;
		break;
		
		case ACTION:
		//Insert action required
		break;
	}
}

function keyupHandler(event) {
	switch(event.keyCode) {
		case UP:
		moveUp = false;
		break;
		
		case DOWN:
		moveDown = false;
		break;
		
		case LEFT:
		moveLeft = false;
		break;
		
		case RIGHT:
		moveRight = false;
		break;
		
		case ACTION:
		//Remove action required
		break;
	}
	
}

function mousedownHandler(event) {
	var whatWasClicked = event.target;
}

function mouseupHandler(event) {
	
}





};
