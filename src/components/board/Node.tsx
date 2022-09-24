import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SQUARE_SIZE } from '../../constants/dimensions';
import { NOT_PRESSED } from '../../constants/mouse';
import { START, TARGET, UNVISITED, WALL } from '../../constants/node-types';
import { mouseNotPressed, mousePressed, selectMouse, toggleWallNode } from '../../redux-features/boardSlice';
import { useAppDispatch } from '../../redux-features/hooks';
import { selectNodeType } from '../../redux-features/nodeSlice';
import { NodeInterface } from '../../utils/GridUtils';
import './Node.css';

interface NodeProps{
    node: NodeInterface
}

const Node = ({node}: NodeProps) => {
    const nodeDraggedType = useSelector(selectNodeType);
    const mouseState = useSelector(selectMouse);
    const dispatch = useAppDispatch();

    console.log(`The node (${node.row}, ${node.col}) was rendered`)

    const getNodeType = (): string => {
        return  node.isFinish ? TARGET : 
                node.isStart ? START : 
                node.isWall ? WALL : UNVISITED
    }

    let nodeType = getNodeType();

    const onMouseDownHandler = () => {
        if(!node.isFinish && !node.isStart) {
            if(nodeDraggedType === WALL)
                dispatch(toggleWallNode({row: node.row, col: node.col}))
        }

        dispatch(mousePressed())
    }

    const onMouseEnterHandler = () => {
        if(mouseState == NOT_PRESSED)
            return;
        if(nodeDraggedType!==START && nodeDraggedType!==TARGET){
            if(nodeDraggedType==WALL && node.isWall == false)
                dispatch(toggleWallNode({row: node.row, col: node.col}))
        }
    }

    const onMouseUpHandler = () => {
        dispatch(mouseNotPressed())
    }


    return (
        <div className = {`node ${nodeType}`} style={{width:`${SQUARE_SIZE}px`, height:`${SQUARE_SIZE}px`}}
            onMouseDown={onMouseDownHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseUp={onMouseUpHandler}
            >
        </div>
    )
}

export default React.memo(Node);