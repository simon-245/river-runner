export default class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        this.cameras.main.setBackgroundColor("#ffffff");

        this.add.text(80, 150, "Doctor On Duty", {
            fontSize: "28px",
            color: "#000"
        });

        const startBtn = this.add.text(140, 300, "START", {
            fontSize: "24px",
            backgroundColor: "#00aa00",
            color: "#ffffff",
            padding: { x: 20, y: 10 }
        });

        startBtn.setInteractive({ useHandCursor: true });

        startBtn.on("pointerdown", () => {
            console.log("BUTTON WORKS");
            this.scene.start("GameScene");
        });
    }
}