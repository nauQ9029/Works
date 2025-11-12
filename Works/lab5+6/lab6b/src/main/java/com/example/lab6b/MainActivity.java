package com.example.lab6b;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

public class MainActivity extends Activity {

    Button button1, button2, button3;
    Button button4, button5, button6;
    Button button7, button8, button9;
    Button button0, buttonStar, buttonClear, buttonCall;
    TextView numberView;

    /** Called when the activity is first created. */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        numberView = (TextView) findViewById(R.id.number_display);

        // check if app was launched by dial intent
        Intent intent = getIntent();
        if (intent != null && intent.getData() != null) {
            String phoneNumber = intent.getData().toString();
            phoneNumber = phoneNumber.replace("tel:", "");
            numberView.setText(phoneNumber);
        }

        button1 = findViewById(R.id.button1);
        button2 = findViewById(R.id.button2);
        button3 = findViewById(R.id.button3);
        button4 = findViewById(R.id.button4);
        button5 = findViewById(R.id.button5);
        button6 = findViewById(R.id.button6);
        button7 = findViewById(R.id.button7);
        button8 = findViewById(R.id.button8);
        button9 = findViewById(R.id.button9);
        button0 = findViewById(R.id.button0);
        buttonStar = findViewById(R.id.button_star);
        buttonClear = findViewById(R.id.button_clear);
        buttonCall = findViewById(R.id.button_call);

        button1.setOnClickListener(appendString("1"));
        button2.setOnClickListener(appendString("2"));
        button3.setOnClickListener(appendString("3"));
        button4.setOnClickListener(appendString("4"));
        button5.setOnClickListener(appendString("5"));
        button6.setOnClickListener(appendString("6"));
        button7.setOnClickListener(appendString("7"));
        button8.setOnClickListener(appendString("8"));
        button9.setOnClickListener(appendString("9"));
        button0.setOnClickListener(appendString("0"));
        buttonStar.setOnClickListener(appendString("*"));

        buttonClear.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                numberView.setText("");
            }
        });

        buttonCall.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String number = numberView.getText().toString();
                if (number.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter a number", Toast.LENGTH_SHORT).show();
                    return;
                }
                // Open the dialer with number prefilled
                Intent dialIntent = new Intent(Intent.ACTION_DIAL);
                dialIntent.setData(Uri.parse("tel:" + number));
                startActivity(dialIntent);
            }
        });
    }

    public View.OnClickListener appendString(final String number) {
        return new View.OnClickListener() {
            public void onClick(View arg0) {
                numberView.append(number);
            }
        };
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        menu.add(0, Menu.FIRST, 0, "Exit")
                .setIcon(android.R.drawable.ic_delete);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case Menu.FIRST: {
                finish();
                break;
            }
        }
        return false;
    }
}
