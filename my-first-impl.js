const addVertex = xs => x => {
  xs[x] = []
  return xs;
}

const addEdge = xs => a => b => {
  xs[a].push(b)
  return xs;
}

const dfsUtil = vertex => visited => xs => {
  if (!visited[vertex]) {
    visited[vertex] = true
    xs[vertex].forEach(neighbor => dfsUtil(neighbor)(visited)(xs))
  }
}

const dfs = xs =>
  Object.keys(xs).forEach(node => dfsUtil(node)({})(xs))

const detectCycleUtil = vertex => visited => recStack => xs => {
  if (!visited[vertex]) {
    visited[vertex] = true;
    recStack[vertex] = true;
    const nodeNeighbors = xs[vertex];
    for (let i = 0; i < nodeNeighbors.length; i++) {
      const currentNode = nodeNeighbors[i];
      if (!visited[currentNode] && detectCycleUtil(currentNode)(visited)(recStack)(xs)) {
        return true;
      } else if (recStack[currentNode]) {
        return true;
      }
    }
  }
  recStack[vertex] = false;
  return false;
}
const detectCycle = xs => {
  const graphNodes = Object.keys(xs)
  for (let i = 0; i < graphNodes.length; i++) {
    if (detectCycleUtil(graphNodes[i], {}, {}))
      return 'there is a cycle'
  }
  return 'no cycle!'
}

const list = [];
const addVertexToList = addVertex(list)
const addEdgeToList = addEdge(list)

addVertexToList('A')
addVertexToList('B')
addVertexToList('C')
addVertexToList('D')
addVertexToList('E')

list


addEdgeToList('A')('B')
addEdgeToList('D')('E')
addEdgeToList('C')('E')
addEdgeToList('A')('D')
addEdgeToList('A')('C')
addEdgeToList('E')('B')
addEdgeToList('D')('B')
addEdgeToList('E')('A')

list

detectCycle(list) /*?.$*/
