import { MinPriorityQueue } from "datastructures-js";
import { IGetCompareValue } from '@datastructures-js/heap';
import { NodeCoords } from "../../redux-features/boardSlice";
import { addToParentMap, deepCopyGrid, direction, isSolution, isValid, NodeInterface, recreatePath } from "../GridUtils";
import { IAlgorithm, SolutionAlgo } from "./IAlgorithm";

export default class GREEDY_Algo implements IAlgorithm {
    grid: NodeInterface[][];
    start: NodeInterface;
    target: NodeInterface;
    priorityQueue: MinPriorityQueue<NodeInterface>;
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;
    solutionFound: boolean;

    constructor(grid: NodeInterface[][], start: NodeInterface, target: NodeInterface) {
        this.grid = deepCopyGrid(grid);
        this.start = start;
        this.target = target;
        const getNodeFCost: IGetCompareValue<NodeInterface> = (node: NodeInterface) => node.hCost;
        this.priorityQueue = new MinPriorityQueue<NodeInterface>(getNodeFCost); // to be visited nodes
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
        this.solutionFound = false;
    }

    run(): SolutionAlgo {
        this.bestFirstSearch();
        const resultPath = recreatePath(this.parentMap, this.target)
        const result: SolutionAlgo = {
            path: this.solutionFound === false ? [] : resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated.slice(1, this.queueVisitedAnimated.length)
        }
        return result;
    }

    bestFirstSearch() {
        this.parentMap.set([this.start.row, this.start.col].toString(), null)
        this.priorityQueue.enqueue(this.start);

        while (this.priorityQueue.size() != 0 && !this.solutionFound) {
            let currentNode: NodeInterface = this.priorityQueue.dequeue()
            this.queueVisitedAnimated.push({ row: currentNode.row, col: currentNode.col });

            if (isSolution(currentNode, this.target)) {
                this.solutionFound = true;
                return;
            }

            // Push all valid adjacent cells
            for (var i = 0; i < 4; i++) {
                const newNodeCoords: NodeCoords = {
                    row: currentNode.row + direction.row[i],
                    col: currentNode.col + direction.col[i]
                }

                if (isValid(newNodeCoords, this.parentMap, this.grid)) {
                    addToParentMap(this.parentMap, newNodeCoords, currentNode)
                    let hCost = Math.sqrt(Math.pow((this.target.row - newNodeCoords.row), 2) + Math.pow((this.target.col - newNodeCoords.col), 2));

                    const newNode: NodeInterface = {
                        ...this.grid[newNodeCoords.row][newNodeCoords.col],
                        hCost: hCost,
                        fCost: hCost
                    }

                    this.priorityQueue.enqueue(newNode);
                    this.grid[newNodeCoords.row][newNodeCoords.col] = newNode;
                }
            }
        }
    }
}