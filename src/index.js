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
let lowerPipe;
let upperPipe;

const pipeVerticalDistanceRange = [150, 250];

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
  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const pipeVerticalDistance = Phaser.Math.Between(
      ...pipeVerticalDistanceRange
    );

    const pipeVerticalPosition = Phaser.Math.Between(
      20,
      config.height - 20 - pipeVerticalDistance
    );

    upperPipe = this.physics.add
      .sprite(config.width * 0.8 + i * 400, pipeVerticalPosition, 'pipe')
      .setOrigin(0, 1);

    lowerPipe = this.physics.add
      .sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe')
      .setOrigin(0);

    upperPipe.body.velocity.x = -200;
    lowerPipe.body.velocity.x = -200;
  }

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

// it gets around 60 FPS, every 16 millisecond
function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }
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
