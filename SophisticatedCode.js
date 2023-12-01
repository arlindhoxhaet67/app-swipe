/*
Filename: SophisticatedCode.js

Description: This code implements a complex algorithm for finding the optimal path in a graph using Dijkstra's algorithm. 
It also includes various helper functions and classes to support graph manipulation and calculations.

Author: John Doe
Date: 2022-01-01
*/

// Graph class
class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }
  
  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = {};
  }
  
  addEdge(vertex1, vertex2, weight) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
  
  shortestPath(startVertex, targetVertex) {
    // Dijkstra's algorithm implementation
    const distances = {};
    const visited = {};
    const previous = {};
    
    for (let vertex of this.vertices) {
      if (vertex === startVertex) {
        distances[vertex] = 0;
      } else {
        distances[vertex] = Infinity;
      }
      previous[vertex] = null;
    }
    
    while (Object.keys(visited).length < this.vertices.length) {
      let currentVertex = this.getMinDistanceVertex(distances, visited);
      visited[currentVertex] = true;
      
      for (let neighbor in this.edges[currentVertex]) {
        let distance = distances[currentVertex] + this.edges[currentVertex][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
        }
      }
    }
    
    let path = [targetVertex];
    let previousVertex = previous[targetVertex];
    while (previousVertex) {
      path.unshift(previousVertex);
      previousVertex = previous[previousVertex];
    }
    
    return path;
  }
  
  getMinDistanceVertex(distances, visited) {
    let minDistance = Infinity;
    let minVertex = null;
    for (let vertex in distances) {
      if (!visited[vertex] && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        minVertex = vertex;
      }
    }
    return minVertex;
  }
}

// Example usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 1);
graph.addEdge('C', 'E', 3);
graph.addEdge('D', 'E', 1);

const startVertex = 'A';
const targetVertex = 'E';
const path = graph.shortestPath(startVertex, targetVertex);

console.log(`Shortest path from ${startVertex} to ${targetVertex}: ${path.join(' -> ')}`);