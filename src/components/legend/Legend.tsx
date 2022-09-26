import { LEGEND_HEIGHT } from '../../constants/dimensions'
import { PATH, START, TARGET, UNVISITED, VISITED, WALL } from '../../constants/node-types';
import { useAppDispatch } from '../../redux-features/hooks';
import { changeType } from '../../redux-features/nodeSlice';
import LegendNode from './Legend-node';
import './Legend.css';

const Legend = () => {
    const dispatch = useAppDispatch();

    const updateNodeType = (type: string) => {
        dispatch(changeType(type))
    }

    return (
      <div>
        <div className='legend-container' style={{height:`${LEGEND_HEIGHT}px`}}>
          <LegendNode title='Unvisited' classNameNode={UNVISITED} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          <LegendNode title='Wall' classNameNode={WALL} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          <LegendNode title='Start' classNameNode={START} updateCallbackFunction={() => {}}></LegendNode>
          <LegendNode title='Target' classNameNode={TARGET} updateCallbackFunction={() => {}}></LegendNode>
          <LegendNode title='Visited' classNameNode={VISITED} updateCallbackFunction={() => {}}></LegendNode>
          <LegendNode title='Path' classNameNode={PATH} updateCallbackFunction={() => {}}></LegendNode>
          {/* add weight here */}     
        </div>
      </div>
  )
}

export default Legend