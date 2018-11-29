class PlinkoGame {
    constructor(timer) {
        this.timer = timer;
    }

    startPlinko() {
        // countdown 10 seconds
        // drop ball on server
    }

    endPlinko() {
        // Save to db
    }

    drawPlinko() {
        // send ball pos to clients
        // if all balls are stopped this.endPlinko()
    }
}

module.exports = PlinkoGame;