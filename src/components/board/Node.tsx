import { useEffect, useState } from 'react';
import { SQUARE_SIZE } from '../../constants/dimensions';
import { START, TARGET, UNVISITED, WALL } from '../../constants/node-types';
import { NodeInterface } from '../../utils/GridUtils';
import './Node.css';

interface NodeProps{
    node: NodeInterface
}

const Node = ({node}: NodeProps) => {
    const [isStart, setIsStart] = useState(node.isStart)
    const [isFinish, setIsFinish] = useState(node.isFinish)
    const [distance, setDistance] = useState(node.distance)
    const [isVisited, setIsVisited] = useState(node.isVisited)
    const [isWall, setIsWall] = useState(node.isWall)

    const getNodeType = (): string => {
        return  isFinish ? TARGET : 
                isStart ? START : 
                isWall ? WALL : UNVISITED
    }

    let nodeType = getNodeType();
    if(nodeType == START){
        console.log(node)
    }
    // console.log(nodeType)
    // useEffect(() => {
    //     nodeType = getNodeType()
    //     console.log(node.row, node.col, nodeType)
    
    // }, [isStart, isFinish, isWall])


    return (
        <div className = {`node ${nodeType}`} style={{width:`${SQUARE_SIZE}px`, height:`${SQUARE_SIZE}px`}}>
        </div>
    )
}

export default Node;