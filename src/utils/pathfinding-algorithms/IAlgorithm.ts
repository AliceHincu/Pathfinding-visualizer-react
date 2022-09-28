import { NodeCoords } from "../../redux-features/boardSlice"

export interface IAlgorithm{}

export interface SolutionAlgo{
    path: NodeCoords[],
    queueVisitedAnimated: NodeCoords[]
}