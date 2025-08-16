# ONEGOV – Run with Docker (Expo)

This repository is an Expo React Native app. The Docker setup runs the Metro bundler and Expo DevTools inside a container so you can access our application without installing Node/Expo locally.

Files of interest:
- [Dockerfile](Dockerfile) — builds the image and starts Expo in tunnel mode.
- [docker-compose.yml](docker-compose.yml) — maps required ports and runs the container interactively.
- [package.json](package.json) — project scripts and dependencies.

## Prerequisites
- Docker Desktop (with Compose v2)
- A phone with [Expo Go app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) installed (for running on device), or an Android/iOS emulator

## Before you start...
- ONEGOV
In order to access and run ONEGOV which is made for citizens, make sure to change the directory to ONEGOV.
```sh
cd ONEGOV
```

- ONEGOVE CORE 
In order to access and run ONEGOVE CORE which is the app for government officials, make sure to change the directory to ONEGOVE CORE.
```sh
cd ONEGOVE CORE
```

## Quick start
1) Change to the required directory as instructed above.

1) Build and run the docker image:

```sh
docker compose up --build
```

2) Scan the QR code in the terminal with the Expo Go app on your phone.

4) Press CTRL+C to stop.

- If docker does not seem to work... try the following below.

```sh
npm install
npx expo start --tunnel
```