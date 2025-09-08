/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 /* TODO:
 *      - Initialize the graph into the program
 *      - Install the Prim algorithm and find the BST of the graph
 *      - Run the program
 */

class MST {

	// Number of vertices in the graph
	private static final int V = 9;

	int minKey(int key[], Boolean mstSet[])
	{
		// Initialize min value
		int min = Integer.MAX_VALUE, min_index = -1;

		for (int v = 0; v < V; v++)
			if (mstSet[v] == false && key[v] < min) {
				min = key[v];
				min_index = v;
			}

		return min_index;
	}
        
	void printMST(int parent[], int graph[][])
	{
		System.out.println("Edge \tWeight");
		for (int i = 1; i < V; i++)
			System.out.println(parent[i] + " - " + i + "\t"
							+ graph[i][parent[i]]);
	}

	void primMST(int graph[][])
	{
		int parent[] = new int[V];

		int key[] = new int[V];

		Boolean mstSet[] = new Boolean[V];

		for (int i = 0; i < V; i++) {
			key[i] = Integer.MAX_VALUE;
			mstSet[i] = false;
		}

		key[0] = 0;
	

		for (int count = 0; count < V - 1; count++) {
			

			int u = minKey(key, mstSet);

			// Add the picked vertex to the MST Set
			mstSet[u] = true;

			for (int v = 0; v < V; v++)

				if (graph[u][v] != 0 && mstSet[v] == false
					&& graph[u][v] < key[v]) {
					parent[v] = u;
					key[v] = graph[u][v];
				}
		}

		// Print the constructed MST
		printMST(parent, graph);
	}
        
	public static void main(String[] args)
	{
		MST t = new MST();            //  0   1   2   3   4   5  6   7  8
		int graph[][] = new int[][] {   { 0,  4,  0,  0,  0,  0, 0,  8, 0 },
                                                { 4,  0,  8,  0,  0,  0, 0, 11, 0 },
                                                { 0,  8,  0,  7,  0,  4, 0,  0, 2 },
                                                { 0,  0,  7,  0,  9, 14, 0,  0, 0 },
                                                { 0,  0,  0,  9,  0, 10, 0,  0, 0 },
                                                { 0,  0,  4, 14, 10,  0, 2,  0, 0 },
                                                { 0,  0,  0,  0,  0,  2, 0,  1, 6 },
                                                { 8, 11,  0,  0,  0,  0, 1,  0, 7 },
                                                { 0,  0,  2,  0,  0,  0, 6,  7, 0 }};
		t.primMST(graph);
	}
}
/*
           [1] - 8 - [2] - 7 - [3]                             [1] - 8 - [2] - 7 - [3]          
          /|          | \      |  \                           /           | \         \  
        4  |          2  \     |   9                        4             2  \         9
      /    |          |   \    |    \                     /               |   \         \
    [0]    11        [8]   4  14    [4]       ->        [0]              [8]   4        [4]
      \    |        / |     \  |    /                                           \
       8   |     8    6      \ |  10                                             \
        \  |   /      |       \|/                                                 \
          [7] - 1 - [6] - 2 - [5]                             [7] - 1 - [6] - 2 - [5]
*/      
