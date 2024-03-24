import {baseUrl, subtitles} from 'data';
import {JapaneseVideoPlayer} from 'japanese_video_player';

const japaneseVideoPlayer =
  document.querySelector(
    'japanese-video-player',
  )! as JapaneseVideoPlayer;
japaneseVideoPlayer.src = `${baseUrl}/src/mock/video.mp4`;
// @ts-expect-error HTMLElement does not expect subtitles in its signature.
japaneseVideoPlayer.subtitles = subtitles;
