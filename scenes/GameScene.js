export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.add.text(100, 250, "Who Gets the Bed?", {
            fontSize: "20px",
            color: "#000"
        });
    }
}