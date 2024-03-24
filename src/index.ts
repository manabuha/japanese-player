import {baseUrl, subtitles} from 'data';
import {JapaneseVideoPlayer} from 'japanese_video_player';

const handleSubtitlesTokenClick = (token: string): void => {
  alert(token);
};

const japaneseVideoPlayer =
  document.querySelector(
    'japanese-video-player',
  )! as JapaneseVideoPlayer;

japaneseVideoPlayer.src = `${baseUrl}/src/mock/video.mp4`;
japaneseVideoPlayer.subtitles = subtitles;
japaneseVideoPlayer.handleTokenClick = handleSubtitlesTokenClick;
