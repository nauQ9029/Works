package com.example.pe_prm392;

import android.content.Intent;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.pe_prm392.models.Book;
import com.example.pe_prm392.storage.BookStorage;

public class BookDetailActivity extends AppCompatActivity {

    TextView tvName, tvType, tvPrice, tvQty, tvTotal;
    LinearLayout btnAddBook, btnBookList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);

        btnAddBook = findViewById(R.id.btnAddBook);
        btnBookList = findViewById(R.id.btnBookList);

        int index = getIntent().getIntExtra("index", -1);
        Book book = BookStorage.getInstance().getBooks().get(index);

        tvName = findViewById(R.id.tvName);
        tvType = findViewById(R.id.tvType);
        tvPrice = findViewById(R.id.tvPrice);
        tvQty = findViewById(R.id.tvQty);
        tvTotal = findViewById(R.id.tvTotal);

        tvName.setText(book.getName());
        tvType.setText(book.getType());
        tvPrice.setText("$" + book.getPrice());
        tvQty.setText("" + book.getQuantity());
        tvTotal.setText("$" + book.getTotalValue());

        btnAddBook.setOnClickListener(v ->
                startActivity(new Intent(BookDetailActivity.this, BookInputActivity.class))
        );

        btnBookList.setOnClickListener(v ->
                startActivity(new Intent(BookDetailActivity.this, BookManagerActivity.class))
        );
    }
}
