package com.example.lab8;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.os.Bundle;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    Toolbar mToolbar;
    RecyclerView mRecyclerView;
    List<CatData> mCatList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mToolbar = findViewById(R.id.toolbar);
        mToolbar.setTitle(getResources().getString(R.string.app_name));

        mRecyclerView = findViewById(R.id.recyclerview);
        GridLayoutManager mGridLayoutManager = new GridLayoutManager(MainActivity.this, 2);
        mRecyclerView.setLayoutManager(mGridLayoutManager);

        mCatList = new ArrayList<>();
        mCatList.add(new CatData("Persian", getString(R.string.description_cat1), R.drawable.cat1));
        mCatList.add(new CatData("Siamese", getString(R.string.description_cat2), R.drawable.cat2));
        mCatList.add(new CatData("Maine Coon", getString(R.string.description_cat3), R.drawable.cat3));
        mCatList.add(new CatData("Bengal", getString(R.string.description_cat4), R.drawable.cat4));
        mCatList.add(new CatData("Sphynx", getString(R.string.description_cat5), R.drawable.cat5));
        mCatList.add(new CatData("Phoenix", getString(R.string.description_cat6), R.drawable.cat6));
        mCatList.add(new CatData("Duck", getString(R.string.description_cat7), R.drawable.cat7));
        mCatList.add(new CatData("John Pork", getString(R.string.description_cat8), R.drawable.cat8));

        MyAdapter myAdapter = new MyAdapter(MainActivity.this, mCatList);
        mRecyclerView.setAdapter(myAdapter);
    }
}

