(function () {
    'use strict';

    const baseUrl = '' ;
    console.log(baseUrl);
    const subtitles = [
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

    const japaneseVideoPlayer = document.querySelector('japanese-video-player');
    japaneseVideoPlayer.src = `${baseUrl}/src/mock/video.mp4`;
    // @ts-expect-error HTMLElement does not expect subtitles in its signature.
    japaneseVideoPlayer.subtitles = subtitles;

})();
//# sourceMappingURL=index.js.map
