package com.example.lab9;

import android.os.Bundle;
import androidx.appcompat.view.ActionMode;
import android.view.ContextMenu;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements PopupMenu.OnMenuItemClickListener {
    private ActionMode myActMode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn = (Button) findViewById(R.id.btnShow1);
        registerForContextMenu(btn);

        TextView textView = findViewById(R.id.text_view);
        textView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                if (myActMode != null) {
                    return false;
                }
                myActMode = startSupportActionMode(myActModeCallback);
                return true;
            }

            public void onClick(View v) {
                PopupMenu popup = new PopupMenu(MainActivity.this, v);
                popup.setOnMenuItemClickListener(MainActivity.this);
                popup.inflate(R.menu.popup_menu);
                popup.show(); }
        });
    }

    // Inflate the menu (options_menu.xml)
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.options_menu, menu);
        return true;
    }

    // Handle menu item clicks
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.search_item) {
            Toast.makeText(this, "Search clicked", Toast.LENGTH_SHORT).show();
            return true;
        } else if (id == R.id.upload_item) {
            Toast.makeText(this, "Upload clicked", Toast.LENGTH_SHORT).show();
            return true;
        } else if (id == R.id.copy_item) {
            Toast.makeText(this, "Copy clicked", Toast.LENGTH_SHORT).show();
            return true;
        } else if (id == R.id.print_item) {
            Toast.makeText(this, "Print clicked", Toast.LENGTH_SHORT).show();
            return true;
        } else if (id == R.id.share_item) {
            Toast.makeText(this, "Share clicked", Toast.LENGTH_SHORT).show();
            return true;
        } else if (id == R.id.bookmark_item) {
            Toast.makeText(this, "Bookmark clicked", Toast.LENGTH_SHORT).show();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        menu.setHeaderTitle("Context Menu");
        menu.add(0, v.getId(), 0, "Upload");
        menu.add(0, v.getId(), 0, "Search");
        menu.add(0, v.getId(), 0, "Share");
        menu.add(0, v.getId(), 0, "Bookmark");
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        Toast.makeText(this, "Long press selected item: " + item.getTitle(),
                Toast.LENGTH_SHORT).show();
        return true;
    }

    private ActionMode.Callback myActModeCallback = new ActionMode.Callback() {
        @Override
        public boolean onCreateActionMode(ActionMode mode, Menu menu) {
            mode.getMenuInflater().inflate(R.menu.example_menu, menu);
            mode.setTitle("Select option here");
            return true;
        }

        @Override
        public boolean onPrepareActionMode(ActionMode mode, Menu menu) {
            return false;
        }

        @Override
        public boolean onActionItemClicked(ActionMode mode, MenuItem item) {
            int id = item.getItemId();

            if (id == R.id.option_1) {
                Toast.makeText(MainActivity.this, "Selected Option 1", Toast.LENGTH_SHORT).show();
                mode.finish();
                return true;
            } else if (id == R.id.option_2) {
                Toast.makeText(MainActivity.this, "Selected Option 2", Toast.LENGTH_SHORT).show();
                mode.finish();
                return true;
            } else {
                return false;
            }
        }

        @Override
        public void onDestroyActionMode(ActionMode mode) {
            myActMode = null;
        }
    };

    public void showPopup(View v) {
        PopupMenu popup = new PopupMenu(this, v);
        MenuInflater inflater = popup.getMenuInflater();
        inflater.inflate(R.menu.menu_example, popup.getMenu());
        popup.show();
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        Toast.makeText(this, "Selected Item: " + item.getTitle(), Toast.LENGTH_SHORT).show();
        int id = item.getItemId();

        if (id == R.id.search_item) {
            // do your code
            return true;
        } else if (id == R.id.upload_item) {
            // do your code
            return true;
        } else if (id == R.id.copy_item) {
            // do your code
            return true;
        } else if (id == R.id.print_item) {
            // do your code
            return true;
        } else if (id == R.id.share_item) {
            // do your code
            return true;
        } else if (id == R.id.bookmark_item) {
            // do your code
            return true;
        } else {
            return false;
        }
    }
}
