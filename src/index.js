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

let bird;
let pipes = [];
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

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);

  pipes.push(
    this.add.sprite(config.width * 0.8, config.height / 2, 'pipe').setOrigin(0)
  );

  pipes.push(
    this.add
      .sprite(config.width * 0.8, pipes[0].y - 100, 'pipe')
      .setOrigin(0, 1)
  );
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
