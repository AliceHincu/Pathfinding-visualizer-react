import { NodeCoords } from "../../redux-features/boardSlice";
import { NodeInterface } from "../GridUtils";

export const randomMaze = (grid:NodeInterface[][], randomVar: number) => {
    const queueToBeAnimated: NodeCoords[] = [];

    for(let i=0; i<grid.length; i++){
        for(let j=0; j<grid[i].length; j++){
            const random = Math.random();
            if (random < randomVar)
                queueToBeAnimated.push({row: i, col:j})
        }
    }

    return queueToBeAnimated;
}