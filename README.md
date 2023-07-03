---
title: AI WebTV
emoji: 🔮
colorFrom: purple
colorTo: white
sdk: docker
pinned: false
app_port: 7860
---

A generative AI WebTV, powered by Zeroscope and Hugging Face.

Note: this won't work on iOS due to an apparent ban on Media Source Extensions (available on iPadOS).

It should be possible however to use some other protocol or library.

# Installation
## Building and run without Docker

```bash
nvm use
npm i
```

First setup some env vars:
WEBTV_VIDEOPATH="./sandbox/video"
WEBTV_AUDIOPATH="./sandbox/audio" 
WEBTV_RTMP_URL="rtmp://localhost:1935/webtv"


In a terminal, run:

```
./scripts/init.sh
```

Then run:

```
./scripts/audio.sh
```

In another terminal, run:

```
./scripts/video.sh
```

In another terminal, run:

```
./scripts/stream.sh
```

In another terminal, run:

```
npm run start
```

## Building and running with Docker

```bash
npm run docker
```

This script is a shortcut executing the following commands:

```bash
docker build -t ai-webtv .
docker run -it -p 7860:7860 ai-webtv
```