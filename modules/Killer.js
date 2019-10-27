var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Killer extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy2 = 120;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells0 = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells0.concat(emptyCells1));

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];
            killerHashiv++;
            matrix[y][x] = 5;

            let killer = new Killer(x, y);
            killerArr.push(killer);

            this.energy2 = 120;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {
            this.energy1++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in manArr) {
                if (manArr[i].x == x && manArr[i].y == y) {
                    manArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.energy2 >= 121) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy2--;

        let emptyCells1 = this.chooseCell(0);
        let emptyCells2 = this.chooseCell(1);
        var emptyCells = emptyCells1.concat(emptyCells2)
        let newCell = random(emptyCells);


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.energy2 < 0) {
            this.die();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in killerArr) {
            if (killerArr[i].x == this.x && killerArr[i].y == this.y) {
                killerArr.splice(i, 1)
            }
        }
    }
}