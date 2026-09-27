package br.corridacanina.turbo;

import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import java.util.Locale;
import android.view.View;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** Tela única que roda o jogo (pasta assets/www) em tela cheia, sem precisar de internet. */
public class MainActivity extends Activity {
    private WebView web;
    private TextToSpeech tts;
    private boolean ttsOk;

    /** Ponte para o locutor: o WebView do Android não tem voz própria, então usa o TextToSpeech do sistema. */
    public class Locutor {
        @JavascriptInterface public void speak(String text) {
            if (ttsOk) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "locutor");
        }
        @JavascriptInterface public boolean busy() { return ttsOk && tts.isSpeaking(); }
        @JavascriptInterface public void stop() { if (ttsOk) tts.stop(); }
    }

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON | WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT >= 28) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        }
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0a0d14"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);                 // progresso salvo (ossos, melhorias, recordes)
        s.setMediaPlaybackRequiresUserGesture(false); // músicas
        s.setAllowFileAccess(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override public void onInit(int status) {
                if (status != TextToSpeech.SUCCESS) return;
                int r = tts.setLanguage(new Locale("pt", "BR"));
                ttsOk = r != TextToSpeech.LANG_MISSING_DATA && r != TextToSpeech.LANG_NOT_SUPPORTED;
                if (!ttsOk) ttsOk = tts.setLanguage(new Locale("pt")) >= 0;
                tts.setSpeechRate(1.12f);
            }
        });
        web.addJavascriptInterface(new Locutor(), "AndroidTTS");
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient());
        setContentView(web);
        hideSystemBars();
        web.loadUrl("file:///android_asset/www/index.html");
    }

    private void hideSystemBars() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemBars();
    }

    @Override
    protected void onPause() { super.onPause(); web.onPause(); if (ttsOk) tts.stop(); }

    @Override
    protected void onDestroy() { if (tts != null) tts.shutdown(); super.onDestroy(); }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); }

    /** Voltar: pausa a corrida ou volta ao menu; no menu, fecha o app. */
    @Override
    public void onBackPressed() {
        web.evaluateJavascript(
            "(function(){var g=window.__game;var s=g?g.state:'menu';"
            + "if(s!=='menu')window.dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'}));return s;})()",
            new ValueCallback<String>() {
                @Override public void onReceiveValue(String v) {
                    if (v == null || v.contains("menu")) finish();
                }
            });
    }
}
