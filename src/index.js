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
      gravity: { y: 400 },
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
}

const VELOCITY = 200;

let bird;
const flapVelocity = 250;

// Creating instances of objects
function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');
  // this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add
    .sprite(config.width * 0.1, config.height / 2, 'bird')
    .setOrigin(0);

  this.input.on('pointerdown', flap);

  this.input.keyboard.on('keydown_SPACE', flap);
}

// it gets around 60 FPS, every 16 millisecond
function update(time, delta) {}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
