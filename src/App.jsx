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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
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
  const [editingNode, setEditingNode] = useState(null);
  const [editingEdge, setEditingEdge] = useState(null);
  const [edgeWeightInput, setEdgeWeightInput] = useState('');
  const [nodeLabelInput, setNodeLabelInput] = useState('');
  const [segmentTreeOps, setSegmentTreeOps] = useState('');
  const [showSegmentTreeInput, setShowSegmentTreeInput] = useState(false);
  const [segmentTreeBaseArray, setSegmentTreeBaseArray] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
  const [prefixInputValue, setPrefixInputValue] = useState('2, 3, 1, 5, 4, 6');
  // DP Grid state
  const [dpGridRows, setDpGridRows] = useState(4);
  const [dpGridCols, setDpGridCols] = useState(4);
  const [dpGridValues, setDpGridValues] = useState([]);
  const [dpPreset, setDpPreset] = useState('gridpaths');
  const [showDpGridInput, setShowDpGridInput] = useState(false);
  const [editingGridCell, setEditingGridCell] = useState(null);
  const [gridCellValueInput, setGridCellValueInput] = useState('');
  const [knapsackWeights, setKnapsackWeights] = useState([2, 3, 4]);
  const [knapsackValues, setKnapsackValues] = useState([10, 20, 30]);
  const [knapsackCapacity, setKnapsackCapacity] = useState(5);
  const [showKnapsackInput, setShowKnapsackInput] = useState(false);
  // Prefix Sums state
  const [prefixArray, setPrefixArray] = useState([2, 3, 1, 5, 4, 6]);
  const [rangeQueryL, setRangeQueryL] = useState(1);
  const [rangeQueryR, setRangeQueryR] = useState(4);
  const [showRangeQuery, setShowRangeQuery] = useState(false);
  // Sliding Window state
  const [slidingWindowArray, setSlidingWindowArray] = useState([1, 3, -1, -3, 5, 3, 6, 7]);
  const [slidingWindowInputValue, setSlidingWindowInputValue] = useState('1, 3, -1, -3, 5, 3, 6, 7');
  const [windowSize, setWindowSize] = useState(3);
  const [windowPreset, setWindowPreset] = useState('maxsubarray');
  const [showWindowInput, setShowWindowInput] = useState(false);
  const intervalRef = useRef(null);

  const handleNodeMouseDown = (e, nodeId) => {
    if (visualMode !== 'graph' || !graph?.isTree) return;
    
    if (e.detail === 2) { // Double click
      const node = graph.nodes.find(n => n.id === nodeId);
      if (node) {
        setEditingNode(nodeId);
        setNodeLabelInput(node.label);
      }
        e.stopPropagation();
        return;
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
      { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
      { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
      { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' }
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
      { id: 'dsu', name: 'DSU (Union-Find)', complexity: 'O(α(n))' },
      { id: 'slidingwindow', name: 'Sliding Window', complexity: 'O(n)' },
      { id: 'prefixsums', name: 'Prefix Sums', complexity: 'O(n)' }
    ],
    dp: [
      { id: 'griddp', name: 'Grid DP', complexity: 'O(n*m)' },
      { id: 'knapsackdp', name: 'Knapsack DP', complexity: 'O(n*W)' }
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
      
      // Get neighbors from edges (check both directions to include manually added edges)
      const neighbors = graph.edges
        .filter(e => e.from === currentId || e.to === currentId)
        .map(e => e.from === currentId ? e.to : e.from);
      
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
        
      // Get neighbors from edges (check both directions to include manually added edges)
      const neighbors = graph.edges
        .filter(e => e.from === currentId || e.to === currentId)
        .map(e => e.from === currentId ? e.to : e.from)
        .reverse();
        
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
      
      // Get neighbors from edges (check both directions to include manually added edges)
      const neighbors = graph.edges.filter(e => e.from === minNode || e.to === minNode);
      
      neighbors.forEach(edge => {
        const neighborId = edge.from === minNode ? edge.to : edge.from;
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

  const quickSort = (arr) => {
    const steps = [];
    const array = [...arr];
    let comparisons = 0, swaps = 0;

    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({
          array: [...array],
          comparing: [j, high],
          pivot: high,
          partition: [low, high],
          explanation: `Comparing ${arr[j]} with pivot ${pivot}`,
          metrics: { comparisons, swaps }
        });

        if (arr[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          swaps++;
          steps.push({
            array: [...array],
            swapping: [i, j],
            pivot: high,
            partition: [low, high],
            explanation: `Swapped ${array[j]} and ${array[i]}`,
            metrics: { comparisons, swaps }
          });
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      swaps++;
      steps.push({
        array: [...array],
        swapping: [i + 1, high],
        pivot: i + 1,
        partition: [low, high],
        explanation: `Placed pivot ${pivot} at position ${i + 1}`,
        metrics: { comparisons, swaps }
      });

      return i + 1;
    };

    const quicksort = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
      }
    };

    quicksort(array, 0, array.length - 1);
    return steps;
  };

  const mergeSort = (arr) => {
    const steps = [];
    const array = [...arr];
    let comparisons = 0, swaps = 0;

    const merge = (arr, left, mid, right) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = [];
      const R = [];

      for (let i = 0; i < n1; i++) L.push(array[left + i]);
      for (let j = 0; j < n2; j++) R.push(array[mid + 1 + j]);

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        comparisons++;
        steps.push({
          array: [...array],
          comparing: [left + i, mid + 1 + j],
          merging: [left, right],
          explanation: `Merging: comparing ${L[i]} and ${R[j]}`,
          metrics: { comparisons, swaps }
        });

        if (L[i] <= R[j]) {
          array[k] = L[i];
          i++;
        } else {
          array[k] = R[j];
          j++;
        }
        swaps++;
        k++;
      }

      while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
        swaps++;
      }

      while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
        swaps++;
      }

      steps.push({
        array: [...array],
        merging: [left, right],
        explanation: `Merged subarray from ${left} to ${right}`,
        metrics: { comparisons, swaps }
      });
    };

    const mergesort = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergesort(arr, left, mid);
        mergesort(arr, mid + 1, right);
        merge(arr, left, mid, right);
      }
    };

    mergesort(array, 0, array.length - 1);
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

  const gridDPAlgorithm = () => {
    const steps = [];
    const n = dpGridRows;
    const m = dpGridCols;
    
    // Initialize grid based on preset or custom values
    let grid;
    if (dpGridValues.length === n && dpGridValues[0]?.length === m) {
      grid = dpGridValues.map(row => [...row]);
    } else {
      // Generate based on preset - all finite values
      grid = Array(n).fill(null).map(() => Array(m).fill(1));
      
      {
        // Grid paths - all finite values
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            grid[i][j] = Math.floor(Math.random() * 10) + 1;
          }
        }
      }
    }
    
    const dp = Array(n).fill(null).map(() => Array(m).fill(0));
    const dependencies = [];
    
    // Initialize first row and column
    dp[0][0] = grid[0][0];
    steps.push({
      grid: grid.map(row => [...row]),
      dp: dp.map(row => [...row]),
      current: [0, 0],
      dependencies: [],
      explanation: 'Starting at (0,0)',
      updating: [[0, 0]],
      formula: `dp[0][0] = grid[0][0] = ${grid[0][0]}`
    });
    
    for (let i = 1; i < n; i++) {
      dp[i][0] = dp[i-1][0] + grid[i][0];
      steps.push({
        grid: grid.map(row => [...row]),
        dp: dp.map(row => [...row]),
        current: [i, 0],
        dependencies: [[i-1, 0]],
        explanation: `Filling first column: dp[${i}][0] = dp[${i-1}][0] + grid[${i}][0]`,
        updating: [[i, 0]],
        formula: `dp[${i}][0] = ${dp[i-1][0]} + ${grid[i][0]} = ${dp[i][0]}`
      });
    }
    
    for (let j = 1; j < m; j++) {
      dp[0][j] = dp[0][j-1] + grid[0][j];
      steps.push({
        grid: grid.map(row => [...row]),
        dp: dp.map(row => [...row]),
        current: [0, j],
        dependencies: [[0, j-1]],
        explanation: `Filling first row: dp[0][${j}] = dp[0][${j-1}] + grid[0][${j}]`,
        updating: [[0, j]],
        formula: `dp[0][${j}] = ${dp[0][j-1]} + ${grid[0][j]} = ${dp[0][j]}`
      });
    }
    
    for (let i = 1; i < n; i++) {
      for (let j = 1; j < m; j++) {
        // Grid paths: min of top and left
        const deps = [[i-1, j], [i, j-1]];
        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        steps.push({
          grid: grid.map(row => [...row]),
          dp: dp.map(row => [...row]),
          current: [i, j],
          dependencies: deps,
          explanation: `dp[${i}][${j}] = min(dp[${i-1}][${j}], dp[${i}][${j-1}]) + grid[${i}][${j}]`,
          updating: [[i, j]],
          formula: `dp[${i}][${j}] = min(${dp[i-1][j]}, ${dp[i][j-1]}) + ${grid[i][j]} = ${dp[i][j]}`
        });
      }
    }
    
    steps.push({
      grid: grid.map(row => [...row]),
      dp: dp.map(row => [...row]),
      explanation: `Result: ${dp[n-1][m-1]}`,
      updating: [],
      formula: `Final answer: ${dp[n-1][m-1]}`
    });
    
    return steps;
  };

  const segmentTreeAlgorithm = () => {
    const steps = [];
    // Depth 3 segment tree: 2^3 = 8 leaves, 2^4-1 = 15 total nodes
    const tree = Array(15).fill(0);
    const baseArray = [...segmentTreeBaseArray];
    
    const build = (node, start, end, level) => {
      if (start === end) {
        tree[node] = baseArray[start];
        steps.push({
          tree: [...tree],
          baseArray: [...baseArray],
          updating: [node],
          level,
          explanation: `Leaf node ${node}: value = ${baseArray[start]}`,
          operation: 'build'
        });
        return;
      }
      const mid = Math.floor((start + end) / 2);
      build(2*node + 1, start, mid, level + 1);
      build(2*node + 2, mid + 1, end, level + 1);
      tree[node] = tree[2*node + 1] + tree[2*node + 2];
      steps.push({
        tree: [...tree],
        baseArray: [...baseArray],
        updating: [node],
        level,
        explanation: `Internal node ${node}: sum = ${tree[node]}`,
        operation: 'build'
      });
    };
    
    build(0, 0, 7, 0);
    
    return steps;
  };

  const prefixSumsAlgorithm = () => {
    const steps = [];
    const arr = [...prefixArray];
    const prefix = Array(arr.length).fill(0);
    
    // Build prefix array
    prefix[0] = arr[0];
    steps.push({
      array: [...arr],
      prefix: [...prefix],
      updating: [0],
      explanation: `Initializing: prefix[0] = arr[0] = ${arr[0]}`,
      formula: `prefix[0] = ${arr[0]}`
    });
    
    for (let i = 1; i < arr.length; i++) {
      prefix[i] = prefix[i-1] + arr[i];
      steps.push({
        array: [...arr],
        prefix: [...prefix],
        updating: [i],
        explanation: `Building prefix: prefix[${i}] = prefix[${i-1}] + arr[${i}]`,
        formula: `prefix[${i}] = ${prefix[i-1]} + ${arr[i]} = ${prefix[i]}`
      });
    }
    
    // Add range query visualization if enabled
    if (showRangeQuery && rangeQueryL >= 0 && rangeQueryR < arr.length && rangeQueryL <= rangeQueryR) {
      const L = rangeQueryL;
      const R = rangeQueryR;
      const result = prefix[R] - (L > 0 ? prefix[L - 1] : 0);
      
      steps.push({
        array: [...arr],
        prefix: [...prefix],
        rangeQuery: [L, R],
        explanation: `Range query: sum(arr[${L}...${R}])`,
        formula: `sum(${L}, ${R}) = prefix[${R}] - prefix[${L > 0 ? L - 1 : '0'}] = ${prefix[R]} - ${L > 0 ? prefix[L - 1] : 0} = ${result}`,
        result: result
      });
    }
    
    return steps;
  };

  const dsuAlgorithm = () => {
    const steps = [];
    const n = 8; // 8 elements
    const parent = Array(n).fill(-1).map((_, i) => i);
    const rank = Array(n).fill(0);
    
    // Union operations to demonstrate
    const unions = [
      [0, 1], [2, 3], [4, 5], [6, 7],
      [0, 2], [4, 6], [0, 4]
    ];
    
    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]); // Path compression
      }
      return parent[x];
    };
    
    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);
      
      if (rootX === rootY) return;
      
      // Union by rank
      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
    };
    
    steps.push({
      parent: [...parent],
      rank: [...rank],
      explanation: `Initial state: ${n} disjoint sets`,
      updating: []
    });
    
    unions.forEach(([x, y], idx) => {
      const rootXBefore = find(x);
      const rootYBefore = find(y);
      
      steps.push({
        parent: [...parent],
        rank: [...rank],
        explanation: `Union(${x}, ${y}): Finding roots...`,
        updating: [x, y]
      });
      
      union(x, y);
      
      steps.push({
        parent: [...parent],
        rank: [...rank],
        explanation: `Union(${x}, ${y}): Merged sets with roots ${rootXBefore} and ${rootYBefore}`,
        updating: [x, y, parent[x], parent[y]]
      });
    });
    
    steps.push({
      parent: [...parent],
      rank: [...rank],
      explanation: `Final state: All elements in one set with root ${find(0)}`,
      updating: []
    });
    
    return steps;
  };

  const knapsackDPAlgorithm = () => {
    const steps = [];
    const n = knapsackWeights.length;
    const W = knapsackCapacity;
    
    if (n === 0 || W === 0) {
      steps.push({
        weights: [...knapsackWeights],
        values: [...knapsackValues],
        capacity: W,
        dp: [],
        explanation: 'Empty knapsack problem',
        updating: []
      });
      return steps;
    }
    
    // DP table: dp[i][w] = maximum value with first i items and capacity w
    const dp = Array(n + 1).fill(null).map(() => Array(W + 1).fill(0));
    
    steps.push({
      weights: [...knapsackWeights],
      values: [...knapsackValues],
      capacity: W,
      dp: dp.map(row => [...row]),
      explanation: `Knapsack: ${n} items, capacity ${W}`,
      updating: []
    });
    
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (knapsackWeights[i-1] <= w) {
          dp[i][w] = Math.max(
            dp[i-1][w],
            dp[i-1][w - knapsackWeights[i-1]] + knapsackValues[i-1]
          );
        } else {
          dp[i][w] = dp[i-1][w];
        }
        
        steps.push({
          weights: [...knapsackWeights],
          values: [...knapsackValues],
          capacity: W,
          dp: dp.map(row => [...row]),
          explanation: `Item ${i-1}: weight=${knapsackWeights[i-1]}, value=${knapsackValues[i-1]}. Capacity ${w}: max value = ${dp[i][w]}`,
          updating: [[i, w]]
        });
      }
    }
    
    steps.push({
      weights: [...knapsackWeights],
      values: [...knapsackValues],
      capacity: W,
      dp: dp.map(row => [...row]),
      explanation: `Maximum value: ${dp[n][W]}`,
      updating: [],
      result: dp[n][W]
    });
    
    return steps;
  };

  const lcsDPAlgorithm = () => {
    const steps = [];
    // Use two sequences
    const s1 = ['A', 'B', 'C', 'D', 'G', 'H'];
    const s2 = ['A', 'E', 'D', 'F', 'H', 'R'];
    const n = s1.length;
    const m = s2.length;
    
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    
    steps.push({
      s1: [...s1],
      s2: [...s2],
      dp: dp.map(row => [...row]),
      explanation: `LCS: Sequence 1 (${n} chars) vs Sequence 2 (${m} chars)`,
      updating: []
    });
    
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i-1] === s2[j-1]) {
          dp[i][j] = dp[i-1][j-1] + 1;
          steps.push({
            s1: [...s1],
            s2: [...s2],
            dp: dp.map(row => [...row]),
            explanation: `Match: s1[${i-1}]=${s1[i-1]}, s2[${j-1}]=${s2[j-1]}. dp[${i}][${j}] = ${dp[i][j]}`,
            updating: [[i, j]]
          });
        } else {
          dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
          steps.push({
            s1: [...s1],
            s2: [...s2],
            dp: dp.map(row => [...row]),
            explanation: `No match: dp[${i}][${j}] = max(${dp[i-1][j]}, ${dp[i][j-1]}) = ${dp[i][j]}`,
            updating: [[i, j]]
          });
        }
      }
    }
    
    steps.push({
      s1: [...s1],
      s2: [...s2],
      dp: dp.map(row => [...row]),
      explanation: `LCS length: ${dp[n][m]}`,
      updating: [],
      result: dp[n][m]
    });
    
    return steps;
  };

  const slidingWindowAlgorithm = () => {
    const steps = [];
    const arr = [...slidingWindowArray];
    let left = 0;
    let right = 0;
    
    if (windowPreset === 'maxsubarray') {
      // Maximum subarray sum (variable window)
      let maxSum = -Infinity;
      let currentSum = 0;
      let bestLeft = 0;
      let bestRight = 0;
      
      steps.push({
        array: [...arr],
        left: left,
        right: right,
        windowSum: 0,
        explanation: 'Starting: Find maximum subarray sum',
        entering: null,
        leaving: null
      });
      
      for (right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        
        steps.push({
          array: [...arr],
          left: left,
          right: right,
          windowSum: currentSum,
          explanation: `Expanding window: sum = ${currentSum}`,
          entering: right,
          leaving: null
        });
        
        if (currentSum > maxSum) {
          maxSum = currentSum;
          bestLeft = left;
          bestRight = right;
        }
        
        if (currentSum < 0) {
          steps.push({
            array: [...arr],
            left: left,
            right: right,
            windowSum: currentSum,
            explanation: `Sum negative, resetting window`,
            entering: null,
            leaving: null
          });
          
          currentSum = 0;
          left = right + 1;
        }
      }
      
      steps.push({
        array: [...arr],
        left: bestLeft,
        right: bestRight,
        windowSum: maxSum,
        explanation: `Maximum subarray sum: ${maxSum}`,
        entering: null,
        leaving: null,
        result: maxSum
      });
      
    } else if (windowPreset === 'longestsubstring') {
      // Longest substring without repeating characters
      const seen = new Set();
      let maxLen = 0;
      let bestLeft = 0;
      let bestRight = 0;
      
      steps.push({
        array: [...arr],
        left: left,
        right: right,
        windowSum: 0,
        explanation: 'Starting: Find longest substring without repeating characters',
        entering: null,
        leaving: null
      });
      
      for (right = 0; right < arr.length; right++) {
        while (seen.has(arr[right])) {
          seen.delete(arr[left]);
          steps.push({
            array: [...arr],
            left: left,
            right: right,
            windowSum: right - left,
            explanation: `Removing duplicate: arr[${left}] = ${arr[left]}`,
            entering: null,
            leaving: left
          });
          left++;
        }
        
        seen.add(arr[right]);
        
        steps.push({
          array: [...arr],
          left: left,
          right: right,
          windowSum: right - left + 1,
          explanation: `Adding arr[${right}] = ${arr[right]}`,
          entering: right,
          leaving: null
        });
        
        if (right - left + 1 > maxLen) {
          maxLen = right - left + 1;
          bestLeft = left;
          bestRight = right;
        }
      }
      
      steps.push({
        array: [...arr],
        left: bestLeft,
        right: bestRight,
        windowSum: maxLen,
        explanation: `Longest substring length: ${maxLen}`,
        entering: null,
        leaving: null,
        result: maxLen
      });
      
    } else {
      // Fixed-size window sum
      const k = windowSize;
      let windowSum = 0;
      
      steps.push({
        array: [...arr],
        left: left,
        right: right,
        windowSum: 0,
        explanation: `Starting: Fixed window size ${k}`,
        entering: null,
        leaving: null
      });
      
      // Initialize first window
      for (right = 0; right < k && right < arr.length; right++) {
        windowSum += arr[right];
        steps.push({
          array: [...arr],
          left: left,
          right: right,
          windowSum: windowSum,
          explanation: `Building initial window: sum = ${windowSum}`,
          entering: right,
          leaving: null
        });
      }
      
      right = k - 1;
      
      // Slide the window
      for (right = k; right < arr.length; right++) {
        windowSum = windowSum - arr[left] + arr[right];
        
        steps.push({
          array: [...arr],
          left: left,
          right: right,
          windowSum: windowSum,
          explanation: `Sliding: remove arr[${left}], add arr[${right}]`,
          entering: right,
          leaving: left
        });
        
        left++;
      }
      
      steps.push({
        array: [...arr],
        left: left,
        right: right - 1,
        windowSum: windowSum,
        explanation: `Final window sum: ${windowSum}`,
        entering: null,
        leaving: null,
        result: windowSum
      });
    }
    
    return steps;
  };

  const runAlgorithm = () => {
    let newSteps = [];

    if (category === 'sorting') {
      if (algorithm === 'bubble') newSteps = bubbleSort(data);
      else if (algorithm === 'selection') newSteps = selectionSort(data);
      else if (algorithm === 'insertion') newSteps = insertionSort(data);
      else if (algorithm === 'quick') newSteps = quickSort(data);
      else if (algorithm === 'merge') newSteps = mergeSort(data);
    } else if (category === 'search') {
      if (algorithm === 'linear') newSteps = linearSearch(data, searchTarget);
      else if (algorithm === 'binary') newSteps = binarySearch(data, searchTarget);
    } else if (category === 'pathfinding') {
      // Use existing graph if available (preserves manually added edges), otherwise generate new one
      let graphToUse = graph;
      // Only regenerate if graph doesn't exist, or if we're in graph mode and node count changed
      // But preserve existing edges if graph exists and node count matches
      if (!graphToUse || (visualMode === 'graph' && (!graphToUse.nodes || graphToUse.nodes.length !== numNodes))) {
        graphToUse = generateGraph();
        setGraph(graphToUse);
      } else if (graphToUse && visualMode === 'graph') {
        // Use existing graph with all its edges (including manually added ones)
        graphToUse = graph;
      }
      if (algorithm === 'bfs') newSteps = bfsAlgorithm(graphToUse);
      else if (algorithm === 'dfs') newSteps = dfsAlgorithm(graphToUse);
      else if (algorithm === 'dijkstra') newSteps = dijkstraAlgorithm(graphToUse);
    } else if (category === 'dp') {
      if (algorithm === 'griddp') newSteps = gridDPAlgorithm();
      else if (algorithm === 'knapsackdp') newSteps = knapsackDPAlgorithm();
      else if (algorithm === 'lcsdp') newSteps = lcsDPAlgorithm();
    } else if (category === 'datastructures') {
      if (algorithm === 'segmenttree') newSteps = segmentTreeAlgorithm();
      else if (algorithm === 'dsu') newSteps = dsuAlgorithm();
      else if (algorithm === 'prefixsums') newSteps = prefixSumsAlgorithm();
      else if (algorithm === 'slidingwindow') newSteps = slidingWindowAlgorithm();
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (category === 'pathfinding' || category === 'dp' || category === 'datastructures' || steps.length === 0) {
      runAlgorithm();
    }
  }, [algorithm, category, visualMode, pathfindingMode, goalNode, graphLayout, numNodes, dpPreset, dpGridRows, dpGridCols, windowPreset, windowSize, prefixArray, slidingWindowArray]);
  
  useEffect(() => {
    if (category === 'datastructures' && algorithm === 'prefixsums' && showRangeQuery) {
      runAlgorithm();
    }
  }, [rangeQueryL, rangeQueryR, showRangeQuery]);

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

  const currentState = steps[currentStep] || { 
    array: data, 
    explanation: 'Click Play to start',
    dp: [],
    grid: [],
    tree: [],
    baseArray: [],
    prefix: [],
    updating: []
  };

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
                      style={{ pointerEvents: 'all', cursor: 'pointer' }}
                      onClick={(e) => {
                        setEditingEdge(idx);
                        setEdgeWeightInput(edge.weight.toString());
                        e.stopPropagation();
                      }}
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
              
              const strokeColor = '#1e293b';
              const strokeWidth = 2;
                    
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
                      cursor: graph.isTree ? 'move' : 'default',
                      transition: draggedNode === node.id ? 'none' : 'all 0.2s ease'
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
                      y={node.y + 35}
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
  } else if (category === 'dp' && algorithm === 'griddp') {
    const dp = currentState.dp || [];
    const grid = currentState.grid || [];
    const n = dp.length || 4;
    const m = (n > 0 && dp[0]) ? dp[0].length : 4;
    const updating = currentState.updating || [];
    const current = currentState.current || [];
    const dependencies = currentState.dependencies || [];
    const formula = currentState.formula || '';
    
    if (n === 0 || m === 0) {
      return (
        <div style={styles.gridContainer}>
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            Click "Run Algorithm" to visualize DP Grid
          </div>
        </div>
      );
    }
    
    return (
      <div style={styles.gridContainer}>
        <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '12px' }}>
              DP Grid Visualization - Grid Paths
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
              Top number: Grid value | Bottom number: DP value
              {steps.length === 0 && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Double-click a cell to edit its value</div>}
            </div>
            {formula && (
              <div style={{ 
                fontSize: '14px', 
                color: '#fbbf24',
                background: 'rgba(251, 191, 36, 0.1)',
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'inline-block',
                marginTop: '8px'
              }}>
                {formula}
              </div>
            )}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${m}, 1fr)`,
            gap: '6px',
            maxWidth: 'fit-content',
            margin: '0 auto',
            padding: '12px',
            background: 'rgba(6, 78, 59, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            {Array.from({ length: n }).map((_, row) =>
              Array.from({ length: m }).map((_, col) => {
                const isUpdating = updating.some(([r, c]) => r === row && c === col);
                const isCurrent = current[0] === row && current[1] === col;
                const isDependency = dependencies.some(([r, c]) => r === row && c === col);
                const dpValue = dp[row]?.[col] ?? 0;
                const gridValue = grid[row]?.[col] ?? 1;
                
                let bgColor = '#065f46';
                if (isCurrent) bgColor = '#3b82f6';
                else if (isUpdating) bgColor = '#f59e0b';
                else if (isDependency) bgColor = '#8b5cf6';
                else if (row === 0 && col === 0) bgColor = '#10b981';
                else if (row === n - 1 && col === m - 1) bgColor = '#ef4444';
                
                return (
                  <div
                    key={`${row}-${col}`}
                    onDoubleClick={() => {
                      if (steps.length === 0) {
                        setEditingGridCell([row, col]);
                        setGridCellValueInput(gridValue.toString());
                      }
                    }}
                    style={{
                      ...styles.gridCell,
                      backgroundColor: bgColor,
                      aspectRatio: '1',
                      minWidth: '70px',
                      minHeight: '70px',
                      fontSize: '14px',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isCurrent ? '3px solid #3b82f6' : isDependency ? '2px solid #8b5cf6' : '1px solid #10b981',
                      boxShadow: isUpdating ? '0 0 12px rgba(251, 191, 36, 0.6)' : isDependency ? '0 0 8px rgba(139, 92, 246, 0.5)' : 'none',
                      transition: 'all 0.3s ease',
                      cursor: steps.length === 0 ? 'pointer' : 'default'
                    }}
                  >
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      opacity: 0.8
                    }}>
                      {gridValue}
                    </div>
                    <div style={{ 
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {dpValue}
                    </div>
                    <div style={{ 
                      fontSize: '9px', 
                      color: '#64748b',
                      marginTop: '2px'
                    }}>
                      ({row},{col})
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  } else if (category === 'dp' && algorithm === 'knapsackdp') {
    const weights = currentState.weights || [];
    const values = currentState.values || [];
    const capacity = currentState.capacity || 0;
    const dp = currentState.dp || [];
    const updating = currentState.updating || [];
    const result = currentState.result;
    
    if (weights.length === 0) {
      return (
        <div style={styles.gridContainer}>
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            Click "Run Algorithm" to visualize Knapsack DP
          </div>
        </div>
      );
    }
    
    const n = weights.length;
    const W = capacity;
    
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>
            Knapsack DP (0/1 Knapsack)
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
            Capacity: {capacity}
          </div>
          {result !== undefined && (
            <div style={{ fontSize: '18px', color: '#10b981', fontWeight: 'bold', marginTop: '8px' }}>
              Maximum Value: {result}
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
              Weights
            </div>
            <div style={styles.barContainer}>
              {weights.map((weight, idx) => {
                const maxWeight = Math.max(...weights, 1);
                return (
                  <div key={idx} style={styles.bar}>
                    <div
                      style={{
                        ...styles.barValue,
                        height: `${(weight / maxWeight) * 200}px`,
                        backgroundColor: '#60a5fa',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {weight}
                    </div>
                    <div style={styles.barIndex}>w[{idx}]</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
              Values
            </div>
            <div style={styles.barContainer}>
              {values.map((value, idx) => {
                const maxValue = Math.max(...values, 1);
                return (
                  <div key={idx} style={styles.bar}>
                    <div
                      style={{
                        ...styles.barValue,
                        height: `${(value / maxValue) * 200}px`,
                        backgroundColor: '#10b981',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {value}
                    </div>
                    <div style={styles.barIndex}>v[{idx}]</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {dp.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
              DP Table (items × capacity)
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${W + 1}, 1fr)`,
              gap: '4px',
              maxWidth: 'fit-content',
              margin: '0 auto'
            }}>
              {dp.map((row, i) =>
                row.map((val, w) => {
                  const isUpdating = updating.some(([r, c]) => r === i && c === w);
                  return (
                    <div
                      key={`${i}-${w}`}
                      style={{
                        ...styles.gridCell,
                        backgroundColor: isUpdating ? '#f59e0b' : (i === 0 || w === 0) ? '#334155' : '#475569',
                        minWidth: '50px',
                        minHeight: '40px',
                        fontSize: '12px',
                        color: 'white',
                        border: isUpdating ? '2px solid #f59e0b' : '1px solid #64748b'
                      }}
                    >
                      {val}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else if (category === 'datastructures' && algorithm === 'prefixsums') {
    const arr = currentState.array || [];
    const prefix = currentState.prefix || [];
    const updating = currentState.updating || [];
    const rangeQuery = currentState.rangeQuery || null;
    const formula = currentState.formula || '';
    const result = currentState.result;
    
    if (arr.length === 0 && prefix.length === 0) {
      return (
        <div style={styles.gridContainer}>
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            Click "Run Algorithm" to visualize Prefix Sums
          </div>
        </div>
      );
    }
    
    const maxArr = Math.max(...arr, 1);
    const maxPrefix = Math.max(...prefix, 1);
    
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>
            Prefix Sums Visualization
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
            Yellow highlights show updates propagating through the array
          </div>
          {formula && (
            <div style={{ 
              fontSize: '14px', 
              color: '#fbbf24',
              background: 'rgba(251, 191, 36, 0.1)',
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'inline-block',
              marginTop: '8px'
            }}>
              {formula}
            </div>
          )}
          {result !== undefined && (
            <div style={{ 
              fontSize: '18px', 
              color: '#10b981',
              fontWeight: 'bold',
              marginTop: '12px'
            }}>
              Result: {result}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
            Original Array
          </div>
          <div style={styles.barContainer}>
            {arr.map((value, idx) => {
              const isInRange = rangeQuery && idx >= rangeQuery[0] && idx <= rangeQuery[1];
              const color = isInRange ? '#fbbf24' : '#60a5fa';
              return (
                <div key={idx} style={styles.bar}>
                  <div
                    style={{
                      ...styles.barValue,
                      height: `${(value / maxArr) * 280}px`,
                      backgroundColor: color,
                      transition: 'all 0.3s ease',
                      border: isInRange ? '3px solid #fbbf24' : 'none',
                      boxShadow: isInRange ? '0 0 12px rgba(251, 191, 36, 0.6)' : 'none'
                    }}
                  >
                    {value}
                  </div>
                  <div style={styles.barIndex}>arr[{idx}]</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
            Prefix Sums Array
          </div>
          <div style={styles.barContainer}>
            {prefix.map((value, idx) => {
              const isUpdating = updating.includes(idx);
              const isInRange = rangeQuery && (idx === rangeQuery[1] || (idx === rangeQuery[0] - 1 && rangeQuery[0] > 0));
              const prevValue = idx > 0 ? prefix[idx - 1] : 0;
              let color = isUpdating ? '#fbbf24' : '#10b981';
              if (isInRange) color = '#8b5cf6';
              return (
                <div key={idx} style={styles.bar}>
                  <div
                    style={{
                      ...styles.barValue,
                      height: `${(value / maxPrefix) * 280}px`,
                      backgroundColor: color,
                      transition: 'all 0.3s ease',
                      boxShadow: isUpdating || isInRange ? '0 0 12px rgba(251, 191, 36, 0.6)' : 'none',
                      border: isUpdating || isInRange ? '2px solid #fbbf24' : 'none'
                    }}
                  >
                    {value}
                  </div>
                  <div style={styles.barIndex}>
                    prefix[{idx}]
                  </div>
                  {idx > 0 && (
                    <div style={{ 
                      fontSize: '10px', 
                      color: '#64748b',
                      marginTop: '4px',
                      textAlign: 'center'
                    }}>
                      = {prevValue} + {arr[idx]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (category === 'datastructures' && algorithm === 'segmenttree') {
    const tree = currentState.tree || [];
    const baseArray = currentState.baseArray || [];
    const updating = currentState.updating || [];
    
    // Always show the visualization, even if empty (will show default values)
    const displayTree = tree.length > 0 ? tree : Array(15).fill(0);
    const displayBaseArray = baseArray.length > 0 ? baseArray : segmentTreeBaseArray;
    
    // Render segment tree (depth 3, 15 nodes)
    const nodePositions = [];
    const levels = 4; // 0-indexed, so 0-3 = 4 levels
    for (let level = 0; level < levels; level++) {
      const nodesInLevel = Math.pow(2, level);
      const startIdx = Math.pow(2, level) - 1;
      const y = 300 + level * 140; // Shifted down to make room for base array at top
      for (let i = 0; i < nodesInLevel; i++) {
        const nodeIdx = startIdx + i;
        const x = 400 + (i - nodesInLevel / 2) * 180;
        nodePositions.push({ idx: nodeIdx, x, y });
      }
    }
    
    // Modern color scheme
    const colors = {
      primary: '#6366f1',      // Indigo
      secondary: '#8b5cf6',    // Purple
      accent: '#06b6d4',       // Cyan
      highlight: '#10b981',    // Emerald
      updating: '#f59e0b',     // Amber
      background: '#1e293b',   // Slate
      backgroundLight: '#334155',
      text: '#f1f5f9',         // Slate light
      textMuted: '#94a3b8',
      border: '#475569'
    };
    
    return (
      <div style={styles.svgContainer}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px' 
          }}>
            Segment Tree (Depth 3)
          </div>
          <div style={{ fontSize: '12px', color: colors.textMuted }}>
            <span style={{ color: colors.updating }}>Orange</span> highlights show nodes being updated
          </div>
        </div>
        <svg width="100%" height="100%" viewBox="0 0 800 750" style={{ 
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)', 
          borderRadius: '16px', 
          minHeight: '600px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="updatingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Base array - drawn at top */}
          <g>
            <text x="400" y="50" fill={colors.text} fontSize="15" textAnchor="middle" fontWeight="600">Base Array</text>
            {displayBaseArray.map((val, idx) => {
              const x = 240 + idx * 50;
              const isUpdating = updating.includes(idx);
              return (
                <g key={idx}>
                  <rect 
                    x={x - 20} 
                    y="70" 
                    width="40" 
                    height="40" 
                    fill={isUpdating ? colors.updating : colors.backgroundLight} 
                    stroke={isUpdating ? colors.updating : colors.primary} 
                    strokeWidth={isUpdating ? '3' : '2'}
                    rx="6"
                    style={{
                      transition: 'all 0.3s ease',
                      filter: isUpdating ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.8))' : 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.4))'
                    }}
                  />
                  <text x={x} y="96" fill={colors.text} fontSize="14" textAnchor="middle" fontWeight="bold">{val}</text>
                  <text x={x} y="120" fill={colors.textMuted} fontSize="10" textAnchor="middle" fontWeight="500">[{idx}]</text>
                </g>
              );
            })}
          </g>
          
          {/* Tree nodes */}
          {nodePositions.map(({ idx, x, y }) => {
            const isUpdating = updating.includes(idx);
            const value = displayTree[idx] || 0;
            const level = Math.floor(Math.log2(idx + 1));
            const isLeaf = level === 3;
            const leftChild = 2 * idx + 1;
            const rightChild = 2 * idx + 2;
            const leftChildPos = nodePositions.find(p => p.idx === leftChild);
            const rightChildPos = nodePositions.find(p => p.idx === rightChild);
            
            // Color based on level - blue tones that complement green background
            let nodeColor = colors.primary;
            if (level === 0) nodeColor = colors.secondary;
            else if (level === 1) nodeColor = '#3b82f6';
            else if (level === 2) nodeColor = '#60a5fa';
            else nodeColor = colors.accent;
            
            return (
              <g key={idx}>
                {/* Draw edges to children */}
                {!isLeaf && leftChildPos && (
                  <line 
                    x1={x} 
                    y1={y + 28} 
                    x2={leftChildPos.x} 
                    y2={leftChildPos.y - 28} 
                    stroke={isUpdating ? colors.updating : colors.border} 
                    strokeWidth={isUpdating ? '3' : '2'}
                    opacity={isUpdating ? 1 : 0.6}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )}
                {!isLeaf && rightChildPos && (
                  <line 
                    x1={x} 
                    y1={y + 28} 
                    x2={rightChildPos.x} 
                    y2={rightChildPos.y - 28} 
                    stroke={isUpdating ? colors.updating : colors.border} 
                    strokeWidth={isUpdating ? '3' : '2'}
                    opacity={isUpdating ? 1 : 0.6}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )}
                <circle 
                  cx={x} 
                  cy={y} 
                  r="28" 
                  fill={isUpdating ? `url(#updatingGradient)` : nodeColor}
                  stroke={isUpdating ? colors.updating : colors.highlight} 
                  strokeWidth={isUpdating ? '4' : '2.5'}
                  style={{
                    transition: 'all 0.3s ease',
                    filter: isUpdating ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.9))' : 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.5))'
                  }}
                />
                <text 
                  x={x} 
                  y={y + 7} 
                  fill={colors.text} 
                  fontSize="15" 
                  textAnchor="middle" 
                  fontWeight="bold"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
                >
                  {value}
                </text>
                <text 
                  x={x} 
                  y={y - 35} 
                  fill={colors.textMuted} 
                  fontSize="11" 
                  textAnchor="middle"
                  fontWeight="600"
                >
                  [{idx}]
                </text>
                {!isLeaf && (
                  <text 
                    x={x} 
                    y={y + 42} 
                    fill={colors.textMuted} 
                    fontSize="9" 
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    L{level}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  } else if (category === 'datastructures' && algorithm === 'dsu') {
    const parent = currentState.parent || [];
    const rank = currentState.rank || [];
    const updating = currentState.updating || [];
    
    if (parent.length === 0) {
      return (
        <div style={styles.gridContainer}>
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            Click "Run Algorithm" to visualize DSU (Union-Find)
          </div>
        </div>
      );
    }
    
    const n = parent.length;
    
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>
            DSU (Disjoint Set Union) / Union-Find
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Yellow highlights show elements being updated
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(8, n)}, 1fr)`,
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {Array.from({ length: n }).map((_, idx) => {
            const isUpdating = updating.includes(idx);
            const root = parent[idx] === idx ? idx : (() => {
              let curr = idx;
              while (parent[curr] !== curr) curr = parent[curr];
              return curr;
            })();
            
            let bgColor = '#334155';
            if (isUpdating) bgColor = '#fbbf24';
            else if (parent[idx] === idx) bgColor = '#10b981'; // Root node
            else bgColor = '#475569';
            
            return (
              <div
                key={idx}
                style={{
                  ...styles.gridCell,
                  backgroundColor: bgColor,
                  minHeight: '80px',
                  fontSize: '14px',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isUpdating ? '3px solid #fbbf24' : '1px solid #475569',
                  boxShadow: isUpdating ? '0 0 12px rgba(251, 191, 36, 0.6)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>
                  {idx}
                </div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '2px' }}>
                  parent: {parent[idx]}
                </div>
                <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  rank: {rank[idx]}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  root: {root}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (category === 'datastructures' && algorithm === 'slidingwindow') {
    const arr = currentState.array || [];
    const left = currentState.left ?? 0;
    const right = currentState.right ?? 0;
    const windowSum = currentState.windowSum ?? 0;
    const entering = currentState.entering;
    const leaving = currentState.leaving;
    const result = currentState.result;
    
    if (arr.length === 0) {
      return (
        <div style={styles.gridContainer}>
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            Click "Run Algorithm" to visualize Sliding Window
          </div>
        </div>
      );
    }
    
    const maxValue = Math.max(...arr, 1);
    
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '8px' }}>
            Sliding Window - {windowPreset === 'maxsubarray' ? 'Maximum Subarray' : windowPreset === 'longestsubstring' ? 'Longest Substring' : 'Fixed Window'}
          </div>
          <div style={{ fontSize: '14px', color: '#fbbf24', marginTop: '12px', fontWeight: 'bold' }}>
            Window Sum: {windowSum}
          </div>
          {result !== undefined && (
            <div style={{ fontSize: '18px', color: '#10b981', marginTop: '8px', fontWeight: 'bold' }}>
              Result: {result}
            </div>
          )}
        </div>
        
        <div style={styles.barContainer}>
          {arr.map((value, idx) => {
            const isInWindow = idx >= left && idx <= right;
            const isEntering = entering === idx;
            const isLeaving = leaving === idx;
            const isLeft = idx === left;
            const isRight = idx === right;
            
            let color = '#334155';
            if (isInWindow) {
              if (isEntering) color = '#10b981'; // Green for entering
              else if (isLeaving) color = '#ef4444'; // Red for leaving
              else color = '#60a5fa'; // Blue for in window
            }
            
            return (
              <div key={idx} style={styles.bar}>
                <div
                  style={{
                    ...styles.barValue,
                    height: `${(value / maxValue) * 280}px`,
                    backgroundColor: color,
                    transition: 'all 0.3s ease',
                    border: isLeft || isRight ? '3px solid #fbbf24' : 'none',
                    boxShadow: isEntering || isLeaving ? '0 0 12px rgba(16, 185, 129, 0.6)' : 'none'
                  }}
                >
                  {value}
                </div>
                <div style={styles.barIndex}>
                  {isLeft && 'L'} {idx} {isRight && 'R'}
                </div>
                {(isEntering || isLeaving) && (
                  <div style={{ 
                    fontSize: '10px', 
                    color: isEntering ? '#10b981' : '#ef4444',
                    marginTop: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                    {isEntering ? '→ Enter' : '← Leave'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div style={styles.barContainer}>
        {(currentState.array || data).map((value, idx) => {
          const isComparing = currentState.comparing?.includes(idx);
          const isSwapping = currentState.swapping?.includes(idx);
          const isFound = currentState.found?.includes(idx);
          const isInRange = currentState.range && idx >= currentState.range[0] && idx <= currentState.range[1];
          const isMerging = currentState.merging && idx >= currentState.merging[0] && idx <= currentState.merging[1];
          
          let color = '#60a5fa';
          if (isFound) color = '#10b981';
          else if (isSwapping) color = '#ef4444';
          else if (isComparing) color = '#fbbf24';
          else if (isMerging) color = '#8b5cf6';
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

        {category === 'dp' && algorithm === 'griddp' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowDpGridInput(!showDpGridInput)}
              style={{
                ...styles.button,
                background: '#475569',
                color: 'white'
              }}
            >
              <Edit2 size={16} /> Grid Settings
            </button>
            <button
              onClick={() => {
                setDpGridValues([]);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#8b5cf6',
                color: 'white'
              }}
            >
              <Shuffle size={16} /> Randomize Grid
            </button>
          </div>
        )}

        {showDpGridInput && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="number"
              value={dpGridRows}
              onChange={(e) => setDpGridRows(Math.max(2, Math.min(8, parseInt(e.target.value) || 4)))}
              style={styles.input}
              placeholder="Rows (2-8)"
            />
            <input
              type="number"
              value={dpGridCols}
              onChange={(e) => setDpGridCols(Math.max(2, Math.min(8, parseInt(e.target.value) || 4)))}
              style={styles.input}
              placeholder="Columns (2-8)"
            />
            <button
              onClick={() => {
                setShowDpGridInput(false);
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

        {category === 'dp' && algorithm === 'knapsackdp' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setShowKnapsackInput(!showKnapsackInput)}
              style={{
                ...styles.button,
                background: '#475569',
                color: 'white'
              }}
            >
              <Edit2 size={16} /> Edit Inputs
            </button>
            <button
              onClick={() => {
                // Randomize: 2-4 items, weights 1-5, values 5-30, capacity 5-10
                const numItems = Math.floor(Math.random() * 3) + 2; // 2-4 items
                const newWeights = Array.from({ length: numItems }, () => Math.floor(Math.random() * 5) + 1);
                const newValues = Array.from({ length: numItems }, () => Math.floor(Math.random() * 26) + 5);
                const newCapacity = Math.floor(Math.random() * 6) + 5; // 5-10
                setKnapsackWeights(newWeights);
                setKnapsackValues(newValues);
                setKnapsackCapacity(newCapacity);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#8b5cf6',
                color: 'white'
              }}
            >
              <Shuffle size={16} /> Randomize Values
            </button>
          </div>
        )}

        {showKnapsackInput && category === 'dp' && algorithm === 'knapsackdp' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Weights (comma-separated):</label>
              <input
                type="text"
                value={knapsackWeights.join(', ')}
                onChange={(e) => {
                  const values = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
                  if (values.length > 0) setKnapsackWeights(values);
                }}
                style={styles.input}
                placeholder="2, 3, 4"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Values (comma-separated):</label>
              <input
                type="text"
                value={knapsackValues.join(', ')}
                onChange={(e) => {
                  const values = e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
                  if (values.length > 0) setKnapsackValues(values);
                }}
                style={styles.input}
                placeholder="10, 20, 30"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#cbd5e1' }}>Capacity:</label>
              <input
                type="number"
                value={knapsackCapacity}
                onChange={(e) => setKnapsackCapacity(Math.max(1, parseInt(e.target.value) || 5))}
                style={styles.input}
                placeholder="5"
              />
            </div>
            <button
              onClick={() => {
                setShowKnapsackInput(false);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#10b981',
                color: 'white',
                alignSelf: 'flex-end'
              }}
            >
              Apply
            </button>
          </div>
        )}

        {category === 'datastructures' && algorithm === 'prefixsums' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setPrefixInputValue(prefixArray.join(', '));
                setShowInput(!showInput);
              }}
              style={{
                ...styles.button,
                background: '#475569',
                color: 'white'
              }}
            >
              <Edit2 size={16} /> Edit Array
            </button>
            <button
              onClick={() => setShowRangeQuery(!showRangeQuery)}
              style={{
                ...styles.button,
                background: showRangeQuery ? '#10b981' : '#475569',
                color: 'white'
              }}
            >
              Range Query
            </button>
          </div>
        )}

        {showInput && category === 'datastructures' && algorithm === 'prefixsums' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              value={prefixInputValue}
              onChange={(e) => setPrefixInputValue(e.target.value)}
              style={styles.input}
              placeholder="Enter numbers separated by commas"
            />
            <button
              onClick={() => {
                try {
                  const newArray = prefixInputValue.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                  if (newArray.length > 0) {
                    setPrefixArray(newArray);
                    setShowInput(false);
                    runAlgorithm();
                  }
                } catch (e) {
                  console.error('Invalid input');
                }
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

        {showRangeQuery && category === 'datastructures' && algorithm === 'prefixsums' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="number"
              value={rangeQueryL}
              onChange={(e) => setRangeQueryL(Math.max(0, Math.min(prefixArray.length - 1, parseInt(e.target.value) || 0)))}
              style={styles.input}
              placeholder="Left index (L)"
            />
            <input
              type="number"
              value={rangeQueryR}
              onChange={(e) => setRangeQueryR(Math.max(rangeQueryL, Math.min(prefixArray.length - 1, parseInt(e.target.value) || prefixArray.length - 1)))}
              style={styles.input}
              placeholder="Right index (R)"
            />
            <button
              onClick={() => {
                setShowRangeQuery(false);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#10b981',
                color: 'white'
              }}
            >
              Apply Query
            </button>
          </div>
        )}

        {category === 'datastructures' && algorithm === 'segmenttree' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 30) + 1);
                setSegmentTreeBaseArray(newArray);
                runAlgorithm();
              }}
              style={{
                ...styles.button,
                background: '#8b5cf6',
                color: 'white'
              }}
            >
              <Shuffle size={16} /> Randomize Values
            </button>
          </div>
        )}

        {category === 'datastructures' && algorithm === 'slidingwindow' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <select
              value={windowPreset}
              onChange={(e) => {
                setWindowPreset(e.target.value);
                runAlgorithm();
              }}
              style={styles.select}
            >
              <option value="maxsubarray">Maximum Subarray</option>
              <option value="longestsubstring">Longest Substring</option>
              <option value="fixedwindow">Fixed Window Sum</option>
            </select>
            <input
              type="number"
              value={windowSize}
              onChange={(e) => setWindowSize(Math.max(1, Math.min(slidingWindowArray.length, parseInt(e.target.value) || 3)))}
              style={styles.input}
              placeholder="Window size"
            />
            <button
              onClick={() => {
                setSlidingWindowInputValue(slidingWindowArray.join(', '));
                setShowWindowInput(!showWindowInput);
              }}
              style={{
                ...styles.button,
                background: '#475569',
                color: 'white'
              }}
            >
              <Edit2 size={16} /> Edit Array
            </button>
          </div>
        )}

        {showWindowInput && category === 'datastructures' && algorithm === 'slidingwindow' && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              value={slidingWindowInputValue}
              onChange={(e) => setSlidingWindowInputValue(e.target.value)}
              style={styles.input}
              placeholder="Enter numbers separated by commas"
            />
            <button
              onClick={() => {
                try {
                  const newArray = slidingWindowInputValue.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                  if (newArray.length > 0) {
                    setSlidingWindowArray(newArray);
                    setShowWindowInput(false);
                    runAlgorithm();
                  }
                } catch (e) {
                  console.error('Invalid input');
                }
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

        {category !== 'pathfinding' && category !== 'dp' && !(category === 'datastructures' && (algorithm === 'prefixsums' || algorithm === 'slidingwindow')) && (
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
          </div>
        )}
      </div>

      {/* Node Label Edit Modal */}
      {editingNode && graph && (
              <div style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          zIndex: 1000,
          border: '2px solid #475569',
          minWidth: '300px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold' }}>
            Edit Node Label
          </div>
          <input
            type="text"
            value={nodeLabelInput}
            onChange={(e) => setNodeLabelInput(e.target.value)}
            style={styles.input}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setGraph(prev => ({
                  ...prev,
                  nodes: prev.nodes.map(n => 
                    n.id === editingNode ? { ...n, label: nodeLabelInput } : n
                  )
                }));
                setEditingNode(null);
                setNodeLabelInput('');
              } else if (e.key === 'Escape') {
                setEditingNode(null);
                setNodeLabelInput('');
              }
            }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={() => {
                setGraph(prev => ({
                  ...prev,
                  nodes: prev.nodes.map(n => 
                    n.id === editingNode ? { ...n, label: nodeLabelInput } : n
                  )
                }));
                setEditingNode(null);
                setNodeLabelInput('');
              }}
              style={{ ...styles.button, background: '#10b981', color: 'white', flex: 1 }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingNode(null);
                setNodeLabelInput('');
              }}
              style={{ ...styles.button, background: '#475569', color: 'white', flex: 1 }}
            >
              Cancel
            </button>
          </div>
              </div>
            )}

      {/* Grid Cell Edit Modal */}
      {editingGridCell && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          zIndex: 1000,
          border: '2px solid #475569',
          minWidth: '300px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold' }}>
            Edit Grid Value at ({editingGridCell[0]}, {editingGridCell[1]})
          </div>
          <input
            type="text"
            value={gridCellValueInput}
            onChange={(e) => setGridCellValueInput(e.target.value)}
            style={styles.input}
            autoFocus
            placeholder="Enter value (use ∞ for obstacle)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const [row, col] = editingGridCell;
                let value = gridCellValueInput.trim();
                let numValue;
                
                if (value === '∞' || value === 'inf' || value === 'infinity') {
                  numValue = 999;
                } else {
                  numValue = parseInt(value);
                  if (isNaN(numValue)) {
                    setEditingGridCell(null);
                    setGridCellValueInput('');
                    return;
                  }
                }
                
                setDpGridValues(prev => {
                  const newValues = prev.length === dpGridRows && prev[0]?.length === dpGridCols 
                    ? prev.map(r => [...r])
                    : Array(dpGridRows).fill(null).map(() => Array(dpGridCols).fill(1));
                  newValues[row][col] = numValue;
                  return newValues;
                });
                
                setEditingGridCell(null);
                setGridCellValueInput('');
              } else if (e.key === 'Escape') {
                setEditingGridCell(null);
                setGridCellValueInput('');
              }
            }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={() => {
                const [row, col] = editingGridCell;
                let value = gridCellValueInput.trim();
                let numValue = parseInt(value);
                
                if (isNaN(numValue) || numValue <= 0) {
                  setEditingGridCell(null);
                  setGridCellValueInput('');
                  return;
                }
                
                setDpGridValues(prev => {
                  const newValues = prev.length === dpGridRows && prev[0]?.length === dpGridCols 
                    ? prev.map(r => [...r])
                    : Array(dpGridRows).fill(null).map(() => Array(dpGridCols).fill(1));
                  newValues[row][col] = numValue;
                  return newValues;
                });
                
                setEditingGridCell(null);
                setGridCellValueInput('');
              }}
              style={{ ...styles.button, background: '#10b981', color: 'white', flex: 1 }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingGridCell(null);
                setGridCellValueInput('');
              }}
              style={{ ...styles.button, background: '#475569', color: 'white', flex: 1 }}
            >
              Cancel
            </button>
          </div>
          </div>
        )}

      {/* Edge Weight Edit Modal */}
      {editingEdge !== null && graph && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          zIndex: 1000,
          border: '2px solid #475569',
          minWidth: '300px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold' }}>
            Edit Edge Weight
      </div>
          <input
            type="number"
            value={edgeWeightInput}
            onChange={(e) => setEdgeWeightInput(e.target.value)}
            style={styles.input}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const weight = parseInt(edgeWeightInput);
                if (!isNaN(weight) && weight > 0) {
                  setGraph(prev => ({
                    ...prev,
                    edges: prev.edges.map((edge, idx) => 
                      idx === editingEdge ? { ...edge, weight } : edge
                    )
                  }));
                  setEditingEdge(null);
                  setEdgeWeightInput('');
                  // Trigger algorithm re-run if in pathfinding mode
                  setTimeout(() => {
                    if (category === 'pathfinding') {
                      runAlgorithm();
                    }
                  }, 100);
                }
              } else if (e.key === 'Escape') {
                setEditingEdge(null);
                setEdgeWeightInput('');
              }
            }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={() => {
                const weight = parseInt(edgeWeightInput);
                if (!isNaN(weight) && weight > 0) {
                  setGraph(prev => ({
                    ...prev,
                    edges: prev.edges.map((edge, idx) => 
                      idx === editingEdge ? { ...edge, weight } : edge
                    )
                  }));
                  setEditingEdge(null);
                  setEdgeWeightInput('');
                  // Trigger algorithm re-run if in pathfinding mode
                  setTimeout(() => {
                    if (category === 'pathfinding') {
                      runAlgorithm();
                    }
                  }, 100);
                }
              }}
              style={{ ...styles.button, background: '#10b981', color: 'white', flex: 1 }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingEdge(null);
                setEdgeWeightInput('');
              }}
              style={{ ...styles.button, background: '#475569', color: 'white', flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmExplorer;



