package com.example.lab10.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.lab10.R;
import com.example.lab10.model.Song;

import java.util.List;

public class SongAdapter extends ArrayAdapter<Song> {

    public SongAdapter(Context context, List<Song> songs) {
        super(context, 0, songs);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Song song = getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.song_item, parent, false);
        }

        TextView title = convertView.findViewById(R.id.songTitle);
        TextView artist = convertView.findViewById(R.id.songArtist);

        title.setText(song.getTitle());
        artist.setText(song.getArtist());

        return convertView;
    }
}
