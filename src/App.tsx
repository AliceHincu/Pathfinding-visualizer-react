import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Board from './components/board/Board';
import Legend from './components/legend/Legend';
import { isMousePressed, selectStart, selectTarget, startIsDragged, targetIsDragged } from './redux-features/boardSlice';
import { useAppDispatch } from './redux-features/hooks';

function App() {
  // moved logic for onMouseUp here because i had problems firing onMouseUp event because of the animation of the node...
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("mouseup", function() {
      dispatch(isMousePressed(false))
      dispatch(startIsDragged(false))
      dispatch(targetIsDragged(false))
    });
  }, []);

  return (
    <div className="App">
      <Legend></Legend>
      <Board></Board>
    </div>
  );
}

export default App;
