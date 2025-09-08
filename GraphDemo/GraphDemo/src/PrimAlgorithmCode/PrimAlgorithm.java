
package PrimAlgorithmCode;

import java.util.List;

import java.util.*;

public class PrimAlgorithm<T> {

    public List<Edge> primMST(Graph<T> graph) {
        List<Edge> mst = new ArrayList<>();
        Set<Vertex<T>> visited = new HashSet<>();
        
        if (graph.getGp().isEmpty())
            return mst;

        // Chọn một đỉnh bất kỳ để bắt đầu
        Vertex<T> startVertex = graph.getGp().get(0);
        visited.add(startVertex);
        
        // Duyệt qua tất cả các đỉnh của đồ thị
        while (visited.size() < graph.getGp().size()) {
            Edge minEdge = null;
            Vertex<T> minVertex = null;

            // Tìm cạnh nhỏ nhất có thể thêm vào cây bao trùm
            for (Vertex<T> vertex : visited) {
                for (Neighbor<T> neighbor : vertex.getNeighbors()) {
                    if (!visited.contains(neighbor.getVertex())) {
                        Edge edge = neighbor.getEdge();
                        if (minEdge == null || edge.getWeight() < minEdge.getWeight()) {
                            minEdge = edge;
                            minVertex = neighbor.getVertex();
                        }
                    }
                }
            }

            if (minEdge != null && minVertex != null) {
                minEdge.setIncluded(true); // Đánh dấu cạnh này đã được bao gồm trong cây bao trùm
                mst.add(minEdge);
                visited.add(minVertex); // Đánh dấu đỉnh kề đã được thăm
            }
        }

        return mst;
    }
    
    public void printMST(List<Edge> mst) {
        System.out.println("Minimum Spanning Tree:");
        for (Edge edge : mst) {
            System.out.println("Edge: " + edge.getWeight() + " from " + edge.getName1() + " to " + edge.getName2()
                                    + " (or " + edge.getName2() + " to " + edge.getName1() + ")");
        }
    }
    

    public static void main(String[] args) {
        Graph<String> graph = new Graph<>();
        Vertex<String> a = graph.addNewVertex("A");
        Vertex<String> b = graph.addNewVertex("B");
        Vertex<String> c = graph.addNewVertex("C");
        Vertex<String> d = graph.addNewVertex("D");
        Vertex<String> e = graph.addNewVertex("E");

        Edge ab = graph.addNewEdge("a","b",4);
        Edge ac = graph.addNewEdge("a","c",2);
        Edge ad = graph.addNewEdge("a","d",5);
        Edge bc = graph.addNewEdge("b","c",1);
        Edge cd = graph.addNewEdge("c","d",3);
        Edge ce = graph.addNewEdge("c","e",7);
        Edge de = graph.addNewEdge("d","e",6);

        graph.addNewNeighbor(a, b, ab);
        graph.addNewNeighbor(b, a, ab);
        
        graph.addNewNeighbor(a, c, ac);
        graph.addNewNeighbor(c, a, ac);
        
        graph.addNewNeighbor(a, d, ad);
        graph.addNewNeighbor(d, a, ad);
        
        graph.addNewNeighbor(b, c, bc);
        graph.addNewNeighbor(c, b, bc);
        
        graph.addNewNeighbor(c, d, cd);
        graph.addNewNeighbor(d, c, cd);
        
        graph.addNewNeighbor(c, e, ce);
        graph.addNewNeighbor(e, c, ce);
        
        graph.addNewNeighbor(d, e, de);
        graph.addNewNeighbor(e, d, de);
        
        PrimAlgorithm<String> prim = new PrimAlgorithm<>();
        List<Edge> mst = prim.primMST(graph);

        prim.printMST(mst);
    }
}

