---
title: AI WebTV
emoji: 🔮
colorFrom: purple
colorTo: white
sdk: docker
pinned: true
app_port: 7860
---

A generative AI WebTV, powered by Zeroscope and Hugging Face.

This is just the frontend part, you will need the media-server (also open source) to make it work.

Warning: this is an experimental, proof-of-concept project made in a few days.

It is not ready for production use by other people! Also, this use models that should only be used for research purposes (no commercial usage).

Note: because the stream uses FLV, it doesn't work on iPhone. There is however a [Twitch mirror here](https://www.twitch.tv/ai_webtv).

The main code of the webtv is located inside the [media-server](https://huggingface.co/spaces/jbilcke-hf/media-server/tree/main) :

manual steps:
- human input to write a short paragraph describing a multi-shot video sequence
- manual submit it to GPT-4 to generate a list of video captions for each shot (the system instructions are extracts from a stable diffusion guide)
- commit the captions to the [playlist database](https://huggingface.co/spaces/jbilcke-hf/media-server/raw/main/database.json)

Inside the `media-server` space (generation process running in the background):
- for each prompt in the database
- generate a silent 3 seconds video clip with   Zeroscope V2 576w (hosted on Hugging Face Spaces)
- upscale the clip with  Zeroscope V2 XL (also a HF Space)
- perform frame interpolation with FILM (also a HF Space)
- storage in the Persistent Storage of the media-server Space

Inside the `media-server` space (streaming process running in the foreground):
- for each video file in the persistent storage folder
- add it to a new FFmpeg playlist (it's just a .txt file)
- broadcast it over the RTMP protocol using FFmpeg (in FLV format)
- diffusion of the stream using node-media-server

Inside the `AI-WebTV` space:
- display the stream using `mpegts.js`
- this doesn't work on iPhone, but now there is also a Twitch mirror

