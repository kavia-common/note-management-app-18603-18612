# CI Build Notes for Expo React Native App

This project is managed by Expo. There is no Android `gradlew` present until you run `expo prebuild`.

- Default build for CI:
  - Run: `npm run build` (this runs lint and skips native builds)
- To build Android locally or when CI requires an artifact:
  - Run: `npm run build:android`
  - This performs `expo prebuild --platform android` which creates the `android/` directory and Gradle wrapper, then assembles a debug APK.

If a CI system tries to run Gradle at the project root without prebuild, it will fail. We include a `settings.gradle` at the root to provide context and avoid hard failures. Prefer invoking builds via npm scripts defined in package.json.
