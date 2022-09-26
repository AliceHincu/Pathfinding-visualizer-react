import { ROW_COUNT, COLUMN_COUNT } from "../../constants/grid-details";
import { NodeCoords } from "../../redux-features/boardSlice";
import { NodeInterface } from "../GridUtils";

const direction = {
    row: [-1, 0, 1, 0],
    col: [0, 1, 0, -1]
}

export interface SolutionDFS{
    path: NodeCoords[],
    queueVisitedAnimated: NodeCoords[]
}

export default class DFS_Algo {
    grid: NodeInterface[][];
    startCoords: number[];
    targetCoords: number[];
    stack: number[][];
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;
    solutionFound: boolean;

    constructor(grid: NodeInterface[][], startCoords: number[], targetCoords: number[]){
        this.grid = grid;
        this.startCoords = startCoords;
        this.targetCoords = targetCoords;
        this.stack = [];
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
        // this.parentMap.set(startCoords.toString(), null);
        this.solutionFound = false;
    }

    run(): SolutionDFS {
        const resultPath = this.dfsUtil(this.startCoords, null);
        const result: SolutionDFS = {
            path: resultPath == undefined ? [] : resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated
        }
        return result;
    }

    dfsUtil(currentNode: number[], parent:NodeCoords|null): NodeCoords[]|undefined {
        if(this.solutionFound)
            return;
        if(!this.isValid(currentNode))
            return;
        
        // Mark the node as visited
        this.parentMap.set(currentNode.toString(), parent)
    
        if (this.isSolution(currentNode)) {
            let path = this.recreatePath();
            this.solutionFound = true;
            return path;
        }
         
        this.queueVisitedAnimated.push({row: currentNode[0], col: currentNode[1]})

        // Push all the adjacent cells
        for (var i = 0; i < 4; i++) {
            const newNodeCoords: number[] = [currentNode[0] + direction.row[i], currentNode[1] + direction.col[i]]
            let result = this.dfsUtil(newNodeCoords, {row: currentNode[0], col: currentNode[1]})
            if(result != null)
                return result;
        }

    }

    // Function to check if a cell can be visited or not
    isValid(nodeCoords: number[]): boolean {
        // If cell lies out of bounds
        if (nodeCoords[0] < 0 || nodeCoords[1] < 0 || nodeCoords[0] >= ROW_COUNT || nodeCoords[1] >= COLUMN_COUNT)
            return false;

        // If cell is already visited or is a wall
        if (this.parentMap.has(nodeCoords.toString()) || this.grid[nodeCoords[0]][nodeCoords[1]].isWall)
            return false;

        // Otherwise
        return true;
    }

    isSolution(node: number[]): boolean {
        return node[0] === this.targetCoords[0] && node[1] == this.targetCoords[1]
    }

    recreatePath(): NodeCoords[] {
        let path: NodeCoords[] = []
        let current: NodeCoords|null|undefined = this.parentMap.get(this.targetCoords.toString());
        while (current != null) {
            path.push(current);
            current = this.parentMap.get([current.row, current.col].toString());
        }
        return path.reverse()
    }
}