//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Man = require("./modules/Man.js");
var Killer = require("./modules/Killer.js");
var Titan = require("./modules/Titan.js");
let random = require('./modules/random');
//! Requiring modules  --  END

//! Initializing global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
manArr = [];
killerArr = [];
titanArr = [];
matrix = [];
//! Initializing global arrays  --  END

// statistics start
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
manHashiv = 0;
killerHashiv = 0;
titanHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grassEater, predator, man, killer, titan) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < man; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < killer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < titan; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(30, 100, 25, 20, 10, 3, 2);

//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var man = new Man(x, y);
                manArr.push(man);
                manHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var killer = new Killer(x, y);
                killerArr.push(killer);
                killerHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var titan = new Titan(x, y);
                titanArr.push(titan);
                titanHashiv++;
            }
        }
    }
}

creatingObjects();

let exanak = -10;
let weather = "Գարուն"

function game() {

    exanak++;
    if (exanak <= 0) {
        weather = "Գարուն"

    } else if (exanak <= 10) {
        weather = "Ամառ"
    } else if (exanak <= 20) {
        weather = "Աշուն"
    } else if (exanak <= 30) {
        weather = "Ձմեռ"
    } else if (exanak > 30) {
        exanak = -10;
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();

        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();

        }
    }
    if (manArr[0] !== undefined) {
        for (var i in manArr) {
            manArr[i].eat();

        }
    }
    if (killerArr[0] !== undefined) {
        for (var i in killerArr) {
            killerArr[i].eat();

        }
    }
    if (titanArr[0] !== undefined) {
        for (var i in titanArr) {
            titanArr[i].eat();

        }
    }


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCount: grassHashiv,
        grassLiveCount: grassArr.length,
        grassEaterCount: grassEaterHashiv,
        grassEaterLiveCount: grassEaterArr.length,
        predatorCount: predatorHashiv,
        predatorLiveCount: predatorArr.length,
        manCount: manHashiv,
        manLiveCount: manArr.length,
        killerCount: killerHashiv,
        killerLiveCount: killerArr.length,
        titanCount: titanHashiv,
        titanLiveCount: titanArr.length,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 500)
