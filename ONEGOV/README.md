# ONEGOV – Run with Docker (Expo)

This repository is an Expo React Native app. The Docker setup runs the Metro bundler and Expo DevTools inside a container so you can develop without installing Node/Expo locally.

Files of interest:
- [Dockerfile](Dockerfile) — builds the image and starts Expo in tunnel mode.
- [docker-compose.yml](docker-compose.yml) — maps required ports and runs the container interactively.
- [package.json](package.json) — project scripts and dependencies.

## Prerequisites
- Docker Desktop (with Compose v2)
- A phone with Expo Go app installed (for running on device), or an Android/iOS emulator

## Quick start
1) Build the image:

```sh
docker compose build
```

2) Start the dev server (foreground, shows logs):

```sh
docker compose up
```

3) Open Expo DevTools in your browser:

http://localhost:19002

4) Run the app:
- On a physical device: scan the QR in DevTools using Expo Go.
- On an emulator: Press a in your cmd or launch it from DevTools or from the Expo CLI prompt that appears in logs.

## Default behavior
The container runs:

```sh
npx expo start --tunnel
```

Tunnel mode works even when your phone isn’t on the same LAN. The following ports are published for local access:
- 8081 — Metro bundler
- 19000 — Expo dev server
- 19001 — Debugger
- 19002 — Expo DevTools UI

## Managing the container
- Stop containers and network: ctrl+c

```sh
docker compose down
```

- Rebuild after code changes (when not using a bind mount):

```sh
docker compose build &#38;&#38; docker compose up
```

- Tail logs:

```sh
docker compose logs -f expo
```

## Optional: enable instant hot reload with a bind mount
By default, [docker-compose.yml](docker-compose.yml) bakes the app code into the image, so you must rebuild to see changes. For a faster inner loop with HMR, add a volume to mount your source into the container and keep node_modules inside the container:

In [docker-compose.yml](docker-compose.yml), under the expo service, add:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

Then run:

```sh
docker compose up --build
```

Subsequent code edits will hot-reload automatically without rebuilding.

## Alternative run modes
- LAN mode (same network as device):

  Stop any existing instance first:
  ```sh
  docker compose down
  ```

  Start a one-off container using LAN:
  ```sh
  docker compose run --service-ports --rm expo npx expo start --lan
  ```

  Ensure your phone and computer are on the same Wi‑Fi and allow Node/Expo through your firewall.

- Web (optional):

  Expose the web port by adding this to [docker-compose.yml](docker-compose.yml) ports:
  ```yaml
  - "19006:19006"
  ```

  Then run:
  ```sh
  docker compose run --service-ports --rm expo npx expo start --web
  ```

  Open http://localhost:19006 in your browser.

## Troubleshooting
- DevTools page not loading:
  - Make sure port 19002 is free on your machine.
  - If occupied, edit [docker-compose.yml](docker-compose.yml) to change port mappings and restart.
- Tunnel fails to connect:
  - Try LAN mode:
    ```sh
    docker compose run --service-ports --rm expo npx expo start --lan
    ```
- Reset Metro/Expo cache:
  ```sh
  docker compose run --rm expo npx expo start -c --tunnel
  ```
- Windows file sharing/permissions with bind mounts:
  - If you enabled the volumes above and see EPERM/ENOENT, ensure your repo folder is shared in Docker Desktop Settings > Resources > File Sharing, then restart Docker.

## Clean up
- Stop and remove containers:
  ```sh
  docker compose down
  ```
- Remove the built image:
  ```sh
  docker rmi onegov_img
  ```
- Prune dangling images:
  ```sh
  docker image prune
## Repository structure

```
.
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ tsconfig.json
├─ App.js
├─ index.js
├─ app.json
├─ app/
│  ├─ Dashboard/
│  │  ├─ AIChat.tsx
│  │  ├─ AIHome.tsx
│  │  ├─ AIResponse.tsx
│  │  ├─ main.tsx
│  │  ├─ notifications.tsx
│  │  ├─ search.tsx
│  │  └─ settings.tsx
│  ├─ lib/
│  │  ├─ appwrite.ts
│  │  └─ auth-context.tsx
│  ├─ Login/
│  │  ├─ _layout.tsx
│  │  ├─ LoginScreen.js
│  │  ├─ OtpScreen.js
│  │  ├─ RegisterScreen.js
│  │  ├─ SuccessScreen.js
│  │  └─ WelcomeScreen.js
│  ├─ Add_birth_certi.tsx
│  ├─ birth_certi.tsx
│  ├─ citizenID.tsx
│  ├─ DS_Fees.tsx
│  ├─ End_QR.tsx
│  ├─ Navigation.tsx
│  ├─ NIC_form.tsx
│  ├─ NIC.tsx
│  ├─ pay.tsx
│  ├─ photo.tsx
│  ├─ Progress.tsx
│  ├─ request.tsx
│  └─ Select_GN_DS.tsx
├─ assets/
│  ├─ adaptive-icon.png
│  ├─ favicon.png
│  ├─ icon.png
│  └─ splash-icon.png
├─ src/
│  ├─ hooks/
│  │  └─ useImageUpload.js
│  └─ services/
│     ├─ appwrite.js
│     └─ imageUploadService.js
├─ .vscode/
├─ .qodo/
├─ .dockerignore
├─ .gitignore
└─ README.md
```

### Directory guide
- app/: Expo Router app directory with screens and navigation.
  - app/Dashboard/: AI-related dashboard screens and utilities.
  - app/lib/: Shared libraries such as Appwrite client and auth context.
  - app/Login/: Authentication screens and layout.
- assets/: App icons and splash images used by Expo.
- src/services/: Service layer (Appwrite SDK integration, image upload helpers).
- src/hooks/: Reusable React hooks.
- Dockerfile and docker-compose.yml: Containerized dev environment for Expo/Metro.