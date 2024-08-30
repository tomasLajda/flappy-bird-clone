import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);

    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];

    this.lineHeight;
    this.fontSize = 32;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#FFF' };
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);

    if (this.config.canGoBack) {
      const backButton = this.add
        .image(this.config.width - 10, this.config.height - 10, 'back')
        .setInteractive()
        .setOrigin(1)
        .setScale(2);

      backButton.on('pointerup', () => this.scene.start('MenuScene'));
    }
  }

  createMenu(menu, callback) {
    this.lineHeight = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + this.lineHeight,
      ];

      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1);

      this.lineHeight += 42;

      callback(menuItem);
    });
  }
}

export default BaseScene;
