import {LitElement, html, PropertyValues} from 'lit';
import { property, query } from 'lit/decorators.js';
import style from 'style';
import {JpSubtitles} from 'subtitles/jp_subtitles';
import {Subtitle} from 'types';

export class JapaneseVideoPlayer extends LitElement {
  public static is: string = 'japanese-video-player';

  public static styles = style;

  @property({ type: String })
    src = '';

  @property({ type: Array })
    subtitles: Array<Subtitle> = [];

  @property({ type: Function })
    handleTokenClick?: (token: string) => void;

  @query('#video') videoElement!: HTMLVideoElement;
  @query(JpSubtitles.is) subtitlesElement!: JpSubtitles;

  public render() {
    return html`
      <video
        id="video"
        src="${this.src}"
        preload="auto"
        controls
        controlsList="nodownload"
      >
        ${this.subtitles.map(
    (subtitle: Subtitle) => html`
            <track
              id="${subtitle.srclang}"
              kind="subtitles"
              src="${subtitle.src}"
              srclang="${subtitle.srclang}"
              label="${subtitle.label}"
              ${subtitle.default ? 'default' : ''}
            >`)}
          Your browser does not support the video tag.
      </video>
      <jp-subtitles .handleTokenClick="${this.handleTokenClick}"></jp-subtitles>
  `;
  }

  public updated(changedProperties: PropertyValues) {
    if (changedProperties.has('subtitles') && this.videoElement) {
      this.subtitlesElement.textTracks = this.videoElement.textTracks;
    }
  }

  public firstUpdated(changedProperties: PropertyValues) {
    if (changedProperties.has('subtitles') && this.videoElement) {
      this.loadSubtitles();
    }
  }

  private loadSubtitles() {
    for (const textTrack of this.videoElement.textTracks) {
      textTrack.mode = 'showing';
      textTrack.mode = 'hidden';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'japanese-video-player': JapaneseVideoPlayer;
  }
}

customElements.define(JapaneseVideoPlayer.is, JapaneseVideoPlayer);
