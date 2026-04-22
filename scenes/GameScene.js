export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.beds = 2;
        this.currentIndex = 0;
        this.results = [];

        this.patients = [
            { name: "Anna", age: 23, survival: 0.8, condition: "Moderate" },
            { name: "John", age: 67, survival: 0.4, condition: "Severe" },
            { name: "Maria", age: 35, survival: 0.6, condition: "Stable" }
        ];

        // UI container
        this.ui = this.add.container(0, 0);

        this.showPatient();
    }

    clearUI() {
        this.ui.removeAll(true);
    }

    showPatient() {
        this.clearUI();

        if (this.currentIndex >= this.patients.length) {
            this.scene.start("ResultScene", {
                results: this.results
            });
            return;
        }

        const p = this.patients[this.currentIndex];

        this.ui.add(this.add.text(20, 20, `Beds: ${this.beds}`, { color: "#000" }));
        this.ui.add(this.add.text(20, 80, `Name: ${p.name}`, { color: "#000" }));
        this.ui.add(this.add.text(20, 120, `Age: ${p.age}`, { color: "#000" }));
        this.ui.add(this.add.text(20, 160, `Condition: ${p.condition}`, { color: "#000" }));
        this.ui.add(this.add.text(20, 200, `Survival: ${Math.floor(p.survival * 100)}%`, { color: "#000" }));

        // timer
        this.timeLeft = 10;

        const timerText = this.add.text(250, 20, "Time: 10", { color: "#000" });
        this.ui.add(timerText);

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            repeat: 9,
            callback: () => {
                this.timeLeft--;
                timerText.setText("Time: " + this.timeLeft);

                if (this.timeLeft <= 0) {
                    this.makeDecision(false);
                }
            }
        });

        // buttons
        const accept = this.add.text(20, 300, "Give Bed", {
            backgroundColor: "#0f0",
            color: "#000",
            padding: { x: 10, y: 5 }
        }).setInteractive();

        const reject = this.add.text(180, 300, "Skip", {
            backgroundColor: "#f00",
            color: "#000",
            padding: { x: 10, y: 5 }
        }).setInteractive();

        this.ui.add(accept);
        this.ui.add(reject);

        accept.on("pointerdown", () => this.makeDecision(true));
        reject.on("pointerdown", () => this.makeDecision(false));
    }

    makeDecision(giveBed) {
        if (this.timerEvent) {
            this.timerEvent.remove();
        }

        const p = this.patients[this.currentIndex];

        let survived = false;

        if (giveBed && this.beds > 0) {
            this.beds--;
            survived = Math.random() < p.survival;
        }

        this.results.push({
            name: p.name,
            survived
        });

        this.currentIndex++;
        this.showPatient();
    }
}