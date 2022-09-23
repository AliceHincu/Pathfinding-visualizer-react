import './App.css';
import Board from './components/board/Board';
import Node from './components/board/Node';
import Legend from './components/legend/Legend';

function App() {
  return (
    <div className="App">
      <Legend></Legend>
      <Board></Board>
      {/* <Node 
        row={1} 
        col={2}/> */}
    </div>
  );
}

export default App;
