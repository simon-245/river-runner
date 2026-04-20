export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.beds = 2;
        this.currentIndex = 0;

        const anna = {
            name: "Anna",
            age: 23,
            survival: 0.8,
            condition: "Moderate"
        };
        const john = {
            name: "John",
            age: 67,
            survival: 0.4,
            condition: "Severe"
        };
        const maria = {
            name: "Maria",
            age: 35,
            survival: 0.6,
            condition: "Stable"
        };

        const roster = [anna, john, maria];
        for (let i = roster.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [roster[i], roster[j]] = [roster[j], roster[i]];
        }
        this.patients = roster;

        this.results = [];

        this.renderUI();
    }

    notifyPatientFocus(p) {
        if (typeof document !== "undefined") {
            document.body.dataset.currentPatient = p.name;
        }
        if (typeof window !== "undefined" && window.dispatchEvent) {
            window.dispatchEvent(
                new CustomEvent("patient-focus", { detail: { name: p.name } })
            );
        }
    }

    renderUI() {
        this.children.removeAll();
        this._awaitingChoice = false;

        let p = this.patients[this.currentIndex];

        this.notifyPatientFocus(p);

        this.add.text(20, 20, `Beds left: ${this.beds}`, { color: "#000" });

        this.add.text(20, 80, `Name: ${p.name}`, { color: "#000" });
        this.add.text(20, 110, `Age: ${p.age}`, { color: "#000" });
        this.add.text(20, 140, `Condition: ${p.condition}`, { color: "#000" });
        this.add.text(20, 170, `Survival: ${Math.floor(p.survival * 100)}%`, {
            color: "#000"
        });

        this.createButtons();
    }

    createButtons() {
        let accept = this.add.text(20, 250, "Give Bed", {
            backgroundColor: "#0f0",
            color: "#000",
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });

        let reject = this.add.text(160, 250, "Skip", {
            backgroundColor: "#f00",
            color: "#000",
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });

        this._awaitingChoice = true;

        accept.on("pointerdown", () => this.makeDecision(true));
        reject.on("pointerdown", () => this.makeDecision(false));
    }

    makeDecision(giveBed) {
        if (!this._awaitingChoice) {
            return;
        }
        this._awaitingChoice = false;

        let p = this.patients[this.currentIndex];

        let survived = false;

        if (giveBed && this.beds > 0) {
            this.beds--;
            survived = Math.random() < p.survival;
        }

        this.results.push({
            name: p.name,
            given: giveBed,
            survived: survived
        });

        this.currentIndex++;

        if (this.currentIndex >= this.patients.length) {
            this.scene.start("ResultScene", { results: this.results });
        } else {
            this.renderUI();
        }
    }
}
