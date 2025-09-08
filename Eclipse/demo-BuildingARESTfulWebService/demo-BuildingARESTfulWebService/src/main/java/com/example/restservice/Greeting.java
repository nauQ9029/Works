/*
 * Purpose: 
 * Acts as a simple data holder, eliminates the need to write getters,
 * setters, constructors, toString(), equals(), and hashCode manually.
 */

package com.example.restservice;

public record Greeting(long id, String content) {

}