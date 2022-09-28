import { NodeCoords } from "../../redux-features/boardSlice";
import { addToParentMap, direction, getMapKey, isSolution, isValid, NodeInterface, recreatePath } from "../GridUtils";
import { IAlgorithm, SolutionAlgo } from "./IAlgorithm";

export default class BFS_Algo implements IAlgorithm{
    grid: NodeInterface[][];
    start: NodeCoords;
    target: NodeCoords;
    queue: NodeCoords[];
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;

    constructor(grid: NodeInterface[][], startCoords: NodeCoords, targetCoords: NodeCoords) {
        this.grid = grid;
        this.start = startCoords;
        this.target = targetCoords;
        this.queue = [];
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
    }

    run(): SolutionAlgo {
        const resultPath = this.bfs();
        const result: SolutionAlgo = {
            path: resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated
        }
        return result;
    }

    bfs(): NodeCoords[] {
        this.queue.push(this.start);
        addToParentMap(this.parentMap, this.start, null);

        while (this.queue.length !== 0) {
            let currentNode: NodeCoords = this.queue[0];
            this.queue.shift();

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
                    this.queue.push(newNodeCoords);
                    this.queueVisitedAnimated.push(newNodeCoords);
                }
            }
        }

        return [];
    }
}