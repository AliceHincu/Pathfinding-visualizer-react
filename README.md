![readmeheader](https://user-images.githubusercontent.com/53339016/193127602-26864967-c964-455e-b296-154b151ef5e0.png)
# Pathfinding Visualizer: About the Project
An interactive web application that helps users visualize search algorithms in a grid environment. Creted with **React** and used **typescript, redux and hooks**

Here you can find the [LIVE DEMO](https://alicehincu.github.io/Pathfinding-visualizer-react/) if you want to experiment for youself 

# DEMO
https://user-images.githubusercontent.com/53339016/193127155-1ad9eadd-a2df-4baf-a92c-7baec66887f9.mp4

# Motivation: Why Web Application and Why Visualize Algorithms?
* This project is an outlet for me to apply the web development knowledge I have learned during my current internship, and more importantly to gain experience in using the React and its libaries.
* I have a personal interest in learning and understanding how different algorithms work since highschool, since they tend to help resolving real world problems with an efficient time complexity if used correctly.

# Aim
To provide a platform that:
* runs and visualize search algorithms,
* highlights the differences between the search algorithms, and
* make learning about search algorithms more engaging through interactive elements.

# About algorithms
### Breadth First Search (BFS) 
It is an uninformed search algorithm for traversing or searching tree/graph data structures or grids. It explores all the nodes at the present depth before moving on to the nodes at the next depth level. Uses a queue. This algorithm guarantees the shortest path between two nodes in a graph by exporting all neighbor nodes at the present depth prior to moving on to the next depth level of nodes. It does so using a queue as its data structure. Note that this algorithm is unweighted.

### Depth First Search (DFS)
It is an uninformed search algorithm for traversing or searching tree or graph data structures which uses the idea of backtracking. It explores all the nodes by going forward if possible or uses backtracking. Uses a stack. This algorithm does not guarantee a shortest path and is a terrible algorithm for pathfinding. DFS explores as far as possible along each "branch" before backtracking. While it does guarantee a path to the end node, it is almost always not the shortest path.

### A* Search
It is an informed search searching algorithm that searches for the shortest path between the initial and the final state. A* algorithm has 3 parameters:
* g : the cost of moving from the initial cell to the current cell. Basically, it is the sum of all the cells that have been visited since leaving the first cell.
* h : also known as the heuristic value, it is the estimated cost of moving from the current cell to the final cell. The actual cost cannot be calculated until the final cell is reached. Hence, h is the estimated cost. We must make sure that there is never an over estimation of the cost.
* f : it is the sum of g and h. So, f = g + h

The way that the algorithm makes its decisions is by taking the f-value into account. The algorithm selects the smallest f-valued cell and moves to that cell. This process continues until the algorithm reaches its goal cell.

### Greedy Best First Search
A greedy algorithm is an informed search searching algorithm, an approach used to solve a problem by building an optimal solution. It chooses the optimal local solution hoping to make globally optimal results. The selection of locally available options may not lead to an optimal global solution. It uses a top-down approach to make decisions, which means earlier decisions can't be reconsidered. Greedy BFS algorithm has 1 parameter:
* f : f = h, where h is the heuristic function (in this case the euclidian distance)

# Maze generation
### Recursive Subdivision
This algorithm picks a random pivot point, creates a wall at the pivot with a random passages along it, and then recursively calls the algorithm on the subdivided regions. Because entire cells (Instead of the outline of the cells) were used as walls, walls are restricted to having even-numbered indices and passages are restricted to odd-numbered indices.

### Random
This algorithm generates a random number for every node, and if that number is smaller then a given constant random number defined before (= percentage chance to generate a wall) then it transform the current node in a wall.
