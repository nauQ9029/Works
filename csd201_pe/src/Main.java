
import java.util.EmptyStackException;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class Task {

    private String ID;
    private String descrip;
    private String priority;

    public Task(String ID, String descrip, String priority) {
        this.ID = ID;
        this.descrip = descrip;
        this.priority = priority;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getDescrip() {
        return descrip;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {
        return ID + descrip + priority;
    }

    public int compareTo(Task other) {
        return this.ID.compareTo(other.priority);
    }
}

class ArrayStack {

    protected Object[] a;
    int top, max;

    public ArrayStack() {
        this(50);
    }

    public ArrayStack(int max1) {
        max = max1;
        a = new Object[max];
        top = -1;
    }

    protected boolean grow() {
        int max1 = max + max / 2;
        Object[] a1 = new Object[max1];
        if (a1 == null) {
            return false;
        }
        for (int i = 0; i <= top; i++) {
            a1[i] = a[i];
        }
        a = a1;
        max = max1; // Update max to the new size
        return true;
    }

    public boolean isEmpty() {
        return (top == -1);
    }

    public boolean isFull() {
        return (top == max - 1);
    }

    public void clear() {
        top = -1;
    }

    public void push(Object x) {
        if (isFull() && !grow()) {
            return;
        }
        a[++top] = x;
    }

    Object top() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return (a[top]);
    }

    public Object pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        Object x = a[top];
        top--;
        return (x);
    }
}

class Array {
	private int[] a;
	private int nEle;
        private String ID;
        private String descrip;
        private String priority;
	
	public Array(int size) {
		a = new int[size];
		nEle = 0;
	}

	public int getNumEle() {
		return nEle;
	}
 
        
	public void display() {
		for(int i=0; i<nEle; i++) 
			System.out.print(a[i] + " ");

		System.out.println();
	}

	public void insert(String ID, String descrop, String priority) {
		a[nEle] = val;
		nEle++;
	}

	public int search(int val) {
		int i;
		for(i=0; i<nEle; i++) 
			if(a[i] == val) break; 

		if(i == nEle) return (-1);
		else return i;
	}

	public int delete(int val) {
		int index = search(val);
		if(index != -1) {
			for(int k=index; k<nEle-1; k++) { 
				a[k] = a[k+1];
			}
			nEle--;
			return 1;
		}else {
			return 0;
		}	
	}	
}


class MergeSort {

    private int[] array;

    public MergeSort(int[] array) {
        this.array = array;
    }

    public void mergeSort(int p, int r) {
        if (p < r) {
            int q = (p + r) / 2;
            mergeSort(p, q);
            mergeSort(q + 1, r);
            merge(p, q, r);
        }
    }

    private void merge(int p, int q, int r) {
        int n1 = q - p + 1;
        int n2 = r - q;

        int[] left = new int[n1];
        int[] right = new int[n2];

        for (int i = 0; i < n1; i++) {
            left[i] = array[p + i];
        }
        for (int j = 0; j < n2; j++) {
            right[j] = array[q + 1 + j];
        }

        int i = 0, j = 0, k = p;
        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = left[i];
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = right[j];
            j++;
            k++;
        }
    }

    public void display() {
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
    
    /*
    - MergeSort makes partitioning as simple as possible and concentrates on merging sorted halves of an array into one sorted array
    - QuickSort has similar complexity time to MergeSort O(nlogn) but if the pivot choosen is bad, the complexity time of QuickSort can be up to O(n^2)
    */
    
}


public class Main {

    public static void main(String[] args) {
        Task[] tasks = new Task[];
    }
}
