
package PrimAlgorithmCode;

import java.util.ArrayList;
import java.util.List;

public class Graph<T> {
    private List<Vertex<T>> gp = new ArrayList<>();

    public List<Vertex<T>> getGp() {
        return gp;
    }

    public void setGp(List<Vertex<T>> gp) {
        this.gp = gp;
    }
     
    public Vertex addNewVertex(T data){
        Vertex<T> vtnew = new Vertex<>(data, false);
        gp.add(vtnew);
        return vtnew;
    }
    
    public void addNewNeighbor(Vertex<T> vertex, Vertex<T> Neighbor, Edge edge) {
        vertex.addNeighbor(Neighbor, edge);
    }
    
    public Edge addNewEdge(String nameVertex1, String nameVertex2, int weight){
        Edge egnew = new Edge(nameVertex1, nameVertex2, weight, false);
        return egnew;
    }
}
