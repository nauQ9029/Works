package com.example.classwork19;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.google.android.material.tabs.TabLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.GridView;

import com.example.classwork19.adapter.ProductAdapter;
import com.example.classwork19.model.Product;

import java.util.ArrayList;

public class ProductListActivity extends AppCompatActivity {

    GridView gridView;
    ArrayList<Product> productList;
    ProductAdapter adapter;
    TabLayout tabLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        tabLayout = findViewById(R.id.tabLayout);
        tabLayout.addTab(tabLayout.newTab().setText("FEATURED"));
        tabLayout.addTab(tabLayout.newTab().setText("DEALS"));
        tabLayout.addTab(tabLayout.newTab().setText("CATEGORIES"));

        gridView = findViewById(R.id.gridViewProducts);
        productList = new ArrayList<>();

        // Mock data
        productList.add(new Product("Pharmacy", R.drawable.pharmacy));
        productList.add(new Product("Registry", R.drawable.registry));
        productList.add(new Product("Cartwheel", R.drawable.cartwheel));
        productList.add(new Product("Clothing", R.drawable.clothing));
        productList.add(new Product("Shoes", R.drawable.shoes));
        productList.add(new Product("Accessories", R.drawable.accessories));
        productList.add(new Product("Baby", R.drawable.baby));
        productList.add(new Product("Home", R.drawable.home));
        productList.add(new Product("Patio & Garden", R.drawable.patio_garden));

        adapter = new ProductAdapter(this, productList);
        gridView.setAdapter(adapter);

        gridView.setOnItemClickListener((AdapterView<?> parent, android.view.View view, int position, long id) -> {
            Product p = productList.get(position);
            Intent intent = new Intent(ProductListActivity.this, ProductDetailsActivity.class);
            intent.putExtra("name", p.getName());
            intent.putExtra("image", p.getImageResId());
            startActivity(intent);
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.product_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_search) {
            // Handle search
            return true;
        } else if (item.getItemId() == R.id.menu_cart) {
            // Handle cart
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
