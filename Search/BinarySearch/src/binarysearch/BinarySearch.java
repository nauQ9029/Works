/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package binarysearch;


/**
 *
 * @author plmin
 */

/*
public class BinarySearch {
    //Calculate the mid and compare it with the key(searching element)
    //If the key is equals to the mid element, the algorithm stops
    //If the key is less than mid element, move to left and continue until the key
    // element is found, and vice versa.
    
    int binarySearch(int arr[], int x) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;

            // Check if x is present at mid
            if (arr[m] == x) {
                return m;
            }

            // If x greater, ignore left half
            if (arr[m] < x) {
                l = m + 1;
            } // If x is smaller, ignore right half
            else {
                r = m - 1;
            }
        }
        // If we reach here, then element was not present
        return -1;
    }

    public static void main(String args[]) {
        BinarySearch ob = new BinarySearch();
        int arr[] = {-1, 5, 6, 18, 19, 25, 46, 78, 102, 114};
        int n = arr.length;
        int x = 6;
        int result = ob.binarySearch(arr, x);
        if (result == -1) {
            System.out.println(
                    "Element is not present in array");
        } else {
            System.out.println("Element is present at "
                    + "index " + result);
        }
    }
}
*/