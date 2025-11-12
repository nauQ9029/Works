package com.example.goodbyeworld;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    private EditText etName;
    private Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etName = findViewById(R.id.et_name);
        btnLogin = findViewById(R.id.btn_login);

        btnLogin.setOnClickListener(v -> {
            String name = etName.getText().toString().trim();
            if (!name.isEmpty()) {
                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                intent.putExtra("USER_NAME", name);
                startActivity(intent);
                finish(); // close LoginActivity
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        // clear field when user comes back (after minimizing or closing HomeActivity)
        etName.setText("");
    }
}
