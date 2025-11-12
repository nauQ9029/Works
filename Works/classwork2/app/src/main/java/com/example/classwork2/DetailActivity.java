package com.example.classwork2;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.classwork2.service.DatabaseHelper;
import com.example.classwork2.model.Product;

public class DetailActivity extends AppCompatActivity {

    private static final int PICK_IMAGE_REQUEST = 100;
    private static final int STORAGE_PERMISSION_CODE = 200;

    ImageView imageView;
    EditText descView, priceView;
    TextView nameView;
    Button btnUpdate, btnDelete;

    DatabaseHelper db;
    Product currentProduct;
    Uri selectedImageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        db = new DatabaseHelper(this);

        imageView = findViewById(R.id.detailImage);
        nameView = findViewById(R.id.detailName);
        descView = findViewById(R.id.detailDesc);
        priceView = findViewById(R.id.detailPrice);
        btnUpdate = findViewById(R.id.btnUpdate);
        btnDelete = findViewById(R.id.btnDelete);

        Intent intent = getIntent();
        int id = intent.getIntExtra("id", -1);
        String name = intent.getStringExtra("name");
        String desc = intent.getStringExtra("description");
        double price = intent.getDoubleExtra("price", 0);
        String productImage = intent.getStringExtra("iamge");

        currentProduct = new Product(id, name, desc, price, productImage);

        nameView.setText(name);
        descView.setText(desc);
        priceView.setText(String.valueOf(price));

        imageView.setOnClickListener(v -> checkStoragePermission());

        btnUpdate.setOnClickListener(v -> {
            currentProduct.setDescription(descView.getText().toString());
            currentProduct.setPrice(Double.parseDouble(priceView.getText().toString()));
            db.updateProduct(currentProduct);
            Toast.makeText(this, "Product updated", Toast.LENGTH_SHORT).show();
        });

        btnDelete.setOnClickListener(v -> {
            db.deleteProduct(currentProduct.getId());
            Toast.makeText(this, "Product deleted", Toast.LENGTH_SHORT).show();
            finish();
        });
    }

    private void checkStoragePermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, STORAGE_PERMISSION_CODE);
        } else {
            pickImageFromGallery();
        }
    }

    private void pickImageFromGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null) {
            selectedImageUri = data.getData();
            imageView.setImageURI(selectedImageUri);
        }
    }
}
