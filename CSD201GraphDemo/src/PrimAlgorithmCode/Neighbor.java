
package PrimAlgorithmCode;

public class Neighbor<T> {

    private final Vertex<T> vertex;
    private final Edge edge;

    public Neighbor() {
        this.vertex = null;
        this.edge = null;
    }

    public Neighbor(Vertex<T> vertex, Edge edge) {
        this.vertex = vertex;
        this.edge = edge;
    }
    
    public boolean isVisited() {
        return edge.isIncluded() || vertex.isVisited();
    }

    public Vertex<T> getVertex() {
        return vertex;
    }

    public Edge getEdge() {
        return edge;
    }
    
}
