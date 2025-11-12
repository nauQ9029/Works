package com.example.lab12;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.io.FileInputStream;
import java.io.IOException;

public class DetailsISActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.details_is);

        TextView resultIS = findViewById(R.id.resultISView);
        Button btnBack = findViewById(R.id.btnBackIS);

        try (FileInputStream fis = openFileInput("user_details_is.txt")) {
            StringBuilder sb = new StringBuilder();
            int i;
            while ((i = fis.read()) != -1) {
                sb.append((char) i);
            }

            String[] details = sb.toString().split("\n");
            String username = details.length > 0 ? details[0] : "N/A";
            String password = details.length > 1 ? details[1] : "N/A";
            resultIS.setText("Name: " + username + "\nPassword: " + password);

        } catch (IOException e) {
            e.printStackTrace();
            resultIS.setText("Error reading file");
        }

        btnBack.setOnClickListener(v -> {
            startActivity(new Intent(this, MainActivity.class));
            finish();
        });
    }
}
