# open-spotify-api
An open Spotify API that allows you to use public Spotify endpoints.

This API is fully modular.

### Find regularly updated Spotify TOTP secrets here: https://gist.github.com/uimaxbai/30c5d0a864d44e09b5a0fc1589431ae3

## Endpoints

### GET /spotify/playlist

API that returns all Spotify song links in a playlist.

#### Params

- `url`: The Spotify playlist URL (URL encoded)

#### Response

```json
{
  "songLinks": [
    "https://open.spotify.com/track/4nRhbx8L4ifnMKaE5jSQGR",
    "https://open.spotify.com/track/0j35X8cTq543QDYLOyqB8W",
    "https://open.spotify.com/track/5vJaDPHpkVAXetkF8YD88S",
    "https://open.spotify.com/track/2Wc6WJFIh86EDnlMxIKhv8",
    "https://open.spotify.com/track/6FRQ4HYndOhM4OlVt0Ou3L",
    "https://open.spotify.com/track/54X78diSLoUDI3joC2bjMz",
    "https://open.spotify.com/track/2s1sdSqGcKxpPr5lCl7jAV",
    "https://open.spotify.com/track/5g9f8tdbqs0yesSoHeFo62",
    "https://open.spotify.com/track/1GLIlVpCxVSAFyHls6eE0C",
    "https://open.spotify.com/track/538wQWciNel44Cwe5tqF9n",
    "https://open.spotify.com/track/1pjATX7sbd6Y4jMVqIvzHk",
    "https://open.spotify.com/track/4iIskIFGOnOS6pSwggKosI",
    "https://open.spotify.com/track/1dyHU9CgeTWIvb2serBHzE",
    "https://open.spotify.com/track/448aYzBX7pdzeNoJVw1QeA",
    "https://open.spotify.com/track/1YrnDTqvcnUKxAIeXyaEmU",
    "https://open.spotify.com/track/3ovQbkPW0RGloaaW4Gg4fK",
    "https://open.spotify.com/track/6gz6rxRge7BLRreM9uJXxI",
    "https://open.spotify.com/track/57ebBLITHpRgRKGrlbxMZS",
    "https://open.spotify.com/track/5G2g1EbEtFSMkMbAnhl7FV",
    "https://open.spotify.com/track/1WadE5KTwPPMruyCPSnVos",
    "https://open.spotify.com/track/1GqlvSEtMx5xbGptxOTTyk",
    "https://open.spotify.com/track/6R8524LWtCjlpMMeDP0waL",
    "https://open.spotify.com/track/423hwXFgoN8RYmqLoLuVvY",
    "https://open.spotify.com/track/4eHbdreAnSOrDDsFfc4Fpm",
    "https://open.spotify.com/track/0GD6Ug6ouPqkthlnT058aC",
    "https://open.spotify.com/track/1v98rfd0an913AzHvMNG8a",
    "https://open.spotify.com/track/1zgIt6PsAJcbKrDloi3dxt",
    "https://open.spotify.com/track/5GgFOblnQHXViOJymdtVP0",
    "https://open.spotify.com/track/37BmiT0Rgv3ui8MPnE02sZ",
    "https://open.spotify.com/track/1CSaCKPIp2yCIDL3t7Fyau",
    "https://open.spotify.com/track/0cqcRqZgkNHanWQ8slYA0v",
    "https://open.spotify.com/track/1MiWGSGDC5mGoP3MNclZ7s",
    "https://open.spotify.com/track/5d7wn8zwM98iGU9ceTHvWB",
    "https://open.spotify.com/track/3NrP99Q7bJ8KBgin3rO6Lb",
    "https://open.spotify.com/track/612VcBshQcy4mpB2utGc3H",
    "https://open.spotify.com/track/15j9XMtlPVsJpqCrDTv0MW",
    "https://open.spotify.com/track/79WLCOghf9QMQvSy3B96ep",
    <truncated>
  ],
  "totalTracks": 715
}
```

### GET /songlink

Proxy for SongLink. Translates streaming service links between each other.

#### Params

- `url`: The Spotify playlist URL (URL encoded)

#### Response (depends on whether song, album, etc)

```json
{
  "entityUniqueId": "TIDAL_ALBUM::194567097",
  "userCountry": "US",
  "pageUrl": "https://album.link/t/194567097",
  "entitiesByUniqueId": {
    "AMAZON_ALBUM::B09D183TMJ": {
      "id": "B09D183TMJ",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D, Carla Monroe",
      "thumbnailUrl": "https://m.media-amazon.com/images/I/51g00MNrd5L.jpg",
      "thumbnailWidth": 500,
      "thumbnailHeight": 500,
      "apiProvider": "amazon",
      "platforms": [
        "amazonMusic",
        "amazonStore"
      ]
    },
    "ANGHAMI_ALBUM::1021959507": {
      "id": "1021959507",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D & Carla Monroe",
      "thumbnailUrl": "https://artwork.anghcdn.co/cover/145304376/320",
      "thumbnailWidth": 1024,
      "thumbnailHeight": 1024,
      "apiProvider": "anghami",
      "platforms": [
        "anghami"
      ]
    },
    "BOOMPLAY_ALBUM::20361512": {
      "id": "20361512",
      "type": "album",
      "title": "Sleepless",
      "artistName": "D.O.D",
      "thumbnailUrl": "https://source.boomplaymusic.com/group10/M00/01/14/50c06666e1fa4a5a9b0437521516977c_464_464.jpg",
      "thumbnailWidth": 464,
      "thumbnailHeight": 464,
      "apiProvider": "boomplay",
      "platforms": [
        "boomplay"
      ]
    },
    "DEEZER_ALBUM::252624832": {
      "id": "252624832",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D, Carla Monroe",
      "thumbnailUrl": "https://cdns-images.dzcdn.net/images/cover/578bd3a4c6ec3d6db28f896049a5d717/500x500-000000-80-0-0.jpg",
      "thumbnailWidth": 500,
      "thumbnailHeight": 500,
      "apiProvider": "deezer",
      "platforms": [
        "deezer"
      ]
    },
    "ITUNES_ALBUM::1581786154": {
      "id": "1581786154",
      "type": "album",
      "title": "Still Sleepless - Single",
      "artistName": "D.O.D & Carla Monroe",
      "thumbnailUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/7b/3b/8f/7b3b8fbf-1eb5-31e2-926a-55241914104b/source/512x512bb.jpg",
      "thumbnailWidth": 512,
      "thumbnailHeight": 512,
      "apiProvider": "itunes",
      "platforms": [
        "appleMusic",
        "itunes"
      ]
    },
    "NAPSTER_ALBUM::alb.605967848": {
      "id": "alb.605967848",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "DoD",
      "thumbnailUrl": "https://direct.rhapsody.com/imageserver/images/alb.605967848/385x385.jpeg",
      "thumbnailWidth": 385,
      "thumbnailHeight": 385,
      "apiProvider": "napster",
      "platforms": [
        "napster"
      ]
    },
    "PANDORA_ALBUM::AL:10417856": {
      "id": "AL:10417856",
      "type": "album",
      "title": "Still Sleepless (Single)",
      "artistName": "D.O.D",
      "thumbnailUrl": "https://content-images.p-cdn.com/images/92/4a/fa/ee/d5f64c06be9f805620d47d39/_500W_500H.jpg",
      "thumbnailWidth": 500,
      "thumbnailHeight": 500,
      "apiProvider": "pandora",
      "platforms": [
        "pandora"
      ]
    },
    "SOUNDCLOUD_PLAYLIST::1303333330": {
      "id": "1303333330",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D",
      "thumbnailUrl": "https://i1.sndcdn.com/artworks-e401f0fd-11fb-4730-95fe-a7a1d21f0f59-0-t500x500.jpg",
      "thumbnailWidth": 500,
      "thumbnailHeight": 500,
      "apiProvider": "soundcloud",
      "platforms": [
        "soundcloud"
      ]
    },
    "SPOTIFY_ALBUM::0R8Q1Ssj8x17w30NUas7yu": {
      "id": "0R8Q1Ssj8x17w30NUas7yu",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D, Carla Monroe",
      "thumbnailUrl": "https://i.scdn.co/image/ab67616d0000b273ce09321ad586bf258a394f43",
      "thumbnailWidth": 640,
      "thumbnailHeight": 640,
      "apiProvider": "spotify",
      "platforms": [
        "spotify"
      ]
    },
    "TIDAL_ALBUM::194567097": {
      "id": "194567097",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D, Carla Monroe",
      "thumbnailUrl": "https://resources.tidal.com/images/73b721a4/83a4/4f87/8a4a/8984c3180efb/640x640.jpg",
      "thumbnailWidth": 640,
      "thumbnailHeight": 640,
      "apiProvider": "tidal",
      "platforms": [
        "tidal"
      ]
    },
    "YANDEX_ALBUM::17553280": {
      "id": "17553280",
      "type": "album",
      "title": "Still Sleepless",
      "artistName": "D.O.D, Carla Monroe",
      "thumbnailUrl": "https://avatars.yandex.net/get-music-content/5207413/569ab42e.a.17553280-1/600x600",
      "thumbnailWidth": 600,
      "thumbnailHeight": 600,
      "apiProvider": "yandex",
      "platforms": [
        "yandex"
      ]
    },
    "YOUTUBE_PLAYLIST::OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw": {
      "id": "OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw",
      "type": "album",
      "title": "Album - Still Sleepless",
      "artistName": "D.O.D",
      "thumbnailUrl": "https://i9.ytimg.com/s_p/OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw/sddefault.jpg?sqp=CKC9kbAGir7X7AMICIPxjrAGEAE=&rs=AOn4CLCuWZNIIgY4ShNy8ZA1L1LtWbIbhw&v=1711519875",
      "thumbnailWidth": 640,
      "thumbnailHeight": 640,
      "apiProvider": "youtube",
      "platforms": [
        "youtube",
        "youtubeMusic"
      ]
    }
  },
  "linksByPlatform": {
    "amazonMusic": {
      "country": "US",
      "url": "https://music.amazon.com/albums/B09D183TMJ",
      "entityUniqueId": "AMAZON_ALBUM::B09D183TMJ"
    },
    "amazonStore": {
      "country": "US",
      "url": "https://amazon.com/dp/B09D183TMJ",
      "entityUniqueId": "AMAZON_ALBUM::B09D183TMJ"
    },
    "anghami": {
      "country": "US",
      "url": "https://play.anghami.com/album/1021959507?refer=linktree",
      "entityUniqueId": "ANGHAMI_ALBUM::1021959507"
    },
    "boomplay": {
      "country": "US",
      "url": "https://www.boomplay.com/albums/20361512",
      "entityUniqueId": "BOOMPLAY_ALBUM::20361512"
    },
    "deezer": {
      "country": "US",
      "url": "https://www.deezer.com/album/252624832",
      "entityUniqueId": "DEEZER_ALBUM::252624832"
    },
    "appleMusic": {
      "country": "US",
      "url": "https://geo.music.apple.com/us/album/_/1581786154?mt=1&app=music&ls=1&at=1000lHKX&ct=api_http&itscg=30200&itsct=odsl_m",
      "nativeAppUriMobile": "music://itunes.apple.com/us/album/_/1581786154?mt=1&app=music&ls=1&at=1000lHKX&ct=api_uri_m&itscg=30200&itsct=odsl_m",
      "nativeAppUriDesktop": "itmss://itunes.apple.com/us/album/_/1581786154?mt=1&app=music&ls=1&at=1000lHKX&ct=api_uri_d&itscg=30200&itsct=odsl_m",
      "entityUniqueId": "ITUNES_ALBUM::1581786154"
    },
    "itunes": {
      "country": "US",
      "url": "https://geo.music.apple.com/us/album/_/1581786154?mt=1&app=itunes&ls=1&at=1000lHKX&ct=api_http&itscg=30200&itsct=odsl_m",
      "nativeAppUriMobile": "itmss://itunes.apple.com/us/album/_/1581786154?mt=1&app=itunes&ls=1&at=1000lHKX&ct=api_uri_m&itscg=30200&itsct=odsl_m",
      "nativeAppUriDesktop": "itmss://itunes.apple.com/us/album/_/1581786154?mt=1&app=itunes&ls=1&at=1000lHKX&ct=api_uri_d&itscg=30200&itsct=odsl_m",
      "entityUniqueId": "ITUNES_ALBUM::1581786154"
    },
    "napster": {
      "country": "US",
      "url": "https://play.napster.com/album/alb.605967848",
      "entityUniqueId": "NAPSTER_ALBUM::alb.605967848"
    },
    "pandora": {
      "country": "US",
      "url": "https://www.pandora.com/AL:10417856",
      "entityUniqueId": "PANDORA_ALBUM::AL:10417856"
    },
    "soundcloud": {
      "country": "US",
      "url": "https://soundcloud.com/d-o-d/sets/still-sleepless?utm_medium=api&utm_campaign=social_sharing&utm_source=id_314547",
      "entityUniqueId": "SOUNDCLOUD_PLAYLIST::1303333330"
    },
    "spotify": {
      "country": "US",
      "url": "https://open.spotify.com/album/0R8Q1Ssj8x17w30NUas7yu",
      "nativeAppUriDesktop": "spotify:album:0R8Q1Ssj8x17w30NUas7yu",
      "entityUniqueId": "SPOTIFY_ALBUM::0R8Q1Ssj8x17w30NUas7yu"
    },
    "yandex": {
      "country": "RU",
      "url": "https://music.yandex.ru/album/17553280",
      "entityUniqueId": "YANDEX_ALBUM::17553280"
    },
    "youtube": {
      "country": "US",
      "url": "https://www.youtube.com/playlist?list=OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw",
      "entityUniqueId": "YOUTUBE_PLAYLIST::OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw"
    },
    "youtubeMusic": {
      "country": "US",
      "url": "https://music.youtube.com/playlist?list=OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw",
      "entityUniqueId": "YOUTUBE_PLAYLIST::OLAK5uy_l86DibiDA776PehlCTznw5FHUXPxb9hyw"
    },
    "tidal": {
      "country": "US",
      "url": "https://listen.tidal.com/album/194567097",
      "entityUniqueId": "TIDAL_ALBUM::194567097"
    }
  }
}
```