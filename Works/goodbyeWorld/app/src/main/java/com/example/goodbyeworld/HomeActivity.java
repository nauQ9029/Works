package com.example.goodbyeworld;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class HomeActivity extends AppCompatActivity {

    private TextView tvWelcome;
    private Button btnClose;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        tvWelcome = findViewById(R.id.tv_welcome);
        btnClose = findViewById(R.id.btn_close);

        String name = getIntent().getStringExtra("USER_NAME");
        tvWelcome.setText("Welcome, " + name + "!");

        btnClose.setOnClickListener(v -> finishAffinity()); // close app
    }
}
