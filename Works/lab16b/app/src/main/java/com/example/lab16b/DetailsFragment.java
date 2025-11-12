package com.example.lab16b;

import androidx.fragment.app.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.lab16b.R;

public class DetailsFragment extends Fragment {
    TextView name, location;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.list_items_details, container, false);
        name = view.findViewById(R.id.Name);
        location = view.findViewById(R.id.Location);
        return view;
    }

    public void change(String n, String l) {
        name.setText(n);
        location.setText(l);
    }
}
