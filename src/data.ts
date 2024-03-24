import {Subtitle} from 'types';

export const baseUrl = process.env.NODE_ENV === 'production' ?
  'https://raw.githubusercontent.com/daniilboyarinkov/japanese-player/prod' :
  '';

console.log(baseUrl);

export const subtitles: Subtitle[] = [
  {
    src: `${baseUrl}/src/mock/video_subs_en.vtt`,
    srclang: 'en',
    label: 'English',
    default: true
  },
  {
    src: `${baseUrl}/src/mock/video_subs_en.vtt`,
    srclang: 'ru',
    label: 'Русский'
  },
  {
    src: `${baseUrl}/src/mock/video_subs_en.vtt`,
    srclang: 'jpn',
    label: '日本語'
  }
];