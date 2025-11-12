package com.example.pe_prm392;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.pe_prm392.models.Book;
import com.example.pe_prm392.storage.BookStorage;

public class BookInputActivity extends AppCompatActivity {
    EditText etName, etType, etPrice, etQty;
    Button btnAdd;
    LinearLayout btnAddBook, btnBookList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_input);

        btnAddBook = findViewById(R.id.btnAddBook);
        btnBookList = findViewById(R.id.btnBookList);

        etName = findViewById(R.id.etName);
        etType = findViewById(R.id.etType);
        etPrice = findViewById(R.id.etPrice);
        etQty = findViewById(R.id.etQty);
        btnAdd = findViewById(R.id.btnAdd);

        btnAdd.setOnClickListener(v -> {
            String name = etName.getText().toString();
            String type = etType.getText().toString();
            String priceStr = etPrice.getText().toString();
            String qtyStr = etQty.getText().toString();

            if(name.isEmpty() || type.isEmpty() || priceStr.isEmpty() || qtyStr.isEmpty()) {
                Toast.makeText(this, "All fields required!", Toast.LENGTH_SHORT).show();
                return;
            }

            double price = Double.parseDouble(priceStr);
            int qty = Integer.parseInt(qtyStr);

            if(price <= 0 || qty <= 0) {
                Toast.makeText(this, "Price and Quantity must be positive!", Toast.LENGTH_SHORT).show();
                return;
            }

            BookStorage.getInstance().addBook(new Book(name, type, price, qty));

            new AlertDialog.Builder(this)
                    .setTitle("Success")
                    .setMessage("Book added successfully!")
                    .setPositiveButton("OK", (d, w) -> finish())
                    .show();
        });

        btnAddBook.setOnClickListener(v ->
                startActivity(new Intent(BookInputActivity.this, BookInputActivity.class))
        );

        btnBookList.setOnClickListener(v ->
                startActivity(new Intent(BookInputActivity.this, BookManagerActivity.class))
        );
    }
}
