import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);

    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];

    this.lineHeight = 0;
    this.fontSize = 32;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#FFF' };
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);
  }

  createMenu(menu, callback) {
    let lastMenuPositionY = 0;

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
