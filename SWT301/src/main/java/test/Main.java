package test;

public class Main {
    public static int checkOpNumber(int n, String op) {
        switch (op) {
            case "Perfect":
                int i, sum;
                sum = 0;
                for (i = 1; i < n; i++) {
                    if (n % i == 0) {
                        sum = sum + i;
                    }
                }
                if (sum == n) {
                    return 1;
                } else return 0;

            case "Square":
                int sqr = (int)Math.sqrt(n);

            default:
                return -1;
        }
    }

    public static void main(String[] args) {
        var i = checkOpNumber(6, "Perfect");
        System.out.println(i);
    }
}
