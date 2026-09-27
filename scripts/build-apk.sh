#!/usr/bin/env bash
# Monta o APK do Android a partir de dist/www (gerado por `npm run offline`).
# Precisa do JDK e das ferramentas do Android (build-tools e android.jar):
#   ANDROID_BUILD_TOOLS=/caminho/build-tools/35.0.0  ANDROID_JAR=/caminho/platforms/android-35/android.jar  bash scripts/build-apk.sh
set -euo pipefail
BT="${ANDROID_BUILD_TOOLS:?defina ANDROID_BUILD_TOOLS}"
JAR="${ANDROID_JAR:?defina ANDROID_JAR}"
OUT=android/build
rm -rf "$OUT" && mkdir -p "$OUT/classes" "$OUT/assets"
cp -r dist/www "$OUT/assets/www"

javac --release 8 -nowarn -classpath "$JAR" -d "$OUT/classes" android/src/br/corridacanina/turbo/MainActivity.java
"$BT/d8" --lib "$JAR" --min-api 24 --output "$OUT" $(find "$OUT/classes" -name '*.class')
"$BT/aapt2" compile --dir android/res -o "$OUT/res.zip"
"$BT/aapt2" link -o "$OUT/app-unsigned.apk" -I "$JAR" --manifest android/AndroidManifest.xml \
  -A "$OUT/assets" -0 mp3 "$OUT/res.zip"
(cd "$OUT" && zip -q app-unsigned.apk classes.dex)
"$BT/zipalign" -f -p 4 "$OUT/app-unsigned.apk" "$OUT/app-aligned.apk"

# chave de assinatura de desenvolvimento (a mesma chave permite instalar atualizações por cima)
KS=android/corrida-dev.keystore
if [ ! -f "$KS" ]; then
  keytool -genkeypair -keystore "$KS" -storepass corrida123 -keypass corrida123 -alias corrida \
    -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Corrida Canina Turbo, O=Corrida Canina, C=BR" 2>/dev/null
fi
mkdir -p dist
"$BT/apksigner" sign --ks "$KS" --ks-pass pass:corrida123 --ks-key-alias corrida --out dist/CorridaCaninaTurbo.apk "$OUT/app-aligned.apk"
"$BT/apksigner" verify --print-certs dist/CorridaCaninaTurbo.apk | head -1
ls -la dist/CorridaCaninaTurbo.apk
