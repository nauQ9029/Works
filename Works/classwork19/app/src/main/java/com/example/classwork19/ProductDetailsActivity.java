package com.example.classwork19;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class ProductDetailsActivity extends AppCompatActivity {

    private static final int REQUEST_CALL_PERMISSION = 1;
    private String storePhone = "0123456789";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_details);

        ImageView image = findViewById(R.id.imageProduct);
        TextView name = findViewById(R.id.textProductName);
        TextView price = findViewById(R.id.textProductPrice);
        TextView phone = findViewById(R.id.textStorePhone);

        // Get data from intent
        String productName = getIntent().getStringExtra("name");
        String productPrice = getIntent().getStringExtra("price");
        int productImage = getIntent().getIntExtra("image", 0);

        image.setImageResource(productImage);
        name.setText(productName);
        price.setText(productPrice != null ? productPrice : "₫299,000");

        phone.setText("Call Store: " + storePhone);

        phone.setOnClickListener(v -> makePhoneCall());
    }

    // from Android 12+, when permission is denied, the OS blocks the ACTION_CALL intent entirely
    // (no crash, but auto-fallback to ACTION_DIAL).
    private void makePhoneCall() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE)
                != PackageManager.PERMISSION_GRANTED) {

            // Explain to the user before requesting
            if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CALL_PHONE)) {
                Toast.makeText(this, "Phone call permission is needed to contact the store.", Toast.LENGTH_LONG).show();
            }

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CALL_PHONE},
                    REQUEST_CALL_PERMISSION);

        } else {
            // Permission already granted → make the call
            Intent callIntent = new Intent(Intent.ACTION_CALL);
            callIntent.setData(Uri.parse("tel:" + storePhone));
            startActivity(callIntent);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_CALL_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                makePhoneCall();
            } else {
                Toast.makeText(this, "Permission DENIED to make calls", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
