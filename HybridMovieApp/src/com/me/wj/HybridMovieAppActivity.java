package com.me.wj;

import android.os.Bundle;
import com.phonegap.*;

public class HybridMovieAppActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }

	/*@Override
	protected void onStart() {
		super.onStart();
		setContentView(R.layout.main);
	}*/
    
    
}