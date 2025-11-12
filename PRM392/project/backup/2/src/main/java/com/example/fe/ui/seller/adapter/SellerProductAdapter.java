package com.example.fe.ui.seller.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.fe.R;
import com.example.fe.models.Product;

import java.util.ArrayList;
import java.util.List;

public class SellerProductAdapter extends RecyclerView.Adapter<SellerProductAdapter.ViewHolder> {

    private final List<Product> products = new ArrayList<>();
    private final Context context;

    public SellerProductAdapter(Context context) {
        this.context = context;
    }

    public void setProducts(List<Product> items) {
        products.clear();
        if (items != null) products.addAll(items);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_seller_product, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product p = products.get(position);
        holder.tvName.setText(p.getName());
        String priceText = String.format("%,.2f", p.getPrice());
        holder.tvPrice.setText("Price: " + priceText);
        holder.tvStock.setText("Stock: " + p.getStockQuantity());

        // load first image if available
        if (p.getImages() != null && !p.getImages().isEmpty()) {
            String url = p.getImages().get(0);
            Glide.with(context)
                    .load(url)
                    .centerCrop()
                    .placeholder(R.drawable.ic_placeholder)
                    .into(holder.ivImage);
        } else {
            holder.ivImage.setImageResource(R.drawable.ic_placeholder);
        }
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivImage;
        TextView tvName, tvPrice, tvStock;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            ivImage = itemView.findViewById(R.id.ivProductImage);
            tvName = itemView.findViewById(R.id.tvProductName);
            tvPrice = itemView.findViewById(R.id.tvProductPrice);
            tvStock = itemView.findViewById(R.id.tvProductStock);
        }
    }
}
