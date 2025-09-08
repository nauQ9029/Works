package PrimAlgorithm;

public class Graph {

    int countVertex;
    int[][] adjMatrix;

    public Graph(int countVertex, boolean isDirected) {
        this.countVertex = countVertex;
        adjMatrix = new int[countVertex][countVertex];
    }

    void addEdge(int source, int destination, int weight) {
        adjMatrix[source][destination] = weight;
        adjMatrix[destination][source] = weight; // Đối với đồ thị vô hướng
    }
}
