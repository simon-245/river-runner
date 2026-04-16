export default class ResultScene extends Phaser.Scene {
    constructor() {
        super("ResultScene");
    }

    init(data) {
        this.results = data.results;
    }

    create() {
        this.cameras.main.setBackgroundColor("#ffffff");

        this.add.text(20, 20, "RESULTS", {
            fontSize: "24px",
            color: "#000"
        });

        let y = 80;

        this.results.forEach(r => {
            let text = `${r.name} → ${r.survived ? "Survived" : "Died"}`;
            this.add.text(20, y, text, { color: "#000" });
            y += 30;
        });

        // summary
        let saved = this.results.filter(r => r.survived).length;

        this.add.text(20, y + 40, `Saved: ${saved}`, { color: "#000" });

        this.add.text(20, y + 80, "Think: what influenced your decisions?", {
            color: "#000"
        });
    }
}