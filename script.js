// Get the canvas and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Background object
const background = {
    image: new Image(),
    x: 0, // Initial position of the background
    speed: 2, // Speed at which the background scrolls
  };
  background.image.src = 'images/background1.jpg';

// Flag to track if background scrolling is enabled
let enableScrolling = true;
// Flag to track if background has already scrolled
let hasScrolled = false;

// Character object
const character = {
  x: 100,
  y: canvas.height - 190,
  height: 100,
  width: 100,
  velocityY: 0,
  jumping: false,
};

// Platform object with image
const platform = {
    x: 0,
    y: canvas.height - 66, // Adjust the platform's position as needed
    width: canvas.width,
    height: 15
  };

// Load sprite images
const characterSprite1 = new Image();
characterSprite1.onload = startGame; // Start the game when the first image is loaded
characterSprite1.src = 'images/image9.png'; 

const characterSprite2 = new Image();
characterSprite2.src = 'images/image10.png';

const characterSprite3 = new Image();
characterSprite3.src = 'images/image5.png';

const characterSprite4 = new Image();
characterSprite4.src = 'images/image8.png';

// Arrow key states
const keys = {};

// Update key states on keydown and keyup events
document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
  // Jumping logic: When Space key is pressed and character is not already jumping
  if (event.code === 'ArrowUp' || event.code === 'Space' && !character.jumping) {
    character.jumping = true;
    character.velocityY = -10; // Adjust the jump velocity as needed
  }
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

// Walking animation logic
let currentSprite = characterSprite1; // Start with the first sprite
let frameCount = 0;
const FRAME_THRESHOLD = 10; // Adjust this value to change animation speed

// Function to draw platform
function drawPlatform() {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }

  // Function to draw background
 function drawBackground() {
    // Draw the background image at its current position
    ctx.drawImage(background.image, background.x, 0, canvas.width, canvas.height);
    // Draw another copy of the background image next to the first one
    ctx.drawImage(background.image, background.x + canvas.width, 0, canvas.width, canvas.height);
}

// Update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  drawBackground();

  // Draw platform
  drawPlatform();

  // Update walking animation frame only when arrow keys are pressed
  if (keys['ArrowRight']) {
    frameCount++;
    if (frameCount >= FRAME_THRESHOLD) {
      frameCount = 0;
      // Alternate between sprite images
      currentSprite = (currentSprite === characterSprite1) ? characterSprite2 : characterSprite1;
    }
  }

  if (keys['ArrowLeft']) {
    frameCount++;
    if (frameCount >= FRAME_THRESHOLD) {
      frameCount = 0;
      // Alternate between sprite images
      currentSprite = (currentSprite === characterSprite3) ? characterSprite4 : characterSprite3;
    }
  }

  // Apply horizontal movement to character
  if (keys['ArrowRight']) {
    character.x += 5; // Adjust the speed as needed
  }
  if (keys['ArrowLeft']) {
    character.x -= 5; // Adjust the speed as needed
  }

  // Apply gravity to character when jumping
  if (character.jumping) {
    character.velocityY += 0.5; // Adjust the gravity as needed
    character.y += character.velocityY;

    // If character reaches the ground, stop jumping
    if (character.y + character.height >= canvas.height - 90) {
      character.y = canvas.height - 90 - character.height;
      character.velocityY = 0;
      character.jumping = false;
    }
  }
  
     if (character.x < 0) {
        character.x = 0;
    } else if (character.x + character.width > canvas.width) {
        character.x = canvas.width - character.width;
    }


  // Draw character
  ctx.drawImage(currentSprite, character.x, character.y, character.width, character.height);

 // Move the background horizontally
 //background.x -= background.speed;

 if (character.x >= canvas.width * 0.9) {
    background.x -= background.speed;
}

 // If the first copy of the background has completely scrolled past the left edge of the canvas
 if (background.x <= -canvas.width) {
     // Reset its position to the right of the second copy
     background.x += canvas.width;
 }
  

  // Request animation frame
  requestAnimationFrame(update);
}

// Function to start the game loop once the first image is loaded
function startGame() {
  update();
}

// Continuously update key states
setInterval(() => {
  // Update walking animation frame only when arrow keys are pressed
  if (keys['ArrowRight']) {
    frameCount++;
    if (frameCount >= FRAME_THRESHOLD) {
      frameCount = 0;
      // Alternate between sprite images
      currentSprite = (currentSprite === characterSprite1) ? characterSprite2 : characterSprite1;
    }
  }

  if (keys['ArrowLeft']) {
    frameCount++;
    if (frameCount >= FRAME_THRESHOLD) {
      frameCount = 0;
      // Alternate between sprite images
      currentSprite = (currentSprite === characterSprite3) ? characterSprite4 : characterSprite3;
    }
  }

  // Apply horizontal movement to character
  if (keys['ArrowRight']) {
    character.x += 5; // Adjust the speed as needed
  }
  if (keys['ArrowLeft']) {
    character.x -= 5; // Adjust the speed as needed
  }
}, 1000 / 60); // Update keys at approximately 60 frames per second
