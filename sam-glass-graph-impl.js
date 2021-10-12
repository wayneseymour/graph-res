function Graph() {
  this.adjList = {}
}

Graph.prototype.addVertex = function (vertex) {
  this.adjList[vertex] = []
}

Graph.prototype.addEdge = function (vertex1, vertex2) {
  this.adjList[vertex1].push(vertex2)
}

Graph.prototype.dfs = function () {
  const nodes = Object.keys(this.adjList)
  const visited = {}
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    this._dfsUtil(node, visited)
  }
}

Graph.prototype._dfsUtil = function (vertex, visited) {
  if (!visited[vertex]) {
    visited[vertex] = true
    const neighbors = this.adjList[vertex]
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      this._dfsUtil(neighbor, visited)
    }
  }
}

Graph.prototype.detectCycle = function () {
  const graphNodes = Object.keys(this.adjList);
  const visited = {};
  const recStack = {};

  for (let i = 0; i < graphNodes.length; i++) {
    const node = graphNodes[i]
    if (this._detectCycleUtil(node, visited, recStack))
      return 'there is a cycle'
  }
  return 'no cycle!'
}

Graph.prototype._detectCycleUtil = function (vertex, visited, recStack) {
  if (!visited[vertex]) {
    visited[vertex] = true;
    recStack[vertex] = true;
    const nodeNeighbors = this.adjList[vertex];
    for (let i = 0; i < nodeNeighbors.length; i++) {
      const currentNode = nodeNeighbors[i];
      if (!visited[currentNode] && this._detectCycleUtil(currentNode, visited, recStack)) {
        return true;
      } else if (recStack[currentNode]) {
        return true;
      }
    }
  }
  recStack[vertex] = false;
  return false;
}

const graph = new Graph()

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')

graph.adjList /*?*/

graph.addEdge('A', 'B')
graph.addEdge('D', 'E')
graph.addEdge('C', 'E')
graph.addEdge('A', 'D')
graph.addEdge('A', 'C')
graph.addEdge('E', 'B')
graph.addEdge('D', 'B')
graph.addEdge('E', 'A')

graph.adjList /*?*/

graph.detectCycle() /*?.$*/
