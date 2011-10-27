package com.semious.gallery;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class main extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
		// super.loadUrl("file:///android_asset/www/jQTouch/demos/main/index.html");
	}
}
