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
      // gravity: { y: 200 },
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

// Creating instances of objects
function create() {
  this.add.image(config.width / 2, config.height / 2, 'sky');
  // this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add
    .sprite(config.width * 0.1, config.height / 2, 'bird')
    .setOrigin(0);
  bird.body.velocity.x = VELOCITY;
}

// it gets around 60 FPS, every 16 millisecond
function update(time, delta) {
  if (bird.x >= config.width - bird.width) {
    bird.body.velocity.x = -VELOCITY;
  }

  if (bird.x <= 0) {
    bird.body.velocity.x = VELOCITY;
  }
}

new Phaser.Game(config);
