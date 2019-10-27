var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Man extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy1 = 100;
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
            manHashiv++;
            matrix[y][x] = 4;

            let man = new Man(x, y);
            manArr.push(man);

            this.energy1 = 35;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {
            this.energy1++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.energy1 >= 103) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy1--;
        
        let emptyCells1 = this.chooseCell(0);
        let emptyCells2 = this.chooseCell(1);
        var emptyCells = emptyCells1.concat(emptyCells2)
        let newCell = random(emptyCells);


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.energy1 < 0) {
            this.die();
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in manArr) {
            if (manArr[i].x == this.x && manArr[i].y == this.y) {
                manArr.splice(i, 1)
            }
        }
    }
}