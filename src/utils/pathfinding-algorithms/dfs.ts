import { NodeCoords } from "../../redux-features/boardSlice";
import { addToParentMap, direction, getMapKey, isSolution, isValid, NodeInterface, recreatePath } from "../GridUtils";
import { IAlgorithm, SolutionAlgo } from "./IAlgorithm";

export default class DFS_Algo implements IAlgorithm{
    grid: NodeInterface[][];
    start: NodeCoords;
    target: NodeCoords;
    stack: NodeCoords[];
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;
    solutionFound: boolean;

    constructor(grid: NodeInterface[][], startCoords: NodeCoords, targetCoords: NodeCoords){
        this.grid = grid;
        this.start = startCoords;
        this.target = targetCoords;
        this.stack = []
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
        this.solutionFound = false;
    }

    run(): SolutionAlgo {
        const resultPath = this.dfs();

        const result: SolutionAlgo = {
            path: resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated.slice(1, this.queueVisitedAnimated.length)
        }
        return result;
    }

    dfs(): NodeCoords[] {
        this.stack.push(this.start);
        addToParentMap(this.parentMap, this.start, null);
        
        while (this.stack.length !== 0) {
            let currentNode: NodeCoords = this.stack.pop()!;
            this.queueVisitedAnimated.push(currentNode);


            // Go to the adjacent cells
            for (var i = 0; i < 4; i++) {
                const newNodeCoords: NodeCoords = {
                    row: currentNode.row + direction.row[i],
                    col: currentNode.col + direction.col[i]
                }

                if (isSolution(newNodeCoords, this.target)) {
                    addToParentMap(this.parentMap, this.target, currentNode);
                    return recreatePath(this.parentMap, this.target);
                }

                if (isValid(newNodeCoords, this.parentMap, this.grid)) {
                    this.parentMap.set(getMapKey(newNodeCoords), currentNode)
                    this.stack.push(newNodeCoords);
                }
            }
        }
        return [];
    }
}
