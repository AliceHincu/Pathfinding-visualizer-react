// import {  NodeInterface } from "../GridUtils";

import { NodeCoords } from "../../redux-features/boardSlice"

/**https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm */
export const chooseOrientation = (width:number, height:number) => {
    if(width < height)
        return "horizontal"
    if(height < width)
        return "vertical"
    return "horizontal"
}

const getRandomNumber = (max: number) => {
    return Math.round(Math.random() * max);
}

const generateOuterWalls = (grid:any[][], width:number, height:number) => {
        // surrounding (outer) walls
        for(let i=0; i<height; i++){ // left and right border
            grid[i][0] = {
                ...grid[i][0],
                isWall: true
            }
            grid[i][width-1] = {
                ...grid[i][width-1],
                isWall: true
            }
        }
    
        for(let j=0; j<width; j++){
            grid[0][j] = {
                ...grid[0][j],
                isWall: true
            }
            grid[height-1][j] = {
                ...grid[height-1][j],
                isWall: true
            }
        }
}

export const recursiveDivisionMaze = (grid:any[][], x:number, y:number, width:number, height:number, orientation: string) => {
    generateOuterWalls(grid, width, height)
    divide(grid, 1, 1, width-2, height-2, "horizontal", {row: -1, col: -1})
    console.log(grid)
    return grid;
}

export const divide = (grid:any[][], x:number, y:number, width:number, height:number, orientation: string, lastPassage:NodeCoords) => {
    // console.log(x, y, width, height)
    if(width <= 2 || height <= 2)
        return;

    const horizontal: boolean = orientation === "horizontal";

    // where will the wall be drawn from?
    let randomRow = getRandomNumber(height-2);
    let randomCol =  getRandomNumber(width-2);

    if(horizontal){ // make last passage not be blocked by new wall or have 2close walls
        while(x + randomRow == lastPassage.row || randomRow == 0 || randomRow % 2 == 0){
            randomRow = getRandomNumber(height-2)
        }
    } else {
        while(y + randomCol == lastPassage.col || randomCol == 0 || randomCol % 2 == 0){
            randomCol =  getRandomNumber(width-2)
        }
    }

    const startWall = {
        row: x + (horizontal ? randomRow : 0),
        col: y + (horizontal ? 0 : randomCol)
    }

    console.log(startWall)

    // where will the passage through the wall exist?
    randomRow = getRandomNumber(height-1);
    randomCol =  getRandomNumber(width-1)
    while(randomRow % 2 == 1){
        randomRow = getRandomNumber(height-1)
    }
    while(randomCol % 2 == 1){
        randomCol =  getRandomNumber(width-1)
    }

    const passage = {
        row: startWall.row + (horizontal ? 0 : randomRow),
        col: startWall.col + (horizontal ? randomCol : 0)
    }
    
    console.log(passage)


    // what direction will the wall be drawn?
    const direction = {
        row: horizontal ? 0 : 1,
        col: horizontal ? 1 : 0
    }

    // how long will the wall be?
    const length = horizontal ? width : height
    console.log(length)

    // what direction is perpendicular to the wall?
    const dir = horizontal ? 1 : 2

    for(let i=0; i<length; i++){
        if(startWall.row != passage.row || startWall.col != passage.col){
            console.log(startWall.row, startWall.col)
            grid[startWall.row][startWall.col].isWall = true ;
        }
        startWall.row += direction.row
        startWall.col += direction.col
    }

    let [newWidth, newHeight] = horizontal ? [width, startWall.row-x] : [startWall.col-y, height];
    divide(grid, x, y, newWidth, newHeight, chooseOrientation(newWidth, newHeight), passage);

    // if(horizontal){
    //     console.log(`[newX, newY]=[startWall.row+1, y]=[${startWall.row+1}, ${y}]`)
    //     console.log(`[w,h]=[width, x+height-startWall.row-1]=[${width}, ${height-startWall.row-1}]`)
    // } else {
    //     console.log(`[newX, newY]=[startWall.row+1, y]=[${x}, ${startWall.col+1}]`)
    //     console.log(`[w,h]=[y+width-startWall.col-1, height]=[${y+width-startWall.col-1}, ${height}]`)
    // }

    let [newX, newY] = horizontal ? [startWall.row+1, y] : [x, startWall.col+1];
    let [w, h]= horizontal ? [width, x+height-startWall.row-1] : [y+width-startWall.col-1, height]
    divide(grid, newX, newY, w, h, chooseOrientation(w, h), passage)

    return grid
}


// export const generate = (grid: NodeInterface[][]) => {
//     addOuterWalls(grid);
//     addInnerWalls(grid, true, 1, grid.length - 2, 1, grid.length - 2);
//     return grid;
// }

// function addOuterWalls(grid: NodeInterface[][]) {
//     for (var i = 0; i < ROW_COUNT; i++) {
//         if (i == 0 || i == (ROW_COUNT - 1)) {
//             for (var j = 0; j < COLUMN_COUNT; j++) {
//                 grid[i][j].isWall = true;
//             }
//         } else {
//             grid[i][0].isWall = true;
//             grid[i][COLUMN_COUNT - 1].isWall = true;
//         }
//     }
// }

// function addInnerWalls(grid:NodeInterface[][], h: boolean, minX: number, maxX: number, minY: number, maxY: number) {
//     if (h) {

//         if (maxX - minX < 2) {
//             return;
//         }

//         var y = Math.floor(randomNumber(minY, maxY)/2)*2;
//         addHWall(grid, minX, maxX, y);

//         addInnerWalls(grid, !h, minX, maxX, minY, y-1);
//         addInnerWalls(grid, !h, minX, maxX, y + 1, maxY);
//     } else {
//         if (maxY - minY < 2) {
//             return;
//         }

//         var x = Math.floor(randomNumber(minX, maxX)/2)*2;
//         addVWall(grid, minY, maxY, x);

//         addInnerWalls(grid, !h, minX, x-1, minY, maxY);
//         addInnerWalls(grid, !h, x + 1, maxX, minY, maxY);
//     }
// }

// function addHWall(grid:NodeInterface[][], minX: number, maxX: number, y: number) {
//     var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;

//     for (var i = minX; i <= maxX; i++) {
//         if (i != hole) 
//             grid[y][i].isWall = true;
//     }
// }

// function addVWall(grid:NodeInterface[][], minY: number, maxY: number, x: number) {
//     var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;

//     for (var i = minY; i <= maxY; i++) {
//         if (i != hole)
//             grid[i][x].isWall = true;
//     }
// }

// function randomNumber(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }