import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    scene: [GameScene]
};

new Phaser.Game(config);