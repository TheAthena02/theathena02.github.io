const rows = 9;
const cols = 9;
var grid = Array(rows).fill().map(() => Array(cols).fill(0));
var coverGrid = Array(rows).fill().map(() => Array(cols).fill(0));
var size = 50;
var gap = 53;
var bombMax = 10;
var bombCurrent = 0;

function setup() {
    createCanvas(800, 600);
    // const rows = 9;
    // const cols = 9;
    // background(220);
    // var grid = Array(rows).fill().map(() => Array(cols).fill(0));
    
    //gridSetup(grid);
    console.log(grid);
    console.log(coverGrid);

    gridSetup(grid);
}

function draw() {
    background(220);
    gridDraw(grid);
    coverDraw();
    
}

// bredth first search

function gridDraw(grid) {
    for(let x= 0; x < grid.length; x++) { //base squares
            for(let y= 0; y< grid[x].length; y++) {
                color("black");
                fill("white");
                square(y * gap, x* gap, size);

                if (grid[x][y] >= 9) {
                    color("black");
                fill("black");
                ellipseMode(CORNER);
                    circle(y * gap, x* gap, size - 10);
                }

                if (grid[x][y] > 0 && grid[x][y] < 9) {
                    
                    color("black");
                    textSize(30);
                    textAlign(LEFT, TOP);
                    text(str(grid[x][y]), (y * gap) +10, (x * gap) +10);
                }
            }
            }
        }
    //   for(let y= 0; y < grid.length; y++) { //bombs
    //         for(let x= 0; x< grid[y].length; x++) {
    //             if (grid[x][y] >= 9) {
    //                 color("black");
    //             fill("black");
    //             ellipseMode(CORNER);
    //                 circle(y * gap, x* gap, size - 10);
    //             }
    //         }
    //             for(let y= 0; y < grid.length; y++) { //numbers
    //         for(let x= 0; x< grid[y].length; x++) {
    //             if (grid[x][y] > 0 && grid[x][y] < 9) {
                    
    //                 color("black");
    //                 textSize(30);
    //                 textAlign(LEFT, TOP);
    //                 text(str(grid[x][y]), (y * gap) +10, (x * gap) +10);
    //             }
    //         }}
//         }
// }

function mouseClicked(){
    // console.log(coverGrid);
    // console.log(Math.floor(mouseX/gap) + " " + Math.floor(mouseY/gap))
    // console.log(coverGrid[Math.floor(mouseX/gap)][Math.floor(mouseY/gap)]);
    //object classes
    var x = Math.floor(mouseX/gap);
    var y = Math.floor(mouseY/gap);
    if(coverGrid[x][y] <= coverGrid.length && coverGrid[x][y] <= 0){
        //coverGrid[x][y] = 1;
        uncover(x,y,grid);
        console.log(coverGrid[x][y]);
    }
}

function coverDraw() {
    for(let x= 0; x < coverGrid.length; x++) { //cover squares
            for(let y= 0; y< coverGrid[x].length; y++) {
                if (coverGrid[x][y] < 1) {
                color("light gray");
                fill("gray");
                square(x * gap, y* gap, size);
                }

            }
        } 
        
}

// function uncover
        // uncovers current
        //if 0, check surroundings if they are zero, run again

function uncover(x,y) {
            if (coverGrid[x][y] === 1) return;
            coverGrid[x][y] = 1;
            console.log("show");
            if(grid[x][y] < 1) {
                console.log("expand");
                    //old solution
                    // let count = 0;
                    // const right = '[x][y + 1]';
                    // const left = '[x][y - 1]';
                    // const bottom = '[x - 1]?.[y]';
                    // const top = '[x + 1]?.[y]';
                    // const topRight = '[x +1]?.[y + 1]';
                    // const topLeft = '[x +1]?.[y - 1]';
                    // const bottomLeft = '[x - 1]?.[y - 1]';
                    // const bottomRight = '[x - 1]?.[y + 1]';
                    //coverGrid[x][y] = 1;
                    
                    //Claude code begins
                    const offsets = [ //essentially what i was trying to do but like... actually practical
                        [0, -1], [0, 1], [1, 0], [-1, 0] //,
                        //[1, 1], [1, -1], [-1, -1], [-1, 1]
                    ];


                    class Grid {
                        tiles= [];
                        constructor(width, height) {
                            this.tiles = tiles;
                            //this.tiles = Array(rows).fill().map(() => Array(cols).fill(new Grid.Tile()));
                            for(let x= 0; x < width; x++) { //cover squares
                                for(let y= 0; y< height; y++) {
                                    new Grid.Tile(x,y);
                                }
                    }

                    Grid.Tile = class  {
                        x; y;
                        value = 0;
                        state = true;
                        constructor(x, y, value, state) {
                            this.x = x;
                            this.y = y;
                            this.value = value;
                            this.state = state;
                        }

                    }

                    [0,0,0]
                    [0,0,0]
                    [0,0,0]

                    [tile,tile,tile]
                    [tile,tile,tile]
                    [tile,tile,tile]

                    class Tile  {
                        x; y;
                        value = 0;
                        state = true;
                        constructor(x, y, value, state) {
                            this.x = x;
                            this.y = y;
                            this.value = value;
                            this.state = state;
                        }
                        get xy() {
                            
                        }

                    }

                    //build all tiles first


                    [0, -1, 0], [0, 1, 1], [1, 0, 9], [-1, 0, 1]

                    offsets.forEach(([dx, dy]) => {
                        const nx = x + dx;
                        const ny = y + dy;
                        const value = grid[nx]?.[ny]; //why didnt i think about setting a var for the vale seperate from the coords. 

                        if (value === undefined) return;      // out of bounds
                        if (coverGrid[nx][ny] === 1) return;   // already uncovered

                        // my edits begin
                        if (value > 0) {
                            return;
                        }
                        else {
                            uncover(nx, ny); // recurse instead of just flipping the flag. - Claude didnt account for expanding past the blanks even after reminding me to add the code for it. dumbass
                        }
                    })
                    //claude code ends

                    

                    //old solution
                    // var neighbours = [right, left, bottom, top, topRight, topLeft, bottomLeft, bottomRight];
                    // neighbours.filter( n => n !== undefined && eval('grid' + n) <9);
                    // neighbours.forEach(n => {
                    //     if (n !== undefined) {
                    //         //uncover and end
                    //         eval('coverGrid' + n) = 1;
                    //     }
                    //     else {
                    //         //uncover and run again?

                    //     }
                    // });


                // if(x >=1 && grid[y][x -1] < 1) { // bomb to the left
                //     if (coverGrid[y][x - 1] === 1) return;
                //     uncover(x - 1,y);
                // }
                // if(x < 8 && grid[y][x + 1] < 1) { // bomb to the right
                //     uncover(x + 1,y);
                // }
                // // above and below
                // if(y >= 1 && grid[y - 1][x] < 1) { // bomb above
                //     uncover(x,y - 1);
                // }
                // if(y < 8 && grid[y + 1][x] < 1) { // bomb below                       
                //     uncover(x,y + 1);
                // }
                // // diagonals
                //     //top corners
                // if(x >=1 && y >=1 && grid[y - 1][x - 1] < 1) { // bomb NW
                //     uncover(x - 1,y -1);
                //     }
                // if(x < 8 && y >= 1 && grid[y - 1][x + 1] < 1) { // NE
                //     uncover(x + 1,y - 1);
                // }
                //     //bottom corners
                // if(x >=1 && y < 8 && grid[y + 1][x -1] < 1) { // SW
                //     uncover(x - 1,y + 1);
                // }
                // if(x < 8 && y < 8 && grid[y + 1][x + 1] < 1) { // SE
                //     uncover(x + 1,y + 1);
                // }

        }}

function gridSetup(grid) {
    
    while (bombCurrent < bombMax) { //enums 
        for(let x= 0; x < grid.length; x++) {
            for(let y= 0; y< grid[x].length; y++) {
            var randChance = Math.random();
            if (randChance < 0.1 && bombCurrent < bombMax && grid[x][y] != 9) {
                grid[x][y] = 9; // 9 = bomb
                bombCurrent++;
            }
        }
        }
    }
  
    for(let x= 0; x < grid.length; x++) {
            for(let y= 0; y< grid[x].length; y++) {
                if(grid[x][y] >=9) {
                    console.log("bomb at: " + x + " " + y);
                }
                else{
                    //return;
                    if(grid[x][y] == 9) console.log("miss");
                    let count = 0;
                    const right = grid[x][y + 1];
                    const left = grid[x][y - 1];
                    const bottom = grid[x - 1]?.[y];
                    const top = grid[x + 1]?.[y];
                    const topRight = grid[x +1]?.[y + 1];
                    const topLeft = grid[x +1]?.[y - 1];
                    const bottomLeft = grid[x - 1]?.[y - 1];
                    const bottomRight = grid[x - 1]?.[y + 1];

                    const neighbours = [right, left, bottom, top, topRight, topLeft, bottomLeft, bottomRight].filter( n => n !== undefined && n >=9).forEach(n => count++);

                    grid[x][y] = count;

                    

                }
            
            
            }}
        }

//old code 

// // left and right
                    // if(x >=1 && grid[y][x -1] >=9) { // bomb to the left
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }
                    // if(x < 8 && grid[y][x + 1] >=9) { // bomb to the right
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }
                    // // above and below
                    // if(y >= 1 && grid[y - 1][x] >=9) { // bomb above
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }
                    // if(y < 8 && grid[y + 1][x] >=9) { // bomb below                       
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue + 1;
                    // }
                    // // diagonals
                    //     //top corners
                    // if(x >=1 && y >=1 && grid[y - 1][x - 1] >=9) { // bomb NW
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    //  }
                    // if(x < 8 && y >= 1 && grid[y - 1][x + 1] >=9) { // NE
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }
                    //     //bottom corners
                    // if(x >=1 && y < 8 && grid[y + 1][x -1] >=9) { // SW
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }
                    // if(x < 8 && y < 8 && grid[y + 1][x + 1] >=9) { // SE
                    //     var currValue = grid[y][x];
                    //     grid[y][x] = currValue +1;
                    // }

