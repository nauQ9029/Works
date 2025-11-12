package com.example.lab12;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Environment;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private EditText txtUsername, txtPwd, txtName, txtLocation, txtDesignation;
    private Button btnLogin, btnInternal, btnExternal, btnSQLite;

    private SharedPreferences pref;
    private Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txtUsername = findViewById(R.id.txtUsername);
        txtPwd = findViewById(R.id.txtPwd);
        txtName = findViewById(R.id.txtName);
        txtLocation = findViewById(R.id.txtLocation);
        txtDesignation = findViewById(R.id.txtDesignation);

        btnLogin = findViewById(R.id.btnLogin);
        btnInternal = findViewById(R.id.btnInternal);
        btnExternal = findViewById(R.id.btnExternal);
        btnSQLite = findViewById(R.id.btnSQLite);

        pref = getSharedPreferences("user_details", MODE_PRIVATE);

        // SharedPreferences Login Flow
        btnLogin.setOnClickListener(v -> {
            String username = txtUsername.getText().toString().trim();
            String password = txtPwd.getText().toString().trim();

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter all fields", Toast.LENGTH_SHORT).show();
                return;
            }

            SharedPreferences.Editor editor = pref.edit();
            editor.putString("username", username);
            editor.putString("password", password);
            editor.apply();

            Toast.makeText(this, "Login (SharedPreferences) Successful", Toast.LENGTH_SHORT).show();

            intent = new Intent(MainActivity.this, DetailsActivity.class);
            startActivity(intent);
        });

        // Internal Storage Flow
        btnInternal.setOnClickListener(v -> {
            String username = txtUsername.getText().toString().trim() + "\n";
            String password = txtPwd.getText().toString().trim();

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter all fields", Toast.LENGTH_SHORT).show();
                return;
            }

            try (FileOutputStream fos = openFileOutput("user_details_is.txt", Context.MODE_PRIVATE)) {
                fos.write(username.getBytes());
                fos.write(password.getBytes());
                Toast.makeText(this, "Saved to Internal Storage", Toast.LENGTH_SHORT).show();

                intent = new Intent(MainActivity.this, DetailsISActivity.class);
                startActivity(intent);
            } catch (IOException e) {
                e.printStackTrace();
                Toast.makeText(this, "Error saving file", Toast.LENGTH_SHORT).show();
            }
        });

        // External Storage Flow
        btnExternal.setOnClickListener(v -> {
            String username = txtUsername.getText().toString() + "\n";
            String password = txtPwd.getText().toString();

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter all fields", Toast.LENGTH_SHORT).show();
                return;
            }

            try {
                ActivityCompat.requestPermissions(MainActivity.this,
                        new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,
                                Manifest.permission.READ_EXTERNAL_STORAGE}, 23);

                File folder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                File myFile = new File(folder, "user_details_es.txt");

                try (FileOutputStream fstream = new FileOutputStream(myFile)) {
                    fstream.write(username.getBytes());
                    fstream.write(password.getBytes());
                }

                Toast.makeText(this,
                        "Saved to External Storage:\n" + myFile.getAbsolutePath(),
                        Toast.LENGTH_LONG).show();

                startActivity(new Intent(MainActivity.this, DetailsESActivity.class));

            } catch (IOException e) {
                e.printStackTrace();
                Toast.makeText(this, "Error saving to external storage", Toast.LENGTH_SHORT).show();
            }
        });

        // SQLite Insert Flow
        btnSQLite.setOnClickListener(v -> {
            String name = txtName.getText().toString().trim();
            String location = txtLocation.getText().toString().trim();
            String designation = txtDesignation.getText().toString().trim();

            if (name.isEmpty() || location.isEmpty() || designation.isEmpty()) {
                Toast.makeText(this, "Please fill all SQLite fields", Toast.LENGTH_SHORT).show();
                return;
            }

            DbHandler dbHandler = new DbHandler(MainActivity.this);
            dbHandler.insertUserDetails(name, location, designation);
            Toast.makeText(this, "Data saved to SQLite DB", Toast.LENGTH_SHORT).show();

            startActivity(new Intent(MainActivity.this, SQLiteDetailsActivity.class));
        });
    }
}
