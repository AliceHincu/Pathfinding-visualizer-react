import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './item-carousel.css';
import mazeDivisionImg from './images/maze-division.png';
import mazeRandomImg from './images/maze-random.png';
import bfsImg from './images/bfs.png';
import dfsImg from './images/dfs.png';
import astarImg from './images/astar.png';
import greedyImg from './images/greedy.png';

const IntroductiveCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex(selectedIndex);
    };
    
    return(
        <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Welcome to Pathfinding Visualizer!</h2>
                <br></br>
                <p>This short tutorial will walk you through all of the features of this application.</p>
                <p>At its core, a pathfinding algorithm seeks to find the <b>shortest path between two points</b>. This application visualizes various pathfinding algorithms in action, and more!</p>
                <p>All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.</p>        
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>How to use?</h2>
                <br></br>
                <p>Click and drag the <b>start</b> and <b>target</b> nodes to move them.</p>
                <p>Click on the  <b>wall</b> and  <b>unvisited</b> types from the legend to change the type of node from the board</p>
                <p>Use the navbar options to <b>select and visualize algorithms</b> and to do other stuff! You can <b>generate a maze</b>, clear the current <b>path</b>, clear the entire <b>board</b>, all from the navbar.</p>        
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Recursive Division Maze</h2>
                <br></br>
                <img src={mazeDivisionImg} style={{width: 'inherit'}}></img>
                <br></br><br></br>
                <p>Generate a maze by dividing the grid into 2 and applying the algorithm recursively.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Random Maze</h2>
                <br></br>
                <img src={mazeRandomImg} style={{width: 'inherit'}}></img>
                <br></br><br></br>
                <p>Generate a maze by randomly deciding if the node should be a wall or not.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Breadth First Search</h2>
                <br></br>
                <img src={bfsImg} style={{width: 'inherit'}}></img>
                <br></br><br></br>
                <p>Expands the shallowest unvisited nodes. BFS guarantees the shortest path to the goal.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Depth First Search</h2>
                <br></br>
                <img src={dfsImg} style={{width: 'inherit'}}></img>
                <br></br><br></br>
                <p>Expands the deepest unvisited nodes. DFS does not guarantee the shortest path to the goal.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>A * Search</h2>
                <br></br>
                <img src={astarImg} style={{width: 'inherit'}}></img>
                <p>Expands unvisited nodes with the lowest estimated cost of the cheapest path from the start to the goal through the node. A* guarantees the shortest path to the goal.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div style={{width: '75%', margin: 'auto', textAlign: 'center', height: '100%'}}>
                <h2>Greedy Best First Search</h2>
                <br></br>
                <img src={greedyImg} style={{width: 'inherit'}}></img>
                <br></br><br></br>
                <p>Expands unvisited nodes that are estimated to be closest to the goal. Greedy Search does not guarantee the shortest path to the goal.</p>
                <br></br>
                <br></br>
            </div>
        </Carousel.Item>
        </Carousel>
    )
}

export default IntroductiveCarousel;