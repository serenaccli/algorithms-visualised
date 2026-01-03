import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Shuffle, Edit2, Search } from 'lucide-react';





/*
- adding edges aren't considered when the algorithm runs - when edges are added and run is pl;ayed, just consider the edges to be part of the new graph.
- allow users to customise the data of the nodes
- for djikstra, allow weights to be added on the edges t obe modified during the algorithm.
- remove the circular, random, tree category options for 'searching'
- for dp grids, just simulate the most basic grid problem
- for segment tree, use a base segment tree and allow users to enter operations to see how the tree reacts. depth is 3
- for prefix sums and segment trees, just highlgiht the movement of updates
- insertion sort, quick sort and merge sort should be added. make sure that they're not just reskinned bubble sort.
*/ 

const styles = {
  container: {
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    color: 'white',
    padding: '0',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'auto',
    boxSizing: 'border-box'
  },
  maxWidth: {
    maxWidth: '100%',
    width: '100%',
    margin: '0',
    padding: '12px',
    boxSizing: 'border-box'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '4px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    textAlign: 'center',
    color: '#cbd5e1',
    marginBottom: '12px',
    fontSize: '14px'
  },
  card: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  flexRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  buttonLarge: {
    padding: '12px 24px',
    fontSize: '16px'
  },
  buttonIcon: {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    background: '#334155',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid transparent',
    outline: 'none',
    fontSize: '14px'
  },
  select: {
    background: '#334155',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid transparent',
    outline: 'none',
    fontSize: '14px',
    cursor: 'pointer'
  },
  label: {
    color: '#cbd5e1',
    fontSize: '14px',
    fontWeight: '500'
  },
  metric: {
    background: 'rgba(15, 23, 42, 0.5)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center'
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  metricLabel: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  barContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '8px',
    height: '320px',
    marginBottom: '16px'
  },
  bar: {
    flex: 1,
    minWidth: '50px',
    maxWidth: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  barValue: {
    width: '100%',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '8px',
    fontWeight: 'bold',
    color: '#0f172a',
    fontSize: '14px'
  },
  barIndex: {
    fontSize: '12px',
    color: '#94a3b8'
  },
  explanation: {
    background: 'rgba(51, 65, 85, 0.5)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#e2e8f0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px'
  },
  svgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    height: 'calc(100vh - 400px)',
    maxHeight: '80vh',
    width: '100%',
    position: 'relative'
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    width: '100%',
    overflow: 'auto',
    padding: '16px'
  },
  gridCell: {
    borderRadius: '4px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    border: '1px solid #475569'
  }
};

const AlgorithmExplorer = () => {
  const [category, setCategory] = useState('sorting');
  const [algorithm, setAlgorithm] = useState('bubble');
  const [data, setData] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [inputValue, setInputValue] = useState('64, 34, 25, 12, 22, 11, 90');
  const [searchTarget, setSearchTarget] = useState(25);
  const [showInput, setShowInput] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0 });
  const [graph, setGraph] = useState(null);
  const [gridSize, setGridSize] = useState(6);
  const [showGridInput, setShowGridInput] = useState(false);
  const [visualMode, setVisualMode] = useState('grid');
  const [pathfindingMode, setPathfindingMode] = useState('findGoal');
  const [goalNode, setGoalNode] = useState('last');
  const [graphLayout, setGraphLayout] = useState('tree');
  const [numNodes, setNumNodes] = useState(8);
  const [showGraphSettings, setShowGraphSettings] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [edgeCreationMode, setEdgeCreationMode] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const intervalRef = useRef(null);

  const handleNodeMouseDown = (e, nodeId) => {
    if (visualMode !== 'graph' || !graph?.isTree) return;
    
    if (edgeCreationMode) {
      if (!edgeStartNode) {
        setEdgeStartNode(nodeId);
        e.stopPropagation();
        return;
      } else if (edgeStartNode !== nodeId) {
        // Create edge
        const edgeExists = graph.edges.some(
          e => (e.from === edgeStartNode && e.to === nodeId) || 
               (e.from === nodeId && e.to === edgeStartNode)
        );
        
        if (!edgeExists) {
          setGraph(prev => ({
            ...prev,
            edges: [...prev.edges, {
              from: edgeStartNode,
              to: nodeId,
              weight: Math.floor(Math.random() * 5) + 1
            }]
          }));
        }
        setEdgeStartNode(null);
        setEdgeCreationMode(false);
        e.stopPropagation();
        return;
      }
    }
    
    const svg = e.currentTarget.ownerSVGElement;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const node = graph.nodes.find(n => n.id === nodeId);
    if (node) {
      setDragOffset({ x: svgP.x - node.x, y: svgP.y - node.y });
      setDraggedNode(nodeId);
    }
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!draggedNode || visualMode !== 'graph' || !graph?.isTree) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === draggedNode
          ? { ...node, x: svgP.x - dragOffset.x, y: svgP.y - dragOffset.y }
          : node
      )
    }));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const algorithms = {
    sorting: [
      { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
      { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
      { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' }
    ],
    search: [
      { id: 'linear', name: 'Linear Search', complexity: 'O(n)' },
      { id: 'binary', name: 'Binary Search', complexity: 'O(log n)' }
    ],
    pathfinding: [
      { id: 'bfs', name: 'BFS', complexity: 'O(V+E)' },
      { id: 'dfs', name: 'DFS', complexity: 'O(V+E)' },
      { id: 'dijkstra', name: 'Dijkstra', complexity: 'O((V+E)log V)' }
    ],
    datastructures: [
      { id: 'segmenttree', name: 'Segment Tree', complexity: 'O(log n)' },
      { id: 'dsu', name: 'Disjoint Set Union', complexity: 'O(α(n))' },
      { id: 'slidingwindow', name: 'Sliding Window', complexity: 'O(n)' },
      { id: 'prefixsums', name: 'Prefix Sums', complexity: 'O(n)' }
    ],
    dp: [
      { id: 'griddp', name: 'Grid DP', complexity: 'O(n*m)' },
      { id: 'knapsackdp', name: 'Knapsack DP', complexity: 'O(n*W)' },
      { id: 'dptrees', name: 'DP on Trees', complexity: 'O(n)' },
      { id: 'mosalgorithm', name: 'Mo\'s Algorithm', complexity: 'O((n + q)√n * F)' }
    ]
  };

  const generateTreeGraph = () => {
    const nodes = [];
    const edges = [];
    
    if (graphLayout === 'tree') {
      const levels = Math.ceil(Math.sqrt(numNodes));
      let nodeIndex = 0;
      
      for (let level = 0; level < levels && nodeIndex < numNodes; level++) {
        const nodesInLevel = Math.min(Math.pow(2, level), numNodes - nodeIndex);
        const levelWidth = 500;
        const startX = (600 - levelWidth) / 2;
        
        for (let i = 0; i < nodesInLevel && nodeIndex < numNodes; i++) {
          nodes.push({
            id: `node-${nodeIndex}`,
            x: startX + (levelWidth / (nodesInLevel + 1)) * (i + 1),
            y: 100 + level * 120,
            label: String.fromCharCode(65 + nodeIndex)
          });
          
          if (level > 0) {
            const parentIndex = Math.floor((nodeIndex - Math.pow(2, level) + Math.pow(2, level - 1)) / 2);
            if (parentIndex >= 0 && parentIndex < nodes.length - nodesInLevel) {
              edges.push({
                from: nodes[parentIndex].id,
                to: `node-${nodeIndex}`,
                weight: Math.floor(Math.random() * 5) + 1
              });
            }
          }
          nodeIndex++;
        }
      }
    } else if (graphLayout === 'circular') {
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2;
        const radius = 180;
        nodes.push({
          id: `node-${i}`,
          x: 300 + radius * Math.cos(angle),
          y: 300 + radius * Math.sin(angle),
          label: String.fromCharCode(65 + i)
        });
      }
      
      for (let i = 0; i < nodes.length; i++) {
        const connections = Math.min(2, numNodes - i - 1);
        for (let j = 1; j <= connections; j++) {
          const targetIdx = (i + j) % numNodes;
          edges.push({
            from: nodes[i].id,
            to: nodes[targetIdx].id,
            weight: Math.floor(Math.random() * 5) + 1
          });
        }
      }
    } else {
      for (let i = 0; i < numNodes; i++) {
        nodes.push({
          id: `node-${i}`,
          x: 100 + Math.random() * 400,
          y: 100 + Math.random() * 400,
          label: String.fromCharCode(65 + i)
        });
      }
      
      const connected = new Set();
      for (let i = 0; i < nodes.length; i++) {
        const numConnections = Math.floor(Math.random() * 2) + 1;
        let added = 0;
        
        for (let j = i + 1; j < nodes.length && added < numConnections; j++) {
          const edgeKey = `${i}-${j}`;
          if (!connected.has(edgeKey)) {
            edges.push({
              from: nodes[i].id,
              to: nodes[j].id,
              weight: Math.floor(Math.random() * 5) + 1
            });
            connected.add(edgeKey);
            added++;
          }
        }
      }
    }
    
    return { nodes, edges, isTree: true };
  };

  const generateGraph = () => {
    if (visualMode === 'graph') return generateTreeGraph();
    
    const nodes = [];
    const wallProbability = 0.25;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const isWall = (i !== 0 || j !== 0) && 
                       (i !== gridSize - 1 || j !== gridSize - 1) && 
                       Math.random() < wallProbability;
        
        if (!isWall) {
          nodes.push({ id: `${i}-${j}`, x: j, y: i, row: i, col: j });
        }
      }
    }
    
    const edges = [];
    nodes.forEach(node => {
      const neighbors = [
        { row: node.row - 1, col: node.col },
        { row: node.row + 1, col: node.col },
        { row: node.row, col: node.col - 1 },
        { row: node.row, col: node.col + 1 }
      ];
      
      neighbors.forEach(neighbor => {
        const neighborNode = nodes.find(n => n.row === neighbor.row && n.col === neighbor.col);
        if (neighborNode) {
          edges.push({
            from: node.id,
            to: neighborNode.id,
            weight: Math.floor(Math.random() * 5) + 1
          });
        }
      });
    });
    
    return { nodes, edges, gridSize };
  };

  const bfsAlgorithm = (graph) => {
    const steps = [];
    const start = graph.nodes[0];
    let goal = null;
    if (pathfindingMode === 'findGoal') {
      if (goalNode === 'last') {
        goal = graph.nodes[graph.nodes.length - 1];
      } else {
        goal = graph.nodes.find(n => n.label === goalNode) || graph.nodes.find(n => n.id === goalNode);
      }
    }
    const queue = [[start.id, 0]];
    const visited = new Set([start.id]);
    const parent = {};
    const depths = { [start.id]: 0 };
    let comparisons = 0;
    
    const startLabel = graph.isTree ? start.label : start.id;
    steps.push({
      visited: new Set([start.id]),
      current: start.id,
      queue: queue.map(item => item[0]),
      depths: { ...depths },
      explanation: `Starting BFS from ${startLabel}`,
      metrics: { comparisons, swaps: 0 }
    });
    
    while (queue.length > 0) {
      const [currentId, depth] = queue.shift();
      comparisons++;
      
      const currentLabel = graph.isTree ? graph.nodes.find(n => n.id === currentId)?.label : currentId;
      
      steps.push({
        visited: new Set(visited),
        current: currentId,
        queue: queue.map(item => item[0]),
        depths: { ...depths },
        explanation: `Visiting ${currentLabel} at depth ${depth}`,
        metrics: { comparisons, swaps: 0 }
      });
      
      if (goal && currentId === goal.id) {
        const path = [];
        let node = goal.id;
        while (node) {
          path.unshift(node);
          node = parent[node];
        }
        const goalLabel = graph.isTree ? goal.label : goal.id;
        steps.push({
          visited: new Set(visited),
          path,
          current: currentId,
          depths: { ...depths },
          explanation: `Found goal at ${goalLabel}!`,
          metrics: { comparisons, swaps: 0 }
        });
        return steps;
      }
      
      const neighbors = graph.edges.filter(e => e.from === currentId).map(e => e.to);
      
      neighbors.forEach(neighborId => {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push([neighborId, depth + 1]);
          parent[neighborId] = currentId;
          depths[neighborId] = depth + 1;
          
          const neighborLabel = graph.isTree ? graph.nodes.find(n => n.id === neighborId)?.label : neighborId;
          
          steps.push({
            visited: new Set(visited),
            current: currentId,
            exploring: neighborId,
            queue: queue.map(item => item[0]),
            depths: { ...depths },
            explanation: `Added ${neighborLabel} at depth ${depth + 1}`,
            metrics: { comparisons, swaps: 0 }
          });
        }
      });
    }
    
      steps.push({
        visited: new Set(visited),
        depths: { ...depths },
      explanation: pathfindingMode === 'traverseAll' ? `BFS complete! Visited ${visited.size} nodes` : 'Goal not reachable',
        metrics: { comparisons, swaps: 0 }
      });
    return steps;
  };

  const dfsAlgorithm = (graph) => {
    const steps = [];
    const start = graph.nodes[0];
    let goal = null;
    if (pathfindingMode === 'findGoal') {
      if (goalNode === 'last') {
        goal = graph.nodes[graph.nodes.length - 1];
      } else {
        goal = graph.nodes.find(n => n.label === goalNode) || graph.nodes.find(n => n.id === goalNode);
      }
    }
    const stack = [[start.id, 0]];
    const visited = new Set();
    const parent = {};
    const depths = {};
    let comparisons = 0;
    
      while (stack.length > 0) {
        const [currentId, depth] = stack.pop();
        
        if (visited.has(currentId)) continue;
        
        visited.add(currentId);
        depths[currentId] = depth;
        comparisons++;
        
        const currentLabel = graph.isTree ? graph.nodes.find(n => n.id === currentId)?.label : currentId;
        
        steps.push({
          visited: new Set(visited),
          current: currentId,
          stack: stack.map(item => item[0]),
          depths: { ...depths },
        explanation: `Visiting ${currentLabel} at depth ${depth}`,
          metrics: { comparisons, swaps: 0 }
        });
        
        if (goal && currentId === goal.id) {
          const path = [];
          let node = goal.id;
          while (node) {
            path.unshift(node);
            node = parent[node];
          }
          const goalLabel = graph.isTree ? goal.label : goal.id;
          steps.push({
            visited: new Set(visited),
            path,
            current: currentId,
            depths: { ...depths },
          explanation: `Found goal at ${goalLabel}!`,
            metrics: { comparisons, swaps: 0 }
          });
        return steps;
        }
        
      const neighbors = graph.edges.filter(e => e.from === currentId).map(e => e.to).reverse();
        
        neighbors.forEach(neighborId => {
          if (!visited.has(neighborId)) {
            stack.push([neighborId, depth + 1]);
            if (!parent[neighborId]) parent[neighborId] = currentId;
        }
      });
    }
            
            steps.push({
              visited: new Set(visited),
              depths: { ...depths },
      explanation: pathfindingMode === 'traverseAll' ? `DFS complete! Visited ${visited.size} nodes` : 'Goal not reachable',
              metrics: { comparisons, swaps: 0 }
            });
    return steps;
  };

  const dijkstraAlgorithm = (graph) => {
    const steps = [];
    const start = graph.nodes[0];
    let goal = null;
    if (pathfindingMode === 'findGoal') {
      if (goalNode === 'last') {
        goal = graph.nodes[graph.nodes.length - 1];
      } else {
        goal = graph.nodes.find(n => n.label === goalNode) || graph.nodes.find(n => n.id === goalNode);
      }
    }
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    const visited = new Set();
    let comparisons = 0;
    
    graph.nodes.forEach(node => {
      distances[node.id] = node.id === start.id ? 0 : Infinity;
      unvisited.add(node.id);
    });
    
    const startLabel = graph.isTree ? start.label : start.id;
    steps.push({
      visited: new Set(),
      current: start.id,
      distances: { ...distances },
      unvisited: new Set(unvisited),
      explanation: `Starting Dijkstra from ${startLabel}`,
      metrics: { comparisons, swaps: 0 }
    });
    
    while (unvisited.size > 0) {
      let minNode = null;
      let minDist = Infinity;
      
      unvisited.forEach(nodeId => {
        if (distances[nodeId] < minDist) {
          minDist = distances[nodeId];
          minNode = nodeId;
        }
      });
      
      if (minNode === null || minDist === Infinity) break;
      
      unvisited.delete(minNode);
      visited.add(minNode);
      comparisons++;
      
      const currentLabel = graph.isTree ? graph.nodes.find(n => n.id === minNode)?.label : minNode;
      
      steps.push({
        visited: new Set(visited),
        current: minNode,
        distances: { ...distances },
        unvisited: new Set(unvisited),
        explanation: `Visiting ${currentLabel} (dist: ${distances[minNode]})`,
        metrics: { comparisons, swaps: 0 }
      });
      
      if (goal && minNode === goal.id) {
        const path = [];
        let node = goal.id;
        while (node) {
          path.unshift(node);
          node = previous[node];
        }
        const goalLabel = graph.isTree ? goal.label : goal.id;
        steps.push({
          visited: new Set(visited),
          path,
          current: minNode,
          distances: { ...distances },
          explanation: `Shortest path to ${goalLabel}: ${distances[goal.id]}!`,
          metrics: { comparisons, swaps: 0 }
        });
        return steps;
      }
      
      const neighbors = graph.edges.filter(e => e.from === minNode);
      
      neighbors.forEach(edge => {
        const neighborId = edge.to;
        if (visited.has(neighborId)) return;
        
        const newDist = distances[minNode] + edge.weight;
        
        if (newDist < distances[neighborId]) {
          distances[neighborId] = newDist;
          previous[neighborId] = minNode;
          
          const neighborLabel = graph.isTree ? graph.nodes.find(n => n.id === neighborId)?.label : neighborId;
          
        steps.push({
          visited: new Set(visited),
            current: minNode,
            exploring: neighborId,
            distances: { ...distances },
            unvisited: new Set(unvisited),
            explanation: `Updated ${neighborLabel}: ${newDist}`,
          metrics: { comparisons, swaps: 0 }
        });
      }
      });
    }
    
    return steps;
  };

  const bubbleSort = (arr) => {
    const steps = [];
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          explanation: `Comparing ${array[j]} and ${array[j + 1]}`,
          metrics: { comparisons, swaps }
        });
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          steps.push({
            array: [...array],
            swapping: [j, j + 1],
            explanation: `Swapped ${array[j + 1]} and ${array[j]}`,
            metrics: { comparisons, swaps }
          });
        }
      }
    }
    return steps;
  };

  const selectionSort = (arr) => {
    const steps = [];
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < array.length; j++) {
        comparisons++;
        steps.push({
          array: [...array],
          comparing: [minIdx, j],
          explanation: `Finding minimum: ${array[minIdx]} vs ${array[j]}`,
          metrics: { comparisons, swaps }
        });
        
        if (array[j] < array[minIdx]) minIdx = j;
      }
      
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        swaps++;
        steps.push({
          array: [...array],
          swapping: [i, minIdx],
          explanation: `Swapped to position ${i}`,
          metrics: { comparisons, swaps }
        });
      }
    }
    return steps;
  };

  const insertionSort = (arr) => {
    const steps = [];
    const array = [...arr];
    let comparisons = 0, swaps = 0;
    
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      
      steps.push({
        array: [...array],
        comparing: [i],
        explanation: `Inserting ${key}`,
        metrics: { comparisons, swaps }
      });
      
      while (j >= 0 && array[j] > key) {
        comparisons++;
        array[j + 1] = array[j];
        swaps++;
        steps.push({
          array: [...array],
          swapping: [j, j + 1],
          explanation: `Moving ${array[j]} right`,
          metrics: { comparisons, swaps }
        });
        j--;
      }
      
      array[j + 1] = key;
    }
    return steps;
  };



  const linearSearch = (arr, target) => {
    const steps = [];
    let comparisons = 0;
    
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [i],
        explanation: `Checking ${arr[i]} === ${target}?`,
        metrics: { comparisons, swaps: 0 }
      });
      
      if (arr[i] === target) {
        steps.push({
          array: [...arr],
          found: [i],
          explanation: `Found ${target} at index ${i}!`,
          metrics: { comparisons, swaps: 0 }
        });
        return steps;
      }
    }
    
    steps.push({
      array: [...arr],
      explanation: `${target} not found`,
      metrics: { comparisons, swaps: 0 }
    });
    return steps;
  };

  const binarySearch = (arr, target) => {
    const steps = [];
    const sortedArr = [...arr].sort((a, b) => a - b);
    let left = 0, right = sortedArr.length - 1;
    let comparisons = 0;
    
    steps.push({
      array: [...sortedArr],
      range: [left, right],
      explanation: `Searching for ${target}`,
      metrics: { comparisons, swaps: 0 }
    });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
      
      steps.push({
        array: [...sortedArr],
        comparing: [mid],
        range: [left, right],
        explanation: `Checking middle: ${sortedArr[mid]}`,
        metrics: { comparisons, swaps: 0 }
      });
      
      if (sortedArr[mid] === target) {
        steps.push({
          array: [...sortedArr],
          found: [mid],
          explanation: `Found ${target}!`,
          metrics: { comparisons, swaps: 0 }
        });
        return steps;
      }
      
      if (sortedArr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    steps.push({
      array: [...sortedArr],
      explanation: `${target} not found`,
      metrics: { comparisons, swaps: 0 }
    });
    return steps;
  };

  const runAlgorithm = () => {
    let newSteps = [];

    if (category === 'sorting') {
      if (algorithm === 'bubble') newSteps = bubbleSort(data);
      else if (algorithm === 'selection') newSteps = selectionSort(data);
      else if (algorithm === 'insertion') newSteps = insertionSort(data);
    } else if (category === 'search') {
      if (algorithm === 'linear') newSteps = linearSearch(data, searchTarget);
      else if (algorithm === 'binary') newSteps = binarySearch(data, searchTarget);
    } else if (category === 'pathfinding') {
      const newGraph = generateGraph();
      setGraph(newGraph);
      if (algorithm === 'bfs') newSteps = bfsAlgorithm(newGraph);
      else if (algorithm === 'dfs') newSteps = dfsAlgorithm(newGraph);
      else if (algorithm === 'dijkstra') newSteps = dijkstraAlgorithm(newGraph);
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (category === 'pathfinding' || steps.length === 0) runAlgorithm();
  }, [algorithm, category, visualMode, pathfindingMode, goalNode, graphLayout, numNodes]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => setCurrentStep(prev => prev + 1), speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(intervalRef.current);
  }, [isPlaying, currentStep, speed, steps.length]);

  useEffect(() => {
    if (steps[currentStep]?.metrics) setMetrics(steps[currentStep].metrics);
  }, [currentStep, steps]);

  const currentState = steps[currentStep] || { array: data, explanation: 'Click Play to start' };

const maxValue = Math.max(...(currentState.array || data));

const handleInputChange = () => {
  try {
    const newData = inputValue.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (newData.length > 0) {
      setData(newData);
      setSteps([]);
      setCurrentStep(0);
      setShowInput(false);
    }
  } catch (e) {
    console.error('Invalid input');
    }
  };

const renderVisualization = () => {
    if (category === 'pathfinding') {
    if (!graph) return null;
    
    if (visualMode === 'grid') {
      return (
        <div style={styles.gridContainer}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, minmax(40px, 1fr))`,
            gap: '4px',
            maxWidth: '100%',
            width: 'fit-content'
          }}>
            {Array.from({ length: gridSize }).map((_, row) =>
              Array.from({ length: gridSize }).map((_, col) => {
                const nodeId = `${row}-${col}`;
                const node = graph.nodes.find(n => n.id === nodeId);
                const isWall = !node;
                const isStart = node && node.id === graph.nodes[0]?.id;
                const isGoal = node && node.id === graph.nodes[graph.nodes.length - 1]?.id;
                const isVisited = currentState.visited?.has(nodeId);
                const isCurrent = currentState.current === nodeId;
                const isExploring = currentState.exploring === nodeId;
                const isInPath = currentState.path?.includes(nodeId);
                const isInQueue = currentState.queue?.includes(nodeId);
                const isInStack = currentState.stack?.includes(nodeId);
                const depth = currentState.depths?.[nodeId];
                
                let bgColor = isWall ? '#1e293b' : '#334155';
                if (isStart) bgColor = '#10b981';
                else if (isGoal) bgColor = '#ef4444';
                else if (isInPath) bgColor = '#fbbf24';
                else if (isCurrent) bgColor = '#8b5cf6';
                else if (isExploring) bgColor = '#ec4899';
                else if (isInQueue || isInStack) bgColor = '#06b6d4';
                else if (isVisited) bgColor = '#475569';

  return (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      ...styles.gridCell,
                      backgroundColor: bgColor,
                      aspectRatio: '1',
                      minWidth: '40px',
                      minHeight: '40px',
                      fontSize: gridSize <= 8 ? '12px' : '10px',
                      color: 'white'
                    }}
                  >
                    {depth !== undefined && depth}
          </div>
                );
              })
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div style={styles.svgContainer}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 600 600"
            style={{ background: 'rgba(15, 23, 42, 0.3)', borderRadius: '12px', height: '100%', width: '100%' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => {
              if (edgeCreationMode && e.target.tagName === 'svg') {
                setEdgeStartNode(null);
                setEdgeCreationMode(false);
              }
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#475569" />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="12"
                markerHeight="12"
                refX="11"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#fbbf24" />
              </marker>
            </defs>
                  {graph.edges.map((edge, idx) => {
                    const fromNode = graph.nodes.find(n => n.id === edge.from);
                    const toNode = graph.nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    
              const isInPath = currentState.path?.includes(edge.from) && currentState.path?.includes(edge.to) &&
                              Math.abs(currentState.path.indexOf(edge.from) - currentState.path.indexOf(edge.to)) === 1;
              
              // Check if this edge is being traversed (current node to exploring node)
              const isBeingTraversed = currentState.current === edge.from && currentState.exploring === edge.to;
                    
                    return (
                      <g key={idx}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                    stroke={isInPath ? '#fbbf24' : isBeingTraversed ? '#8b5cf6' : '#475569'}
                    strokeWidth={isInPath ? 4 : isBeingTraversed ? 3 : 2}
                    markerEnd={isInPath ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                    className={isBeingTraversed ? "edge-animated" : ""}
                    style={{
                      transition: 'all 0.3s ease',
                      strokeDasharray: isBeingTraversed ? '5,5' : 'none',
                      animation: isBeingTraversed ? 'edgePulse 1s ease-in-out infinite' : 'none'
                    }}
                  />
                  {algorithm === 'dijkstra' && (
                    <text
                      x={(fromNode.x + toNode.x) / 2}
                      y={(fromNode.y + toNode.y) / 2}
                      fill="#94a3b8"
                      fontSize="12"
                      textAnchor="middle"
                      style={{ pointerEvents: 'none' }}
                    >
                      {edge.weight}
                    </text>
                        )}
                      </g>
                    );
                  })}
                  
            {graph.nodes.map((node) => {
              const isStart = node.id === graph.nodes[0]?.id;
              const goalNodeObj = goalNode === 'last' ? graph.nodes[graph.nodes.length - 1] : graph.nodes.find(n => n.label === goalNode) || graph.nodes.find(n => n.id === goalNode);
              const isGoal = node.id === goalNodeObj?.id;
              const isVisited = currentState.visited?.has(node.id);
              const isCurrent = currentState.current === node.id;
              const isExploring = currentState.exploring === node.id;
              const isInPath = currentState.path?.includes(node.id);
              const distance = currentState.distances?.[node.id];

              let fillColor = '#334155';
              if (isStart) fillColor = '#10b981';
              else if (isGoal) fillColor = '#ef4444';
              else if (isInPath) fillColor = '#fbbf24';
              else if (isCurrent) fillColor = '#8b5cf6';
              else if (isExploring) fillColor = '#ec4899';
              else if (isVisited) fillColor = '#475569';
              
              const isSelectedForEdge = edgeCreationMode && edgeStartNode === node.id;
              const strokeColor = isSelectedForEdge ? '#fbbf24' : '#1e293b';
              const strokeWidth = isSelectedForEdge ? 4 : 2;
                    
                    return (
                <g key={node.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                    r={20}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    style={{ 
                      cursor: edgeCreationMode ? 'crosshair' : (graph.isTree ? 'move' : 'default'),
                      transition: draggedNode === node.id ? 'none' : 'all 0.2s ease',
                      filter: isSelectedForEdge ? 'drop-shadow(0 0 8px #fbbf24)' : 'none'
                    }}
                        />
                        <text
                          x={node.x}
                    y={node.y + 5}
                          fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {node.label}
                        </text>
                  {distance !== undefined && distance !== Infinity && (
                          <text
                            x={node.x}
                      y={node.y - 30}
                      fill="#60a5fa"
                      fontSize="12"
                            textAnchor="middle"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                          >
                      {distance}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
      );
    }
  } else {
    return (
      <div style={styles.barContainer}>
        {(currentState.array || data).map((value, idx) => {
          const isComparing = currentState.comparing?.includes(idx);
          const isSwapping = currentState.swapping?.includes(idx);
          const isFound = currentState.found?.includes(idx);
          const isInRange = currentState.range && idx >= currentState.range[0] && idx <= currentState.range[1];
          
          let color = '#60a5fa';
          if (isFound) color = '#10b981';
          else if (isSwapping) color = '#ef4444';
          else if (isComparing) color = '#fbbf24';
          else if (category === 'search' && !isInRange && currentState.range) color = '#334155';
                    
                    return (
            <div key={idx} style={styles.bar}>
              <div
                style={{
                  ...styles.barValue,
                  height: `${(value / maxValue) * 280}px`,
                  backgroundColor: color
                }}
              >
                {value}
              </div>
              <div style={styles.barIndex}>{idx}</div>
                      </div>
                    );
                  })}
                </div>
    );
  }
};
                
                return (
  <div style={styles.container}>
    <div style={styles.maxWidth}>
      <h1 style={styles.title}>Algorithm Visualizer</h1>
      <p style={styles.subtitle}>Explore sorting, searching, pathfinding, data structures, and dynamic programming algorithms</p>
      
      <div style={styles.card}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setAlgorithm(algorithms[e.target.value][0].id);
              setSteps([]);
              setCurrentStep(0);
            }}
            style={styles.select}
          >
            <option value="sorting">Sorting</option>
            <option value="search">Searching</option>
            <option value="pathfinding">Pathfinding</option>
            <option value="datastructures">Data Structures</option>
            <option value="dp">Dynamic Programming</option>
          </select>
          
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            style={styles.select}
          >
            {algorithms[category].map(algo => (
              <option key={algo.id} value={algo.id}>
                {algo.name} - {algo.complexity}
              </option>
            ))}
          </select>
          
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={styles.select}
          >
            <option value={1000}>0.5x</option>
            <option value={500}>1x</option>
            <option value={250}>2x</option>
            <option value={100}>5x</option>
          </select>
        </div>

        {category === 'pathfinding' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <select
              value={visualMode}
              onChange={(e) => setVisualMode(e.target.value)}
              style={styles.select}
            >
              <option value="grid">Grid View</option>
              <option value="graph">Graph View</option>
            </select>

            <select
              value={pathfindingMode}
              onChange={(e) => setPathfindingMode(e.target.value)}
              style={styles.select}
            >
              <option value="findGoal">Find Goal</option>
              <option value="traverseAll">Traverse All</option>
            </select>

            {pathfindingMode === 'findGoal' && visualMode === 'graph' && (
              <select
                value={goalNode}
                onChange={(e) => setGoalNode(e.target.value)}
                style={styles.select}
              >
                <option value="last">Last Node</option>
                {Array.from({ length: numNodes }, (_, i) => (
                  <option key={i} value={String.fromCharCode(65 + i)}>
                    Node {String.fromCharCode(65 + i)}
                  </option>
                ))}
              </select>
            )}
            
            {visualMode === 'grid' ? (
                <button
                onClick={() => setShowGridInput(!showGridInput)}
                style={{
                  ...styles.button,
                  background: '#475569',
                  color: 'white'
                }}
              >
                <Edit2 size={16} /> Grid Size
                </button>
            ) : (
              <>
                <button
                  onClick={() => setShowGraphSettings(!showGraphSettings)}
                  style={{
                    ...styles.button,
                    background: '#475569',
                    color: 'white'
                  }}
                >
                  <Edit2 size={16} /> Graph Settings
                </button>
                <button
                  onClick={() => {
                    setEdgeCreationMode(!edgeCreationMode);
                    setEdgeStartNode(null);
                  }}
                  style={{
                    ...styles.button,
                    background: edgeCreationMode ? '#10b981' : '#8b5cf6',
                    color: 'white'
                  }}
                >
                  {edgeCreationMode ? '✓' : ''} Add Edges
                </button>
              </>
            )}
              </div>
        )}
        
        {showGridInput && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <input
              type="number"
                        value={gridSize}
              onChange={(e) => setGridSize(Math.max(3, Math.min(10, parseInt(e.target.value) || 6)))}
              style={styles.input}
              placeholder="Grid size (3-10)"
                      />
                      <button
              onClick={() => {
                setShowGridInput(false);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#10b981',
                color: 'white'
              }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
        
        {showGraphSettings && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <select
                        value={graphLayout}
                        onChange={(e) => setGraphLayout(e.target.value)}
              style={styles.select}
                      >
                        <option value="tree">Tree</option>
                        <option value="circular">Circular</option>
                        <option value="random">Random</option>
                      </select>
                      <input
              type="number"
                        value={numNodes}
              onChange={(e) => setNumNodes(Math.max(4, Math.min(15, parseInt(e.target.value) || 8)))}
              style={styles.input}
              placeholder="Nodes (4-15)"
                      />
                      <button
              onClick={() => setShowGraphSettings(false)}
              style={{
                ...styles.button,
                background: '#10b981',
                color: 'white'
              }}
                      >
                        Apply
                      </button>
          </div>
        )}

        {category !== 'pathfinding' && (
          <>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button
                onClick={() => setShowInput(!showInput)}
                style={{
                  ...styles.button,
                  background: '#475569',
                  color: 'white'
                }}
              >
                <Edit2 size={16} /> Edit Data
                </button>
              
              {category === 'search' && (
                <button
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  style={{
                    ...styles.button,
                    background: '#475569',
                    color: 'white'
                  }}
                >
                  <Search size={16} /> Target: {searchTarget}
                </button>
              )}
              
                <button
                onClick={() => {
                  const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
                  setData(newData);
                  setInputValue(newData.join(', '));
                  setSteps([]);
                  setCurrentStep(0);
                }}
                style={{
                  ...styles.button,
                  background: '#475569',
                  color: 'white'
                }}
              >
                <Shuffle size={16} /> Random
                </button>
              </div>
            
            {showInput && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={styles.input}
                  placeholder="Enter numbers separated by commas"
                />
                <button
                  onClick={handleInputChange}
                  style={{
                    ...styles.button,
                    background: '#10b981',
                    color: 'white'
                  }}
                >
                  Apply
                </button>
              </div>
            )}
            
            {showSearchInput && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="number"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
                  style={styles.input}
                  placeholder="Target value"
                />
                <button
                  onClick={() => setShowSearchInput(false)}
                  style={{
                    ...styles.button,
                    background: '#10b981',
                    color: 'white'
                  }}
                >
                  Apply
                </button>
              </div>
            )}
          </>
        )}

        <div style={styles.flexRow}>
          {category !== 'pathfinding' && (
            <button
              onClick={runAlgorithm}
              style={{
                ...styles.button,
                background: '#10b981',
                color: 'white'
              }}
            >
              Run Algorithm
            </button>
          )}
          
            <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={steps.length === 0}
            style={{
              ...styles.button,
              ...styles.buttonLarge,
              background: steps.length === 0 ? '#334155' : '#8b5cf6',
              color: 'white',
              cursor: steps.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
            </button>
          
            <button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            disabled={steps.length === 0}
            style={{
              ...styles.buttonIcon,
              background: steps.length === 0 ? '#334155' : '#475569',
              color: 'white',
              cursor: steps.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <RotateCcw size={20} />
            </button>
          
              <button
            onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
            disabled={steps.length === 0 || currentStep >= steps.length - 1}
            style={{
              ...styles.buttonIcon,
              background: steps.length === 0 || currentStep >= steps.length - 1 ? '#334155' : '#475569',
              color: 'white',
              cursor: steps.length === 0 || currentStep >= steps.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <SkipForward size={20} />
              </button>
          </div>
          
        <div style={{ marginTop: '16px', color: '#94a3b8', fontSize: '14px', textAlign: 'center' }}>
          Step {currentStep + 1} of {steps.length || 1}
          </div>
        </div>

      <div style={styles.card}>
        <div style={styles.grid}>
          <div style={styles.metric}>
            <div style={styles.metricValue}>{metrics.comparisons}</div>
            <div style={styles.metricLabel}>Comparisons</div>
                </div>
          <div style={styles.metric}>
            <div style={styles.metricValue}>{metrics.swaps}</div>
            <div style={styles.metricLabel}>Swaps</div>
                </div>
          <div style={styles.metric}>
            <div style={styles.metricValue}>
              {algorithms[category].find(a => a.id === algorithm)?.complexity}
                </div>
            <div style={styles.metricLabel}>Complexity</div>
                </div>
                </div>
                </div>
      
      <div style={styles.card}>
        {renderVisualization()}
                </div>
      
      <div style={styles.card}>
        <div style={styles.explanation}>
          {currentState.explanation}
                </div>
                </div>
      
        {category === 'pathfinding' && (
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#10b981' }} />
                <span>Start</span>
                </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#ef4444' }} />
                <span>Goal</span>
                </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#8b5cf6' }} />
                <span>Current</span>
                </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#ec4899' }} />
                <span>Exploring</span>
                </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#475569' }} />
                <span>Visited</span>
          </div>
              <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#fbbf24' }} />
                <span>Path</span>
        </div>
            </div>
            {edgeCreationMode && visualMode === 'graph' && (
              <div style={{ 
                marginTop: '12px', 
                padding: '8px', 
                background: 'rgba(139, 92, 246, 0.2)', 
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#cbd5e1'
              }}>
                {edgeStartNode 
                  ? `Click another node to create an edge from ${graph?.nodes.find(n => n.id === edgeStartNode)?.label || edgeStartNode}`
                  : 'Click a node to start creating an edge, then click another node to connect them'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmExplorer;
