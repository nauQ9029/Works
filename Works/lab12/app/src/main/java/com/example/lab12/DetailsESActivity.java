package com.example.lab12;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Environment;
import android.widget.Button;
import android.widget.TextView;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class DetailsESActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.details_es);

        TextView result = findViewById(R.id.resultViewES);
        Button back = findViewById(R.id.btnBackES);

        try {
            File folder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File myFile = new File(folder, "user_details_es");

            FileInputStream fstream = new FileInputStream(myFile);
            StringBuilder sbuffer = new StringBuilder();
            int i;
            while ((i = fstream.read()) != -1) {
                sbuffer.append((char) i);
            }
            fstream.close();

            String[] details = sbuffer.toString().split("\n");
            result.setText("Name: " + details[0] + "\nPassword: " + details[1]);

        } catch (IOException e) {
            e.printStackTrace();
        }

        back.setOnClickListener(v -> {
            startActivity(new Intent(DetailsESActivity.this, MainActivity.class));
        });
    }
}
