import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SQUARE_SIZE } from '../../constants/dimensions';
import { NOT_PRESSED } from '../../constants/mouse';
import { START, TARGET, UNVISITED, WALL } from '../../constants/node-types';
import { isMousePressed, NodeCoords, selectMouse, selectStart, selectTarget, setStartNode, setTargetNode, startIsDragged, targetIsDragged, setWallNode } from '../../redux-features/boardSlice';
import { useAppDispatch } from '../../redux-features/hooks';
import { selectNodeType } from '../../redux-features/nodeSlice';
import { NodeInterface } from '../../utils/GridUtils';
import './Node.css';

interface NodeProps{
    node: NodeInterface
}

const Node = ({node}: NodeProps) => {
    const nodeCoords: NodeCoords = {row: node.row, col: node.col};
    const nodeDraggedType = useSelector(selectNodeType);
    const mouseState = useSelector(selectMouse);
    const isStartDragged = useSelector(selectStart);
    const isTargetDragged = useSelector(selectTarget);
    const dispatch = useAppDispatch();

    // console.log(`The node (${node.row}, ${node.col}) was rendered`)

    const getNodeType = (): string => {
        return  node.isFinish ? TARGET : 
                node.isStart ? START : 
                node.isWall ? WALL : UNVISITED
    }

    let nodeType = getNodeType();

    const onMouseDownHandler = () => {
        if(!node.isFinish && !node.isStart) {
            console.log(nodeDraggedType)
            if(nodeDraggedType === WALL)
                dispatch(setWallNode({...nodeCoords, isWall: true}))
            if(nodeDraggedType === UNVISITED)
                dispatch(setWallNode({...nodeCoords, isWall: false}))
        }

        if(node.isStart)
            dispatch(startIsDragged(true))
        if(node.isFinish)
            dispatch(targetIsDragged(true))

        dispatch(isMousePressed(true))
    }

    const onMouseEnterHandler = () => {
        if(!mouseState)
            return;
        if(!isStartDragged && !isTargetDragged && nodeDraggedType!==START && nodeDraggedType!==TARGET){
            if(nodeDraggedType==WALL && node.isWall == false)
                dispatch(setWallNode({...nodeCoords, isWall: true}))
            if(nodeDraggedType==UNVISITED && node.isWall == true)
                dispatch(setWallNode({...nodeCoords, isWall: false}))
        }

        if(isStartDragged){
            if(node.isFinish)
                return
            dispatch(setStartNode(nodeCoords))
        }

        if(isTargetDragged){
            if(node.isStart)
                return
            dispatch(setTargetNode(nodeCoords))
        }
    }

    return (
        <div className = {`node ${nodeType}`} style={{width:`${SQUARE_SIZE}px`, height:`${SQUARE_SIZE}px`}}
            onMouseDown={onMouseDownHandler}
            onMouseEnter={onMouseEnterHandler}
            >
        </div>
    )
}

export default React.memo(Node);