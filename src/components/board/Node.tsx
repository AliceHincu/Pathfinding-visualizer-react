import React from "react";
import { useSelector } from "react-redux";
import { SQUARE_SIZE } from "../../constants/dimensions";
import {
  START,
  TARGET,
  UNVISITED,
  WALL,
  VISITED,
  PATH,
} from "../../constants/node-types";
import {
  isMousePressed,
  NodeCoords,
  selectMouse,
  selectIsStartDragged,
  selectIsTargetDragged,
  setStartNode,
  setTargetNode,
  startIsDragged,
  targetIsDragged,
  setWallNode,
} from "../../redux-features/boardSlice";
import { useAppDispatch } from "../../redux-features/hooks";
import { selectNodeType } from "../../redux-features/nodeSlice";
import { NodeInterface } from "../../utils/GridUtils";
import "./Node.css";

interface NodeProps {
  node: NodeInterface;
  isAnimationInProgress: boolean;
}

const Node = ({ node, isAnimationInProgress }: NodeProps) => {
  const nodeCoords: NodeCoords = { row: node.row, col: node.col };
  const nodeDraggedType = useSelector(selectNodeType);
  const mouseState = useSelector(selectMouse);
  const isStartDragged = useSelector(selectIsStartDragged);
  const isTargetDragged = useSelector(selectIsTargetDragged);
  const dispatch = useAppDispatch();

  // console.log(`The node (${node.row}, ${node.col}) was rendered`)

  const getNodeType = (): string => {
    return node.isFinish
      ? TARGET
      : node.isStart
        ? START
        : node.isPath
          ? PATH
          : node.isWall
            ? WALL
            : node.isVisited
              ? VISITED
              : UNVISITED;
  };

  let nodeType = getNodeType();

  const onMouseDownHandler = () => {
    if (isAnimationInProgress) return;

    if (!node.isFinish && !node.isStart) {
      if (nodeDraggedType === WALL)
        dispatch(setWallNode({ ...nodeCoords, isWall: true }));
      if (nodeDraggedType === UNVISITED)
        dispatch(setWallNode({ ...nodeCoords, isWall: false }));
    }

    if (node.isStart) dispatch(startIsDragged(true));
    if (node.isFinish) dispatch(targetIsDragged(true));

    dispatch(isMousePressed(true));
  };

  const onMouseEnterHandler = () => {
    if (isAnimationInProgress) return;
    if (!mouseState) return;

    if (!isStartDragged && !isTargetDragged && nodeDraggedType !== START && nodeDraggedType !== TARGET) {
      if (nodeDraggedType === WALL && node.isWall === false && node.isStart === false && node.isFinish === false)
        dispatch(setWallNode({ ...nodeCoords, isWall: true }));
      if (nodeDraggedType === UNVISITED && node.isWall === true)
        dispatch(setWallNode({ ...nodeCoords, isWall: false }));
    }

    if (isStartDragged) {
      if (node.isFinish) return;
      dispatch(setStartNode(nodeCoords));
    }

    if (isTargetDragged) {
      if (node.isStart) return;
      dispatch(setTargetNode(nodeCoords));
    }
  };

  return (
    <div
      className={`node ${nodeType}`}
      style={{ width: `${SQUARE_SIZE}px`, height: `${SQUARE_SIZE}px` }}
      onMouseDown={onMouseDownHandler}
      onMouseEnter={onMouseEnterHandler}
    ></div>
  );
};

export default React.memo(Node);
