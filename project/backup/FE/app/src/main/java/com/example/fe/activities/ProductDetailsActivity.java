package com.example.fe.activities;

import android.os.Bundle;
import android.widget.GridView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.fe.R;
import com.example.fe.adapters.ProductAdapter;
import com.example.fe.data.MockData;
import com.example.fe.models.Product;

import java.util.List;

public class ProductDetailsActivity extends AppCompatActivity {
    private GridView gridView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_details);

        gridView = findViewById(R.id.gridProducts);

        // Load mock data
        List<Product> products = MockData.getMockProducts();

        // Attach adapter
        ProductAdapter adapter = new ProductAdapter(this, products);
        gridView.setAdapter(adapter);
    }
}
