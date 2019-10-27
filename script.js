function setup() {
    var socket = io();
    var side = 15;
    var matrix = [];

    // ! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorLiveCountElement = document.getElementById('predatorLiveCount');
    let manCountElement = document.getElementById('manCount');
    let manLiveCountElement = document.getElementById('manLiveCount');
    let killerCountElement = document.getElementById('killerCount');
    let killerLiveCountElement = document.getElementById('killerLiveCount');
    let titanCountElement = document.getElementById('titanCount');
    let titanLiveCountElement = document.getElementById('titanLiveCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {


        // let sendData = {
        //     matrix: matrix,
        //     grassCounter: grassHashiv,
        //     grassLiveCounter: grassArr.length,
        //     eatCounter: eatHashiv,
        //     huntCounter: huntHashiv,
        //     termCounter: termHashiv,
        //     titanCounter: titanHashiv,
        //     weather: weather
        // }

        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather; 
        grassCountElement.innerText = data.grassCount;
        grassLiveCountElement.innerText = data.grassLiveCount;
        grassEaterCountElement.innerText = data.grassEaterCount;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCount;
        predatorCountElement.innerText = data.predatorCount;
        predatorLiveCountElement.innerText = data.predatorLiveCount;
        manCountElement.innerText = data.manCount;
        manLiveCountElement.innerText = data.manLiveCount;
        killerCountElement.innerText = data.killerCount;
        killerLiveCountElement.innerText = data.killerLiveCount;
        titanCountElement.innerText = data.titanCount;
        titanLiveCountElement.innerText = data.titanLiveCount;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "Գարուն") {
                        fill("green");
                    } else if (data.weather == "Ամառ") {
                        fill("#00b300");
                    } else if (data.weather == "Աշուն") {
                        fill("#004d00");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("white");
                    }
                } else if (matrix[i][j] == 2) {
                    if (data.weather == "Գարուն") {
                        fill("orange");
                    } else if (data.weather == "Ամառ") {
                        fill("#ffaf1a");
                    } else if (data.weather == "Աշուն") {
                        fill("#e69500");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("#ffc14d");
                    }
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    if (data.weather == "Գարուն") {
                        fill("red");
                    } else if (data.weather == "Ամառ") {
                        fill("#ff1a1a");
                    } else if (data.weather == "Աշուն") {
                        fill("#cc0000");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("#ff3333");
                    }
                } else if (matrix[i][j] == 4) {
                    if (data.weather == "Գարուն") {
                        fill("blue");
                    } else if (data.weather == "Ամառ") {
                        fill("#1a1aff");
                    } else if (data.weather == "Աշուն") {
                        fill("#000099");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("#3333ff");
                    }
                } else if (matrix[i][j] == 5) {
                    if (data.weather == "Գարուն") {
                        fill("black");
                    } else if (data.weather == "Ամառ") {
                        fill("#1a1a1a");
                    } else if (data.weather == "Աշուն") {
                        fill("#333333");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("#404040");
                    }
                }
                else if (matrix[i][j] == 6) {
                    if (data.weather == "Գարուն") {
                        fill("#cc33ff");
                    } else if (data.weather == "Ամառ") {
                        fill("#d24dff");
                    } else if (data.weather == "Աշուն") {
                        fill("#ac00e6");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("#d966ff");
                    }
                    
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}