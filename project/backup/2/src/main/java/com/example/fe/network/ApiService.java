package com.example.fe.network;

import com.example.fe.models.ProductsResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ApiService {
    @GET("api/products")
    Call<ProductsResponse> getProducts(@Query("page") int page, @Query("limit") int limit);
}
