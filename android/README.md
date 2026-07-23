# Android (TWA) build — SAP by Sali · Project NEO

This wraps the live PWA at **https://sapbysali.app** in a Trusted Web Activity so
it can ship on Google Play. The web app is the single source of truth — the
Android shell just launches it full-screen with no URL bar (once Digital Asset
Links verify).

> Nothing here is built yet — this repo carries the **config + instructions**.
> The actual APK/AAB build needs a local toolchain (see Prerequisites). No Google
> account and no payment are required until the final upload step.

---

## Prerequisites (install locally when ready to build)

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | ≥ 18 (have v26) | for Bubblewrap CLI |
| JDK | **17** | `brew install openjdk@17` — currently **not installed** |
| Android SDK | cmdline-tools + platform 36 + build-tools 36 | `brew install --cask android-commandlinetools`, then `sdkmanager "platforms;android-36" "build-tools;36.0.0"` |
| Bubblewrap | latest | `npm i -g @bubblewrap/cli` |

Set `JAVA_HOME` and `ANDROID_HOME` before building.

---

## Build steps

```bash
# 1. from repo root
cd android

# 2. initialise from the live manifest (or reuse the twa-manifest.json here)
bubblewrap init --manifest https://sapbysali.app/manifest.webmanifest
#    → when prompted, accept the values already captured in twa-manifest.json
#      (packageId app.sapbysali.twa, host sapbysali.app, targetSdk 36…)

# 3. generate the signing (upload) key — KEEP THIS FILE + PASSWORD SAFE
keytool -genkeypair -v -keystore android.keystore -alias upload \
  -keyalg RSA -keysize 2048 -validity 9125 \
  -dname "CN=Sali Halif, O=SAP by Sali, C=IL"

# 4. print the SHA-256 fingerprint of the key
keytool -list -v -keystore android.keystore -alias upload | grep SHA256
#    → paste this value into  public/.well-known/assetlinks.json
#      (replace REPLACE_WITH_SHA256_FINGERPRINT_FROM_PLAY_APP_SIGNING),
#      redeploy the web app, then verify:
#      https://developers.google.com/digital-asset-links/tools/generator

# 5. build the release bundle
bubblewrap build            # produces app-release-bundle.aab (upload to Play)
#    bubblewrap build --skipPwaValidation   # if the validator is offline
```

## Digital Asset Links (removes the URL bar)

`public/.well-known/assetlinks.json` is already deployed with the right shape.
After Play App Signing is enabled, use the **Play-managed** signing key SHA-256
(App integrity → App signing) — not just the upload key — so the installed app
verifies. You can list both fingerprints in the array.

## Icon / splash

- Launcher + adaptive icon: Bubblewrap derives them from `iconUrl` /
  `maskableIconUrl` in `twa-manifest.json` (already pointing at the 512 assets).
- Monochrome (themed) icon: `monochromeIconUrl` → `/icon-monochrome.png`.
- Splash: `backgroundColor` `#fcfcfd` + the 512 icon, fade 300 ms.

## Android 16 / API 36

`targetSdkVersion` and `compileSdkVersion` are set to **36**. Play's 2026 policy
requires new apps to target a recent API; 36 satisfies it with headroom.

## What still needs a Google Play account

1. Create the app in Play Console, enable **Play App Signing**.
2. Grab the app-signing SHA-256 → finalise `assetlinks.json` → redeploy.
3. Upload the `.aab`, fill Data Safety (declare: no data collected), Content
   Rating, store listing (see `docs/play-store/listing.md`), screenshots, and
   submit for review.
