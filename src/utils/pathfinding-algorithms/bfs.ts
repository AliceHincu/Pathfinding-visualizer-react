import { COLUMN_COUNT, ROW_COUNT } from "../../constants/grid-details";
import { NodeCoords } from "../../redux-features/boardSlice";
import { NodeInterface } from "../GridUtils";

const direction = {
    row: [-1, 0, 1, 0],
    col: [0, 1, 0, -1]
}

// Function to check if a cell can be visited or not
const isValid = (grid: NodeInterface[][], visited: Map<string, NodeCoords | null>, nodeCoords: number[]) => {
    // If cell lies out of bounds
    if (nodeCoords[0] < 0 || nodeCoords[1] < 0 || nodeCoords[0] >= ROW_COUNT || nodeCoords[1] >= COLUMN_COUNT)
        return false;

    // If cell is already visited or is a wall
    if (visited.has(nodeCoords.toString()) || grid[nodeCoords[0]][nodeCoords[1]].isWall)
        return false;

    // Otherwise
    return true;
}

const isSolution = (node: number[], target: number[]) => {
    return node[0] === target[0] && node[1] == target[1]
}

const recreatePath = (visited:  Map<string, NodeCoords | null>, targetCoords: number[]) => {
    let path = []
    let current: NodeCoords|null|undefined = visited.get(targetCoords.toString());
    while (current != null) {
        path.push(current);
        current = visited.get([current.row, current.col].toString());
    }
    return path.reverse()
}

export interface SolutionBFS{
    path: NodeCoords[],
    queueVisitedAnimated: NodeCoords[][]
}

export const bfs = (grid: NodeInterface[][], startCoords: number[], targetCoords: number[]):SolutionBFS => {
    // Stores indices of the matrix cells
    const queue: number[][] = [];
    const queueVisitedAnimated: NodeCoords[][] = []
    // Stores the node and the prev node
    const visited = new Map<string, NodeCoords | null>();

    // Mark the starting cell as visited and push it into the queue
    queue.push(startCoords);
    visited.set(startCoords.toString(), null); // Mark source as visited

    // Iterate while the queue is not empty and target is not reached
    let currentNode: number[];
    while (queue.length !== 0) {
        currentNode = queue[0];
        queue.shift();

        let currentVisitedForQueue: NodeCoords[] = []

        // Go to the adjacent cells
        for (var i = 0; i < 4; i++) {
            const newNodeCoords: number[] = [currentNode[0] + direction.row[i], currentNode[1] + direction.col[i]]

            if (isValid(grid, visited, newNodeCoords)) {
                visited.set(newNodeCoords.toString(), {row:currentNode[0], col:currentNode[1]})
                queue.push(newNodeCoords);
                currentVisitedForQueue.push({row: newNodeCoords[0], col: newNodeCoords[1]})
            }

            if (isSolution(newNodeCoords, targetCoords)) {
                let path = recreatePath(visited, targetCoords);
                path = path.slice(1, path.length)
                return {
                    path: path,
                    queueVisitedAnimated: queueVisitedAnimated
                }
            }
        }

        queueVisitedAnimated.push(currentVisitedForQueue);
    }

    return {
        path: [],
        queueVisitedAnimated: queueVisitedAnimated
    }
}