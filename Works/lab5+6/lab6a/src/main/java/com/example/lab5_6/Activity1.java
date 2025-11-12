package com.example.lab5_6;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class Activity1 extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity1_layout );
        final EditText editValue = (EditText) findViewById(R.id. value_edit );
        final Button sendButton = (Button) findViewById(R.id. send_button );
        sendButton.setOnClickListener( new View.OnClickListener() {

            public void onClick(View v) {

                String valueString = editValue.getText().toString();
                long value;
                if (valueString != null) {
                    value = Long. parseLong (valueString);
                } else {
                    value = 0;
                }

// I'm 1 doi love Bundle _ guide go Intent _
                Bundle sendBundle = new Bundle();
                sendBundle.putLong( "value" , value);

// Tao Intent de Khoi run Activity2 and sendBundble to Intent _
                Intent i = new Intent(Activity1.this, Activity2.class );
                i.putExtras(sendBundle);
                startActivity(i);

// Period Phong Activity1 when Activity Stack is free se do n't come back again
                finish();
            }
        });
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
// Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true ;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

// Handle action bar item clicks here. The action bar will
// automatically handle clicks on the Home/Up button, so long
// as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings ) {
            return true ;
        }
        return super.onOptionsItemSelected(item);
    }
}
