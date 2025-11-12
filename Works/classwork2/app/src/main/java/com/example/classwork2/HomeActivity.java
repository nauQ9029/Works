package com.example.classwork2;

import android.os.Bundle;
import android.view.Menu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.classwork2.adapter.ProductAdapter;
import com.example.classwork2.service.DatabaseHelper;
import com.example.classwork2.model.Product;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.tabs.TabLayout;

import java.util.List;

public class HomeActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    ProductAdapter adapter;
    DatabaseHelper db;
    List<Product> productList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        db = new DatabaseHelper(this);

        MaterialToolbar toolbar = findViewById(R.id.topAppBar);
        setSupportActionBar(toolbar);

        toolbar.setOnMenuItemClickListener(item -> {
            if (item.getItemId() == R.id.action_search) {
                Toast.makeText(this, "Search clicked", Toast.LENGTH_SHORT).show();
                return true;
            } else if (item.getItemId() == R.id.action_cart) {
                Toast.makeText(this, "Cart clicked", Toast.LENGTH_SHORT).show();
                return true;
            }
            return false;
        });

        TabLayout tabLayout = findViewById(R.id.tabLayout);
        tabLayout.addTab(tabLayout.newTab().setText("FEATURED"));
        tabLayout.addTab(tabLayout.newTab().setText("DEALS"));
        tabLayout.addTab(tabLayout.newTab().setText("CATEGORIES"));

        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

        loadProducts();

        // Example CRUD actions
        insertSampleProduct();
        updateSampleProduct();
        deleteSampleProduct();
    }

    private void loadProducts() {
        productList = db.getAllProducts();
        adapter = new ProductAdapter(productList, this);
        recyclerView.setAdapter(adapter);
    }

    private void insertSampleProduct() {
        Product newProduct = new Product(0, "Tablet", "New Android Tablet", 7500000);
        db.insertProduct(newProduct);
        loadProducts();
        Toast.makeText(this, "Inserted Tablet", Toast.LENGTH_SHORT).show();
    }

    private void updateSampleProduct() {
        if (!productList.isEmpty()) {
            Product first = productList.get(0);
            first.setPrice(21000000);
            db.updateProduct(first);
            loadProducts();
            Toast.makeText(this, "Updated first product", Toast.LENGTH_SHORT).show();
        }
    }

    private void deleteSampleProduct() {
        if (!productList.isEmpty()) {
            int lastId = productList.get(productList.size() - 1).getId();
            db.deleteProduct(lastId);
            loadProducts();
            Toast.makeText(this, "Deleted last product", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.top_app_bar_menu, menu);
        return true;
    }
}
