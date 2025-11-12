package com.example.pe_prm392.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.pe_prm392.BookDetailActivity;
import com.example.pe_prm392.R;
import com.example.pe_prm392.models.Book;
import com.example.pe_prm392.storage.BookStorage;

import java.util.ArrayList;

public class BookAdapter extends RecyclerView.Adapter<BookAdapter.ViewHolder> {

    Context context;
    ArrayList<Book> list;
    ArrayList<Book> original;

    public BookAdapter(Context ctx, ArrayList<Book> list) {
        this.context = ctx;
        this.list = list;
        this.original = new ArrayList<>(list);
    }

    public void filter(String text) {
        list.clear();
        if(text.isEmpty()) list.addAll(original);
        else {
            for(Book b : original)
                if(b.getName().toLowerCase().contains(text.toLowerCase()))
                    list.add(b);
        }
        notifyDataSetChanged();
    }

    @Override
    public void onBindViewHolder(ViewHolder h, int i) {
        Book b = list.get(i);
        h.tvName.setText(b.getName());
        h.tvType.setText(b.getType());
        h.tvPrice.setText("$" + b.getPrice());
        h.tvQty.setText("" + b.getQuantity());
        h.tvTotal.setText("$" + b.getTotalValue());

        h.btnDelete.setOnClickListener(v -> {
            BookStorage.getInstance().deleteBook(i);
            notifyDataSetChanged();
        });

        h.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, BookDetailActivity.class);
            intent.putExtra("index", i);
            context.startActivity(intent);
        });
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup p, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.item_book, p, false);
        return new ViewHolder(v);
    }

    @Override
    public int getItemCount() { return list.size(); }

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvType, tvPrice, tvQty, tvTotal;
        Button btnDelete;

        public ViewHolder(View v) {
            super(v);
            tvName = v.findViewById(R.id.tvName);
            tvType = v.findViewById(R.id.tvType);
            tvPrice = v.findViewById(R.id.tvPrice);
            tvQty = v.findViewById(R.id.tvQty);
            tvTotal = v.findViewById(R.id.tvTotal);
            btnDelete = v.findViewById(R.id.btnDelete);
        }
    }
}

