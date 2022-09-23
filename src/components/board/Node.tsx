import { SQUARE_SIZE } from '../../constants/dimensions';
import './Node.css';

interface NodeProps{
    row: number,
    col: number
}

const Node = ({row, col}: NodeProps) => {
    return (
        <div className = 'node node-unvisited' style={{width:`${SQUARE_SIZE}px`, height:`${SQUARE_SIZE}px`}}>
        </div>
    )
}

export default Node;