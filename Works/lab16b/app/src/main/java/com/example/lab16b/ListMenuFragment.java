package com.example.lab16b;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.fragment.app.ListFragment;

import com.example.lab16b.DetailsFragment;
import com.example.lab16b.R;

public class ListMenuFragment extends ListFragment {
    String[] users = new String[] { "Laptop","Ram","Monitor","Mobile","Mouse","Keyboard" };
    String[] location = new String[]{"USA","Malaysia","ThaiLand","China","Ukraina","Singapo"};

    @Override public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view =inflater.inflate(R.layout.list_items_info, container, false);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, users);
        setListAdapter(adapter); return view;
    }

    @Override public void onListItemClick(ListView l, View v, int position, long id) {
        DetailsFragment txt = (DetailsFragment)getFragmentManager().findFragmentById(R.id.fragment2);
        txt.change("Name: "+ users[position],"Location : "+ location[position]);
        getListView().setSelector(android.R.color.holo_blue_dark);
    }
}
