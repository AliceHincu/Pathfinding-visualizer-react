import { HORIZONTAL, VERTICAL } from "../../constants/algorithms"
import { NodeCoords } from "../../redux-features/boardSlice"

/**https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm */
const chooseOrientation = (width:number, height:number) => {
    if(width < height)
        return HORIZONTAL
    if(height < width)
        return VERTICAL
    return HORIZONTAL
}

const getRandomNumber = (max: number) => {
    return Math.round(Math.random() * max);
}

const generateOuterWalls = (grid:any[][], width:number, height:number, queueToBeAnimated: NodeCoords[]) => {
        for(let i=0; i<height; i++){ // left and right border
            queueToBeAnimated.push({row: grid[i][0].row, col: grid[i][0].col})
            queueToBeAnimated.push({row: grid[i][width-1].row, col: grid[i][width-1].col})
        }
    
        for(let j=0; j<width; j++){ // up and down border
            queueToBeAnimated.push({row: grid[0][j].row, col: grid[0][j].col})
            queueToBeAnimated.push({row: grid[height-1][j].row, col: grid[height-1][j].col})
        }
}

export const recursiveDivisionMaze = (grid:any[][], x:number, y:number, width:number, height:number, orientation: string) => {
    let queueToBeAnimated: NodeCoords[] = []
    generateOuterWalls(grid, width, height, queueToBeAnimated)
    divide(grid, 1, 1, width-2, height-2, orientation, {row: -1, col: -1}, queueToBeAnimated)
    return queueToBeAnimated;
}

const divide = (grid:any[][], x:number, y:number, width:number, height:number, orientation: string, lastPassage:NodeCoords, queueToBeAnimated: NodeCoords[]) => {
    if(width <= 2 || height <= 2)
        return;

    const horizontal: boolean = orientation === HORIZONTAL;

    // where will the wall be drawn from?
    let randomRow = getRandomNumber(height-2);
    let randomCol =  getRandomNumber(width-2);

    if(horizontal){ // make last passage not be blocked by new wall or have 2close walls. walls are on odd coordinates
        while(x + randomRow === lastPassage.row || randomRow === 0 || randomRow % 2 === 0){
            randomRow = getRandomNumber(height-2)
        }
    } else {
        while(y + randomCol === lastPassage.col || randomCol === 0 || randomCol % 2 === 0){
            randomCol =  getRandomNumber(width-2)
        }
    }

    const startWall = {
        row: x + (horizontal ? randomRow : 0),
        col: y + (horizontal ? 0 : randomCol)
    }

    // where will the passage through the wall exist? passage is on even coordinates
    randomRow = getRandomNumber(height-1);
    randomCol =  getRandomNumber(width-1)
    while(randomRow % 2 === 1){
        randomRow = getRandomNumber(height-1)
    }
    while(randomCol % 2 === 1){
        randomCol =  getRandomNumber(width-1)
    }

    const passage = {
        row: startWall.row + (horizontal ? 0 : randomRow),
        col: startWall.col + (horizontal ? randomCol : 0)
    }

    // what direction will the wall be drawn?
    const direction = {
        row: horizontal ? 0 : 1,
        col: horizontal ? 1 : 0
    }

    // how long will the wall be?
    const length = horizontal ? width : height

    for(let i=0; i<length; i++){
        if(startWall.row !== passage.row || startWall.col !== passage.col){
            queueToBeAnimated.push({row: startWall.row, col: startWall.col})
        }
        startWall.row += direction.row
        startWall.col += direction.col
    }

    let [newWidth, newHeight] = horizontal ? [width, startWall.row-x] : [startWall.col-y, height];
    divide(grid, x, y, newWidth, newHeight, chooseOrientation(newWidth, newHeight), passage, queueToBeAnimated);

    let [newX, newY] = horizontal ? [startWall.row+1, y] : [x, startWall.col+1];
    let [w, h]= horizontal ? [width, x+height-startWall.row-1] : [y+width-startWall.col-1, height]
    divide(grid, newX, newY, w, h, chooseOrientation(w, h), passage, queueToBeAnimated)
}