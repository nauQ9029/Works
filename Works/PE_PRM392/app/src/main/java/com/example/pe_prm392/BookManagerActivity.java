package com.example.pe_prm392;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SearchView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.pe_prm392.adapters.BookAdapter;
import com.example.pe_prm392.models.Book;
import com.example.pe_prm392.storage.BookStorage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class BookManagerActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    TextView tvTotal;
    SearchView searchView;
    Button btnAsc, btnDesc;
    LinearLayout btnAddBook, btnBookList;
    BookAdapter adapter;
    ArrayList<Book> data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_manager);

        recyclerView = findViewById(R.id.recyclerBooks);
        searchView = findViewById(R.id.search);
        tvTotal = findViewById(R.id.tvTotal);
        btnAsc = findViewById(R.id.btnAsc);
        btnDesc = findViewById(R.id.btnDesc);

        btnAddBook = findViewById(R.id.btnAddBook);
        btnBookList = findViewById(R.id.btnBookList);

        btnAddBook.setOnClickListener(v ->
                startActivity(new Intent(BookManagerActivity.this, BookInputActivity.class))
        );

        btnBookList.setOnClickListener(v ->
                startActivity(new Intent(BookManagerActivity.this, BookManagerActivity.class))
        );

        data = BookStorage.getInstance().getBooks();
        Log.d("DEBUG", "Books loaded = " + data.size());

        adapter = new BookAdapter(this, data);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter);

        // Sorting handlers: sort the underlying data and refresh adapter
        btnAsc.setOnClickListener(v -> {
            // Sort by price ascending
            Collections.sort(data, new Comparator<Book>() {
                @Override
                public int compare(Book b1, Book b2) {
                    return Double.compare(b1.getPrice(), b2.getPrice());
                }
            });
            adapter = new BookAdapter(this, data);
            recyclerView.setAdapter(adapter);
            updateTotal();
        });

        btnDesc.setOnClickListener(v -> {
            // Sort by price descending
            Collections.sort(data, new Comparator<Book>() {
                @Override
                public int compare(Book b1, Book b2) {
                    return Double.compare(b2.getPrice(), b1.getPrice());
                }
            });
            adapter = new BookAdapter(this, data);
            recyclerView.setAdapter(adapter);
            updateTotal();
        });

        updateTotal();
    }

    @Override
    protected void onResume() {
        super.onResume();
        data = BookStorage.getInstance().getBooks();
        adapter = new BookAdapter(this, data);
        recyclerView.setAdapter(adapter);
        updateTotal();
    }

    private void updateTotal() {
        double total = 0;
        for(Book b : data) total += b.getTotalValue();
        tvTotal.setText("Total Value: $" + total);
    }
}
