package com.example.pe_prm392.storage;

import com.example.pe_prm392.models.Book;
import java.util.ArrayList;

public class BookStorage {
    private static BookStorage instance;
    private ArrayList<Book> bookList = new ArrayList<>();
    private BookStorage() {
        bookList.add(new Book("The Great Galaxy", "Classic", 64.15, 5));
        bookList.add(new Book("1984", "Dinosaur", 15, 3));
        bookList.add(new Book("abcd", "normal", 60, 10));
        bookList.add(new Book("bdfg", "ob", 13, 4));
    }
    public static BookStorage getInstance() {
        if(instance == null) instance = new BookStorage();
        return instance;
    }
    public ArrayList<Book> getBooks() {
        return bookList;
    }
    public void addBook(Book book) {
        bookList.add(book);
    }
    public void deleteBook(int index) {
        bookList.remove(index);
    }
}

