package PrimAlgorithmCode;

public class Edge {
    private String name1;
    private String name2;
    private final int weight;
    private boolean included;

    public Edge(String nameVertex1, String nameVertex2, int weight, boolean included) {
        this.name1 = nameVertex1;
        this.name2 = nameVertex2;
        this.weight = weight;
        this.included = included;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }
    
    public boolean isIncluded() {
        return included;
    }

    public void setIncluded(boolean included) {
        this.included = included;
    }

    public int getWeight() {
        return weight;
    }

}
