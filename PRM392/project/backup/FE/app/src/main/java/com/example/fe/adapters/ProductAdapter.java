package com.example.fe.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.fe.R;
import com.example.fe.models.Product;

import java.util.List;

public class ProductAdapter extends BaseAdapter {
    private Context context;
    private List<Product> productList;

    public ProductAdapter(Context context, List<Product> productList) {
        this.context = context;
        this.productList = productList;
    }

    @Override
    public int getCount() {
        return productList.size();
    }

    @Override
    public Object getItem(int position) {
        return productList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context)
                    .inflate(R.layout.item_product, parent, false);
        }

        Product product = productList.get(position);
        TextView tvName = convertView.findViewById(R.id.tvProductName);
        TextView tvPrice = convertView.findViewById(R.id.tvProductPrice);
        ImageView ivProduct = convertView.findViewById(R.id.ivProduct);

        tvName.setText(product.getName());
        tvPrice.setText("$" + product.getPrice());

        Glide.with(context)
                .load(product.getImageUrl())
                .placeholder(R.drawable.ic_placeholder)
                .into(ivProduct);

        return convertView;
    }
}
