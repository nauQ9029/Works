package com.example.fe.ui.seller;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.fe.R;
import com.example.fe.models.Product;
import com.example.fe.ui.seller.adapter.SellerProductAdapter;

import java.util.ArrayList;
import java.util.List;

public class SellerActivity extends AppCompatActivity {

    private TextView tvSellerName, tvNewOrders;
    private ImageView icNotifications;
    private EditText etSearch;
    private RecyclerView recyclerProducts;
    private SellerProductAdapter adapter;

    private List<Product> productList = new ArrayList<>(); // placeholder list

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.seller_home_dashboard);

        initViews();
        setupRecyclerView();
        loadProducts();
        setupSearch();
        setupQuickActions();
        setupNotifications();
    }

    private void initViews() {
        tvSellerName = findViewById(R.id.tvSellerName);
        tvNewOrders = findViewById(R.id.tvNewOrders);
        icNotifications = findViewById(R.id.icNotifications);
        etSearch = findViewById(R.id.etSearch);
        recyclerProducts = findViewById(R.id.recyclerProducts);
    }

    private void setupRecyclerView() {
        adapter = new SellerProductAdapter(this);
        recyclerProducts.setLayoutManager(new LinearLayoutManager(this));
        recyclerProducts.setAdapter(adapter);
    }

    private void loadProducts() {
        // Example dummy data; replace with your API call
        for (int i = 1; i <= 10; i++) {
            Product p = new ProductBuilder()
                    .setId(String.valueOf(i))
                    .setName("Product " + i)
                    .setPrice(10.0 * i)
                    .setStockQuantity(5 + i)
                    .setImages(new ArrayList<>()) // add URLs if available
                    .build();
            productList.add(p);
        }
        adapter.setProducts(productList);
    }

    private void setupSearch() {
        etSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) { }

            @Override
            public void afterTextChanged(Editable s) {
                filterProducts(s.toString());
            }
        });
    }

    private void filterProducts(String query) {
        List<Product> filtered = new ArrayList<>();
        for (Product p : productList) {
            if (p.getName().toLowerCase().contains(query.toLowerCase())) {
                filtered.add(p);
            }
        }
        adapter.setProducts(filtered);
    }

    private void setupQuickActions() {
        Button btnAddProduct = findViewById(R.id.btnAddProduct);
        Button btnViewOrders = findViewById(R.id.btnViewOrders);
        Button btnManageStock = findViewById(R.id.btnManageStock);

        btnAddProduct.setOnClickListener(v -> Toast.makeText(this, "Add Product clicked", Toast.LENGTH_SHORT).show());
        btnViewOrders.setOnClickListener(v -> Toast.makeText(this, "View Orders clicked", Toast.LENGTH_SHORT).show());
        btnManageStock.setOnClickListener(v -> Toast.makeText(this, "Manage Stock clicked", Toast.LENGTH_SHORT).show());
    }

    private void setupNotifications() {
        icNotifications.setOnClickListener(v ->
                Toast.makeText(this, "Notifications clicked", Toast.LENGTH_SHORT).show()
        );
    }

    // Temporary builder class for dummy data
    static class ProductBuilder {
        private final Product p = new Product();

        ProductBuilder setId(String id) { p.id = id; return this; }
        ProductBuilder setName(String name) { p.name = name; return this; }
        ProductBuilder setPrice(double price) { p.price = price; return this; }
        ProductBuilder setStockQuantity(int qty) { p.stockQuantity = qty; return this; }
        ProductBuilder setImages(List<String> images) { p.images = images; return this; }
        Product build() { return p; }
    }
}
