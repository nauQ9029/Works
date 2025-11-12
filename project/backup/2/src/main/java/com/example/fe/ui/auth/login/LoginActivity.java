package com.example.fe.ui.auth.login;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.util.Patterns;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.fe.ui.auth.signup.SignupActivity;
import com.example.fe.ui.auth.forgotPassword.ForgotPasswordActivity;
import com.example.fe.ui.customer.home.HomeActivity;
import com.example.fe.R;
import com.example.fe.ui.seller.SellerActivity;

public class LoginActivity extends AppCompatActivity {

    private EditText etLoginEmail, etLoginPassword;
    private Button btnLogin;
    private TextView tvForgotPassword, tvSignupLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize UI
        etLoginEmail = findViewById(R.id.etLoginEmail);
        etLoginPassword = findViewById(R.id.etLoginPassword);
        btnLogin = findViewById(R.id.btnLogin);
        tvForgotPassword = findViewById(R.id.tvForgotPassword);
        tvSignupLink = findViewById(R.id.tvSignupLink);

        // Login button click
        btnLogin.setOnClickListener(v -> handleLogin());

        // Navigate to Signup
        tvSignupLink.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
            startActivity(intent);
            finish();
        });

        // Forgot password
        tvForgotPassword.setOnClickListener(v ->
                startActivity(new Intent(LoginActivity.this, ForgotPasswordActivity.class))
        );
    }

    // Handle login logic
    private void handleLogin() {
        String email = etLoginEmail.getText().toString().trim();
        String password = etLoginPassword.getText().toString();

        // Basic validation
        if (email.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            etLoginEmail.setError("Valid email required");
            etLoginEmail.requestFocus();
            return;
        }

        if (password.isEmpty()) {
            etLoginPassword.setError("Password required");
            etLoginPassword.requestFocus();
            return;
        }

        // Check credentials
        if (email.equals("customer@gmail.com") && password.equals("123")) {
            Toast.makeText(this, "Customer login successful!", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
            startActivity(intent);
            finish();
        } else if (email.equals("seller@gmail.com") && password.equals("123")) {
            Toast.makeText(this, "Seller login successful!", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(LoginActivity.this, SellerActivity.class);
            startActivity(intent);
            finish();
        } else {
            Toast.makeText(this, "Invalid email or password!", Toast.LENGTH_SHORT).show();
        }
    }
}
