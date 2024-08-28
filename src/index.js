import Phaser from 'phaser';

const config = {
  // WebGL
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// Loading assets
function preload() {
  // 'this' context - scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 200;
const PIPES_TO_RENDER = 4;

let bird;

let pipes;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [350, 450];

const flapVelocity = 250;
const initialBirdPos = { x: config.width * 0.1, y: config.height / 2 };

// Creating instances of objects
function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');
  // this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add
    .sprite(initialBirdPos.x, initialBirdPos.y, 'bird')
    .setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function placePipe(upperPipe, lowerPipe) {
  const rightMostX = getRightMostPipe();

  const pipeVerticalDistance = Phaser.Math.Between(
    ...pipeVerticalDistanceRange
  );

  const pipeVerticalPosition = Phaser.Math.Between(
    20,
    config.height - 20 - pipeVerticalDistance
  );

  const pipeHorizontalDistance = Phaser.Math.Between(
    ...pipeHorizontalDistanceRange
  );

  upperPipe.x = rightMostX + pipeHorizontalDistance;
  upperPipe.y = pipeVerticalPosition;

  lowerPipe.x = upperPipe.x;
  lowerPipe.y = upperPipe.y + pipeVerticalDistance;
}

function recyclePipes() {
  const tempPipes = [];
  pipes.getChildren().forEach((pipe) => {
    if (pipe.getBounds().right <= 0) {
      // recycle pipes
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        placePipe(...tempPipes);
      }
    }
  });
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach((pipe) => {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

// it gets around 60 FPS, every 16 millisecond
function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }

  recyclePipes();
}

function restartBirdPosition() {
  bird.x = initialBirdPos.x;
  bird.y = initialBirdPos.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
