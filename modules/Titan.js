var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Titan extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy3 = 120;
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
            titanHashiv++;
            matrix[y][x] = 6;
           
            let titan = new Titan(x, y);
            titanArr.push(titan);

            this.energy3 = 65;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(5);
        let newCell = random(emptyCells);

        if (newCell) {
            this.energy1++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in killerArr) {
                if (killerArr[i].x == x && killerArr[i].y == y) {
                    killerArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.energy3 >= 50) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy3--;

        let emptyCells1 = this.chooseCell(0);
        let emptyCells2 = this.chooseCell(1);
        var emptyCells = emptyCells1.concat(emptyCells2)
        let newCell = random(emptyCells);


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.energy3 < 0) {
            this.die();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in titanArr) {
            if (titanArr[i].x == this.x && titanArr[i].y == this.y) {
                titanArr.splice(i, 1)
            }
        }
    }
}