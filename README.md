## Table of Contents

- [Launch in Development Mode](#launch-in-development-mode)
- [Build the App](#build-the-app)
- [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
- [Run ESLint](#run-eslint)

## Launch in Development Mode

First of all, install yarn and expo with npm : `npm install -g yarn` and `npm install -g expo-cli`

To start the app in development mode, use `expo start`
You can test it on an emulator or on your phone using the [Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&gl=US)

## Build the App

Use `expo build:android` to build for android and `expo build:ios` to build for IOS.

**Actual APK build for android** : [https://expo.dev/artifacts/63ce1ba7-a9a2-4075-a81e-c219a8791bdf](https://expo.dev/artifacts/63ce1ba7-a9a2-4075-a81e-c219a8791bdf)

## Publishing to Expo's React Native Community

To publish the app, you need to have an [Expo account](https://expo.dev/).

Install the `exp` command-line tool, and run the publish command:

```
$ npm install -g exp
$ exp publish
```

If you get errors (for example `Error: connect ECONNREFUSED 127.0.0.1:19001`), try to start the app using `expo start` in another terminal and use `exp publish` again.

After publishing the app, you can open the link in the console with the expo app on your phone.

**Actual link to published app** : [https://exp.host/@chaudrop/react-native-pizza](https://exp.host/@chaudrop/react-native-pizza)

## Run ESLint

Use `npm run lint` to run ESLint verification.
