import { NodeCoords } from "../../redux-features/boardSlice";
import { addToParentMap, deepCopyGrid, direction, generateVisitedGrid, getMapKey, isSolution, isValid, isValidVis, NodeInterface, recreatePath } from "../GridUtils";
import { IAlgorithm, SolutionAlgo } from "./IAlgorithm";

export default class DFS_Algo implements IAlgorithm{
    grid: NodeInterface[][];
    visited: boolean[][];
    start: NodeCoords;
    target: NodeCoords;
    stack: NodeCoords[];
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;

    constructor(grid: NodeInterface[][], startCoords: NodeCoords, targetCoords: NodeCoords){
        this.grid = deepCopyGrid(grid);
        this.visited = generateVisitedGrid();
        this.start = startCoords;
        this.target = targetCoords;
        this.stack = [];
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
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
            this.visited[currentNode.row][currentNode.col] = true;

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

                if (isValidVis(newNodeCoords, this.visited, this.grid)) {
                    this.parentMap.set(getMapKey(newNodeCoords), currentNode)
                    this.stack.push(newNodeCoords);
                }
            }
        }

        return [];
    }
}
