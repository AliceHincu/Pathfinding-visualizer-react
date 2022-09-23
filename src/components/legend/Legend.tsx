import { LEGEND_HEIGHT } from '../../constants/dimensions'
import { START, TARGET, UNVISITED, WALL } from '../../constants/node-types';
import { useAppDispatch } from '../../redux-features/hooks';
import { changeType } from '../../redux-features/node/nodeSlice';
import LegendNode from './Legend-node';
import './Legend.css'

const Legend = () => {
    const dispatch = useAppDispatch();

    const updateNodeType = (type: string) => {
      if(type !== 'start-node' && type !== 'target-node'){
        dispatch(changeType(type))
      }
    }

    return (
      <div>
        <div className='legend-container' style={{height:`${LEGEND_HEIGHT}px`}}>
          <LegendNode title='Unvisited' classNameNode={UNVISITED} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          <LegendNode title='Start' classNameNode={START} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          <LegendNode title='Target' classNameNode={TARGET} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          <LegendNode title='Wall' classNameNode={WALL} updateCallbackFunction={(type) => updateNodeType(type)}></LegendNode>
          {/* add weight here */}     
        </div>
      </div>
  )
}

export default Legend