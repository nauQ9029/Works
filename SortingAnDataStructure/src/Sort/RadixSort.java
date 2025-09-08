
package Sort;

//Độ phức tạp của thuật toán Radix Sort là O(nk), trong đó:
//
//n là số lượng phần tử cần sắp xếp.
//k là số lượng digits lớn nhất trong các số đó. Đối với các số nguyên, k tương đương với số lượng digits của số lớn nhất trong tập dữ liệu.
//Trong trường hợp số lượng digits lớn nhất k là một hằng số, thì Radix Sort chạy trong thời gian tuyến tính O(n).
//
//Tuy nhiên, nếu k tỉ lệ tăng dần theo kích thước của dữ liệu đầu vào, thì độ phức tạp của Radix Sort sẽ tăng lên tuyến tính với n. Điều này thường xảy ra khi dữ liệu đầu vào có thể có các số với số lượng digits khác nhau và k có thể trở thành một yếu tố quyết định cho hiệu suất của thuật toán.

import java.util.Arrays;

public class RadixSort {

    // A utility function to get the maximum value in arr[]
    private int getMax(int arr[]) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++)
            if (arr[i] > max)
                max = arr[i];
        return max;
    }

    // A function to do counting sort of arr[] according to the digit represented by exp.
    private void countingSort(int arr[], int exp) {
        int n = arr.length;
        int output[] = new int[n]; // output array
        int count[] = new int[10];
        Arrays.fill(count, 0);

        // Store count of occurrences in count[]
        for (int i = 0; i < n; i++)
            count[(arr[i] / exp) % 10]++;

        // Change count[i] so that count[i] now contains actual position of this digit in output[]
        for (int i = 1; i < 10; i++)
            count[i] += count[i - 1];

        // Build the output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers according to the current digit
        for (int i = 0; i < n; i++)
            arr[i] = output[i];
    }

    // The main function to that sorts arr[] using Radix Sort
    public void radixSort(int arr[]) {
        int max = getMax(arr);
        for (int exp = 1; max / exp > 0; exp *= 10)
            countingSort(arr, exp);
    }

    // A utility function to print an array
    public void printArray(int arr[]) {
        for (int i = 0; i < arr.length; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    // Driver Code
    public static void main(String[] args) {
        int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
        RadixSort radixSort = new RadixSort();
        radixSort.radixSort(arr);
        radixSort.printArray(arr);
    }
}


