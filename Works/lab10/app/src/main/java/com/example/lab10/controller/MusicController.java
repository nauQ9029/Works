package com.example.lab10.controller;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;

import com.example.lab10.service.MusicService;

public class MusicController {
    private Context context;

    public MusicController(Context context) {
        this.context = context;
    }

    public void startMusicService() {
        Intent intent = new Intent(context, MusicService.class);
        context.startService(intent);
    }

    public void bindService(ServiceConnection connection) {
        Intent intent = new Intent(context, MusicService.class);
        context.bindService(intent, connection, Context.BIND_AUTO_CREATE);
    }

    public void unbindService(ServiceConnection connection) {
        context.unbindService(connection);
    }

    public void stopMusicService() {
        Intent intent = new Intent(context, MusicService.class);
        context.stopService(intent);
    }
}
