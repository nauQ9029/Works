package com.example.classwork2.service;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.classwork2.model.Product;

import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "goods.db";
    private static final int DATABASE_VERSION = 1;

    private static final String TABLE_PRODUCT = "product";
    private static final String COL_ID = "id";
    private static final String COL_NAME = "productName";
    private static final String COL_DESC = "productDescription";
    private static final String COL_PRICE = "productPrice";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE " + TABLE_PRODUCT + " (" +
                COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COL_NAME + " TEXT, " +
                COL_DESC + " TEXT, " +
                COL_PRICE + " REAL)";
        db.execSQL(createTable);

        // Insert sample data
        db.execSQL("INSERT INTO product (productName, productDescription, productPrice) VALUES ('Laptop', 'Abc...', 20000000)");
        db.execSQL("INSERT INTO product (productName, productDescription, productPrice) VALUES ('Smartphone', 'Xyz...', 15000000)");
        db.execSQL("INSERT INTO product (productName, productDescription, productPrice) VALUES ('Headphone', 'Kzz...', 1000000)");
        db.execSQL("INSERT INTO product (productName, productDescription, productPrice) VALUES ('Apple pro', 'jqk...', 23213123)");
        db.execSQL("INSERT INTO product (productName, productDescription, productPrice) VALUES ('Headphone', 'Kzz...', 32423423)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_PRODUCT);
        onCreate(db);
    }

    // CRUD functions
    public long insertProduct(Product product) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_NAME, product.getName());
        values.put(COL_DESC, product.getDescription());
        values.put(COL_PRICE, product.getPrice());
        return db.insert(TABLE_PRODUCT, null, values);
    }

    public int updateProduct(Product product) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_NAME, product.getName());
        values.put(COL_DESC, product.getDescription());
        values.put(COL_PRICE, product.getPrice());
        return db.update(TABLE_PRODUCT, values, "id=?", new String[]{String.valueOf(product.getId())});
    }

    public int deleteProduct(int id) {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.delete(TABLE_PRODUCT, "id=?", new String[]{String.valueOf(id)});
    }

    public List<Product> getAllProducts() {
        List<Product> list = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_PRODUCT, null);

        if (cursor.moveToFirst()) {
            do {
                Product p = new Product();
                p.setId(cursor.getInt(cursor.getColumnIndexOrThrow(COL_ID)));
                p.setName(cursor.getString(cursor.getColumnIndexOrThrow(COL_NAME)));
                p.setDescription(cursor.getString(cursor.getColumnIndexOrThrow(COL_DESC)));
                p.setPrice(cursor.getDouble(cursor.getColumnIndexOrThrow(COL_PRICE)));
                list.add(p);
            } while (cursor.moveToNext());
        }
        cursor.close();
        return list;
    }
}
