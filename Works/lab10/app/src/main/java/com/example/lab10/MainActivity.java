package com.example.lab10;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.SeekBar;
import android.widget.Toast;
import android.os.Handler;

import com.example.lab10.model.Song;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class MainActivity extends AppCompatActivity {

    private static final int STORAGE_PERMISSION_CODE = 1;
    private static final int PICK_AUDIO_REQUEST = 2;
    private static final String PREFS_NAME = "SongPrefs";
    private static final String IMPORTED_SONGS_KEY = "ImportedSongs";

    private ListView listView;
    private ImageButton btnImport;
    private ImageButton btnPlayPause, btnNext, btnPrev;
    private SeekBar seekBar;

    private ArrayList<Song> songList = new ArrayList<>();
    private ArrayAdapter<String> adapter;
    private MediaPlayer mediaPlayer;
    private Handler handler = new Handler();
    private Runnable updateSeekBar;
    private String currentSongPath = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = findViewById(R.id.listViewSongs);
        btnImport = findViewById(R.id.btnImport);
        btnPlayPause = findViewById(R.id.btnPlayPause);
        btnNext = findViewById(R.id.btnNext);
        btnPrev = findViewById(R.id.btnPrev);
        seekBar = findViewById(R.id.seekBar);
        seekBar.setMax(100);

        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, new ArrayList<>());
        listView.setAdapter(adapter);

        // Ask permission for reading external storage
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, STORAGE_PERMISSION_CODE);
        } else {
            loadBuiltInSongs();
            loadImportedSongs();
        }

        btnImport.setOnClickListener(v -> openFilePicker());

        listView.setOnItemClickListener((adapterView, view, position, id) -> {
            playSong(songList.get(position).getPath());
        });

        btnPlayPause.setOnClickListener(v -> {
            if (mediaPlayer != null && mediaPlayer.isPlaying()) {
                mediaPlayer.pause();
                btnPlayPause.setImageResource(R.drawable.play);
            } else if (mediaPlayer != null) {
                mediaPlayer.start();
                btnPlayPause.setImageResource(R.drawable.pause);
            } else if (!songList.isEmpty()) {
                playSong(songList.get(0).getPath());
                btnPlayPause.setImageResource(R.drawable.pause);
            }
        });

        btnNext.setOnClickListener(v -> {
            int currentIndex = getCurrentSongIndex();
            if (currentIndex < songList.size() - 1) {
                playSong(songList.get(currentIndex + 1).getPath());
            } else {
                Toast.makeText(this, "No next song", Toast.LENGTH_SHORT).show();
            }
        });

        btnPrev.setOnClickListener(v -> {
            int currentIndex = getCurrentSongIndex();
            if (currentIndex > 0) {
                playSong(songList.get(currentIndex - 1).getPath());
            } else {
                Toast.makeText(this, "No previous song", Toast.LENGTH_SHORT).show();
            }
        });

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                if (fromUser && mediaPlayer != null) {
                    int newPosition = (mediaPlayer.getDuration() * progress) / 100;
                    mediaPlayer.seekTo(newPosition);
                }
            }
            @Override public void onStartTrackingTouch(SeekBar seekBar) {}
            @Override public void onStopTrackingTouch(SeekBar seekBar) {}
        });
    }

    private int getCurrentSongIndex() {
        if (mediaPlayer == null) return -1;
        for (int i = 0; i < songList.size(); i++) {
            if (songList.get(i).getPath().equals(currentSongPath)) {
                return i;
            }
        }
        return -1;
    }

    /** Load built-in songs from res/raw folder */
    private void loadBuiltInSongs() {
        songList.clear();
        adapter.clear();

        songList.add(new Song(1, "Song 1", "Built-in", "android.resource://" + getPackageName() + "/" + R.raw.jack));
        songList.add(new Song(2, "Song 2", "Built-in", "android.resource://" + getPackageName() + "/" + R.raw.triedandcriedrelease));

        for (Song s : songList) {
            adapter.add(s.getTitle() + " - " + s.getArtist());
        }

        adapter.notifyDataSetChanged();
    }

    /** Load imported songs from SharedPreferences */
    private void loadImportedSongs() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        Set<String> savedUris = prefs.getStringSet(IMPORTED_SONGS_KEY, new HashSet<>());

        for (String uri : savedUris) {
            songList.add(new Song(System.currentTimeMillis(), "Imported Song", "Imported", uri));
            adapter.add("Imported Song - Imported");
        }

        adapter.notifyDataSetChanged();
    }

    private void saveImportedSong(Uri uri, String name) {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        Set<String> savedUris = new HashSet<>(prefs.getStringSet(IMPORTED_SONGS_KEY, new HashSet<>()));
        savedUris.add(uri.toString());
        prefs.edit().putStringSet(IMPORTED_SONGS_KEY, savedUris).apply();
    }

    private void openFilePicker() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("audio/*");
        startActivityForResult(intent, PICK_AUDIO_REQUEST);
    }

    private String getFileNameFromUri(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DISPLAY_NAME));
                }
            } finally {
                if (cursor != null) cursor.close();
            }
        }
        if (result == null) result = uri.getLastPathSegment();
        return result;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_AUDIO_REQUEST && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData();
            if (uri == null) return;

            String name = getFileNameFromUri(uri);
            songList.add(new Song(System.currentTimeMillis(), name, "Imported", uri.toString()));
            adapter.add(name + " - Imported");
            adapter.notifyDataSetChanged();

            saveImportedSong(uri, name);
            Toast.makeText(this, "Song imported!", Toast.LENGTH_SHORT).show();
        }
    }

    private void playSong(String path) {
        currentSongPath = path;
        try {
            if (mediaPlayer != null) {
                mediaPlayer.stop();
                mediaPlayer.release();
            }

            mediaPlayer = new MediaPlayer();

            if (path.startsWith("content://") || path.startsWith("android.resource://")) {
                mediaPlayer.setDataSource(this, Uri.parse(path));
            } else {
                mediaPlayer.setDataSource(path);
            }

            mediaPlayer.prepare();
            mediaPlayer.start();

            btnPlayPause.setImageResource(R.drawable.pause);
            Toast.makeText(this, "Playing...", Toast.LENGTH_SHORT).show();

            updateSeekBar = new Runnable() {
                @Override
                public void run() {
                    if (mediaPlayer != null && mediaPlayer.isPlaying()) {
                        int progress = (mediaPlayer.getCurrentPosition() * 100) / mediaPlayer.getDuration();
                        seekBar.setProgress(progress);
                        handler.postDelayed(this, 1000);
                    }
                }
            };
            handler.postDelayed(updateSeekBar, 0);

            mediaPlayer.setOnCompletionListener(mp -> {
                seekBar.setProgress(0);
                handler.removeCallbacks(updateSeekBar);
                btnPlayPause.setImageResource(R.drawable.play);
            });

        } catch (IOException e) {
            Toast.makeText(this, "Error playing song", Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }
    }

    @Override
    protected void onDestroy() {
        if (mediaPlayer != null) {
            mediaPlayer.release();
            mediaPlayer = null;
        }
        handler.removeCallbacks(updateSeekBar);
        super.onDestroy();
    }
}