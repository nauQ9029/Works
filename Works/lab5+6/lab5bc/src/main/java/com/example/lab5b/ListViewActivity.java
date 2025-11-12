package com.example.lab5b;

import android.graphics.Color;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.ListView;

import java.util.ArrayList;

/**
 * Created by webmaster@dotnet.vn on 11/10/2017.
 */
public class ListViewActivity extends AppCompatActivity {

    private ListView lvContact;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.listview_main);

        lvContact = findViewById(R.id.lvContact);

        // Tạo danh sách contact
        ArrayList<Contact> arrContact = new ArrayList<>();
        arrContact.add(new Contact("Visit Hung Anh", "161250533502", Color.RED));
        arrContact.add(new Contact("Nguyen Quoc Cuong", "161250533405", Color.GREEN));
        arrContact.add(new Contact("Nguyen Khuong Dao", "151250533308", Color.GRAY));
        arrContact.add(new Contact("Vy Van Do", "161250533207", Color.YELLOW));
        arrContact.add(new Contact("Pham Nguyen Hoai Duy", "151250533113", Color.BLACK));
        arrContact.add(new Contact("Do Thien Giang", "131250532378", Color.BLUE));
        arrContact.add(new Contact("Vo Huu Hai", "151250533116", Color.CYAN));

        // Gắn adapter tùy biến
        CustomAdapter customAdapter = new CustomAdapter(this, R.layout.row_listview, arrContact);
        lvContact.setAdapter(customAdapter);
    }
}

