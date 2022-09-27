import { MinPriorityQueue } from "datastructures-js";
import { IGetCompareValue } from '@datastructures-js/heap';
import { COLUMN_COUNT, ROW_COUNT } from "../../constants/grid-details";
import { NodeCoords } from "../../redux-features/boardSlice";
import { deepCopyGrid, direction, getMapKey, NodeInterface } from "../GridUtils";

export interface SolutionASTAR {
    path: NodeCoords[],
    queueVisitedAnimated: NodeCoords[]
}

export default class ASTAR_Algo {
    grid: NodeInterface[][];
    start: NodeInterface;
    target: NodeInterface;
    priorityQueue: MinPriorityQueue<NodeInterface>;
    queueVisitedAnimated: NodeCoords[];
    parentMap: Map<string, NodeCoords | null>;
    costMap: Map<string, number>;
    solutionFound: boolean;

    constructor(grid: NodeInterface[][], start: NodeInterface, target: NodeInterface) {
        this.grid = deepCopyGrid(grid);
        this.start = start;
        this.target = target;
        const getNodeFCost: IGetCompareValue<NodeInterface> = (node: NodeInterface) => node.fCost;
        this.priorityQueue = new MinPriorityQueue<NodeInterface>(getNodeFCost); // to be visited nodes
        this.queueVisitedAnimated = [];
        this.parentMap = new Map<string, NodeCoords | null>();
        this.costMap = new Map<string, number>();
        this.solutionFound = false;
    }

    run(): SolutionASTAR {
        this.bestFirstSearch();
        const resultPath = this.recreatePath()
        const result: SolutionASTAR = {
            path: this.solutionFound === false ? [] : resultPath,
            queueVisitedAnimated: this.queueVisitedAnimated.slice(1, this.queueVisitedAnimated.length)
        }
        return result;
    }

    bestFirstSearch() {
        this.costMap.set([this.start.row, this.start.col].toString(), 0);  // for g function
        this.parentMap.set([this.start.row, this.start.col].toString(), null)
        this.priorityQueue.enqueue(this.start);

        while (this.priorityQueue.size() != 0 && !this.solutionFound) {
            let currentNode: NodeInterface = this.priorityQueue.dequeue()
            this.queueVisitedAnimated.push({ row: currentNode.row, col: currentNode.col });

            if (this.isSolution(currentNode)) {
                this.solutionFound = true;
                return;
            }

            let currentCost: number = this.costMap.get(getMapKey(currentNode))!;

            // Push all valid adjacent cells
            for (var i = 0; i < 4; i++) {
                const newNodeCoords: NodeCoords = {
                    row: currentNode.row + direction.row[i],
                    col: currentNode.col + direction.col[i]
                }

                if (this.isValid(newNodeCoords)) {
                    this.addToParentMap(this.parentMap, newNodeCoords, currentNode)
                    let gCost = this.updateAndGetCost(newNodeCoords, currentCost);
                    let hCost = Math.sqrt(Math.pow((this.target.row - newNodeCoords.row), 2) + Math.pow((this.target.col - newNodeCoords.col), 2));

                    const newNode: NodeInterface = {
                        ...this.grid[newNodeCoords.row][newNodeCoords.col],
                        gCost: gCost,
                        hCost: hCost,
                        fCost: gCost + hCost
                    }

                    this.priorityQueue.enqueue(newNode);
                    this.grid[newNodeCoords.row][newNodeCoords.col] = newNode;
                }
            }

        }
    }

    evaluationFunction(currentCoords: number[], targetCoords: number[], costMap: Map<string, number>) {
        const function_g = costMap.get(currentCoords.toString());
        const function_h = Math.sqrt(Math.pow((targetCoords[0] - currentCoords[0]), 2) + Math.pow((targetCoords[1] - currentCoords[1]), 2)); // heuristic function = smart guess
        return function_g == undefined ? function_h : function_g + function_h
    }

    euclideanDistance(coord1: number[], coord2: number[]): number {
        return Math.sqrt(Math.pow((coord2[0] - coord1[0]), 2) + Math.pow((coord2[1] - coord1[1]), 2));
    }

    // Function to check if a cell can be visited or not
    isValid(nodeCoords: NodeCoords): boolean {
        // If cell lies out of bounds
        if (nodeCoords.row < 0 || nodeCoords.col < 0 || nodeCoords.row >= ROW_COUNT || nodeCoords.col >= COLUMN_COUNT)
            return false;

        // If cell is already visited or is a wall
        if (this.parentMap.has(getMapKey(nodeCoords)) || this.grid[nodeCoords.row][nodeCoords.col].isWall)
            return false;

        // Otherwise
        return true;
    }

    isSolution(node: NodeInterface): boolean {
        return node.row === this.target.row && node.col == this.target.col
    }

    recreatePath(): NodeCoords[] {
        let path: NodeCoords[] = []
        let current: NodeCoords | null | undefined = this.parentMap.get([this.target.row, this.target.col].toString());
        while (current != null) {
            path.push(current);
            current = this.parentMap.get([current.row, current.col].toString());
        }
        return path.reverse()
    }

    updateAndGetCost(coords: NodeCoords, currentCost: number): number {
        this.costMap.set(getMapKey(coords), currentCost + 1);
        return this.costMap.get(getMapKey(coords))!;
    }

    addToParentMap(parentMap: Map<string, NodeCoords | null>, childCoords: NodeCoords, parentCoords: NodeCoords) {
        parentMap.set(getMapKey(childCoords), parentCoords)
    }
}