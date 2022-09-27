import { NodeCoords } from "../../redux-features/boardSlice";
import { addToParentMap, direction, getMapKey, isSolution, isValid, NodeInterface, recreatePath } from "../GridUtils";

export interface SolutionDFS{
    path: NodeCoords[],
    queueVisitedAnimated: NodeCoords[]
}

export default class DFS_Algo {
    grid: NodeInterface[][];
    start: NodeCoords;
    target: NodeCoords;
    stack: number[][];
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;
    solutionFound: boolean;

    constructor(grid: NodeInterface[][], startCoords: NodeCoords, targetCoords: NodeCoords){
        this.grid = grid;
        this.start = startCoords;
        this.target = targetCoords;
        this.stack = [];
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
        this.solutionFound = false;
    }

    run(): SolutionDFS {
        const resultPath = this.dfsUtil(this.start, null);
        const result: SolutionDFS = {
            path: resultPath == undefined ? [] : resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated.slice(1, this.queueVisitedAnimated.length)
        }
        return result;
    }

    dfsUtil(currentNode: NodeCoords, parent:NodeCoords|null): NodeCoords[]|undefined {
        if(this.solutionFound)
            return;
            
        if (isSolution(currentNode, this.target)) {
            addToParentMap(this.parentMap, currentNode, parent)
            let path = recreatePath(this.parentMap, this.target);
            this.solutionFound = true;
            return path;
        }
             
        if(!isValid(currentNode, this.parentMap, this.grid))
            return;
        
        // Mark the node as visited
        addToParentMap(this.parentMap, currentNode, parent)       
        this.queueVisitedAnimated.push(currentNode)

        // Push all the adjacent cells
        for (var i = 0; i < 4; i++) {
            const newNodeCoords: NodeCoords = {
                row: currentNode.row + direction.row[i], 
                col: currentNode.col + direction.col[i]
            }
            let result = this.dfsUtil(newNodeCoords, currentNode)
            if(result != null)
                return result;
        }
    }
}
