package PrimAlgorithm;

public class Prim {

    void findMinSpanningTree(Graph g) {

        // key values to all vertices
        int[] key = new int[g.countVertex];

        boolean[] minSpanningTreeSet = new boolean[g.countVertex];
        int[] parent = new int[g.countVertex];

        // Khởi tạo key và minSpanningTreeSet
        for (int i = 0; i < g.countVertex; i++) {
            key[i] = Integer.MAX_VALUE;
            minSpanningTreeSet[i] = false;
        }

        // Gán giá trị key của đỉnh đầu tiên là 0
        key[0] = 0;

        for (int count = 0; count < g.countVertex - 1; count++) {

            // Lấy đỉnh có key nhỏ nhất và chưa thuộc cây bao trùm nhỏ nhất
            int u = minKey(g, key, minSpanningTreeSet);

            // Đánh dấu u đã được thêm vào cây bao trùm nhỏ nhất
            minSpanningTreeSet[u] = true;

            // Cập nhật key và parent của các đỉnh kề với u
            for (int v = 0; v < g.countVertex; v++) {
                if (g.adjMatrix[u][v] != 0 && !minSpanningTreeSet[v] && g.adjMatrix[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = g.adjMatrix[u][v];
                }
            }
        }

        printMinSpanningTree(g, parent);
    }

    private void printMinSpanningTree(Graph g, int[] parent) {
        System.out.println("Edge \tWeight");
        for (int i = 1; i < g.countVertex; i++) {
            System.out.println(parent[i] + " - " + i + "\t" + g.adjMatrix[i][parent[i]]);
        }
    }

    private int minKey(Graph g, int[] key, boolean[] minSpanningTreeSet) {
        int min = Integer.MAX_VALUE;
        int minIndex = -1;
        for (int i = 0; i < g.countVertex; i++) {
            if (!minSpanningTreeSet[i] && key[i] < min) {
                min = key[i];
                minIndex = i;
            }
        }
        return minIndex;
    }

    public static void main(String[] args) {
        Graph graph = new Graph(9, false);

        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 7, 8);

        graph.addEdge(1, 7, 11);

        graph.addEdge(1, 2, 8);
        graph.addEdge(7, 8, 7);
        graph.addEdge(7, 6, 1);

        graph.addEdge(2, 8, 2);
        graph.addEdge(8, 6, 6);

        graph.addEdge(2, 3, 7);
        graph.addEdge(2, 5, 4);
        graph.addEdge(6, 5, 2);

      //  graph.addEdge(3, 5, 14);

        graph.addEdge(3, 4, 9);
        graph.addEdge(5, 4, 10);

        Prim p = new Prim();
        p.findMinSpanningTree(graph);
    }

}
