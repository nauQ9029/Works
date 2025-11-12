package com.example.lab7.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lab7.R;
import com.example.lab7.adapter.ContactsAdapter;
import com.example.lab7.model.Contact;

import java.util.ArrayList;

public class UserListActivity extends AppCompatActivity {

    ArrayList<Contact> contacts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // ...
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_users);

        // Lookup the recyclerview in activity layout
        RecyclerView rvContacts = (RecyclerView) findViewById(R.id.rvContacts);
        Button btnAdd = findViewById(R.id.btnAddContacts);

        // Initialize contacts
        contacts = Contact.createContactsList(20);

        // Create adapter passing in the sample user data
        ContactsAdapter adapter = new ContactsAdapter(contacts);

        // Attach the adapter to the recyclerview to populate items
        rvContacts.setAdapter(adapter);

        // Set layout manager to position the items
        rvContacts.setLayoutManager(new LinearLayoutManager(this));

        // Add button click listener
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Generate 5 new contacts and add to list
                ArrayList<Contact> newContacts = Contact.createContactsList(5);
                int oldSize = contacts.size();
                contacts.addAll(newContacts);

                // Notify adapter about new items
                adapter.notifyItemRangeInserted(oldSize, newContacts.size());
            }
        });
    }
}
