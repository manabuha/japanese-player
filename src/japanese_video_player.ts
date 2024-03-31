import {LitElement, html, PropertyValues} from 'lit';
import { property, query } from 'lit/decorators.js';
import style from 'style';
import {JpPanel} from 'subtitles/components/jp_panel/jp_panel';
import {JpSubtitles} from 'subtitles/jp_subtitles';
import {Subtitle, TextTrackExtended} from 'types';

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
  @query(JpPanel.is) panelElement!: JpPanel;

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
      <jp-panel .handleTextTrackClick="${this.toggleSubtitle}"></jp-panel>
  `;
  }

  public updated(changedProperties: PropertyValues) {
    if (changedProperties.has('subtitles') && this.videoElement) {
      // @ts-expect-error Type mismatch :(
      this.subtitlesElement.textTracks = this.videoElement.textTracks;
      // @ts-expect-error Type mismatch :(
      this.panelElement.textTracks = this.videoElement.textTracks;
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

  private toggleSubtitle = (textTrack: TextTrackExtended): void => {
    textTrack.isActive = textTrack.isActive === 'true' ?
      'false' :
      textTrack.isActive ?
        'true' :
        'false';

    this.subtitlesElement.forceUpdate();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'japanese-video-player': JapaneseVideoPlayer;
  }
}

customElements.define(JapaneseVideoPlayer.is, JapaneseVideoPlayer);
