import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

interface Subtitle {
  src: string,
  srclang: 'en' | 'ru' | 'jpn',
  label: string,
  default: boolean,
}

export class JapaneseVideoPlayer extends LitElement {
  public static is: string = 'japanese-video-player';

  static styles = css`
    :host {
      display: block;
    }
    video {
      width: 100%;
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: Array<Subtitle> }) subtitles = [];

  connectedCallback() {
    super.connectedCallback();
    console.log(this.subtitles);
  }

  render() {
    return html`
      <div id="container">
        <video
            id="video"
            src="${this.src}"
            preload="metadata"
            controls
            controlsList="nodownload"
        >
          <!-- <tracks> -->
          ${this.subtitles.map(
    (subtitle: Subtitle) => html`
                <track
                    kind="subtitles"
                    src="${subtitle.src}"
                    srclang="${subtitle.srclang}"
                    label="${subtitle.label}"
                    ${subtitle.default ? 'default' : ''}
                >`)}
        </video>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'japanese-video-player': JapaneseVideoPlayer;
  }
}

customElements.define(JapaneseVideoPlayer.is, JapaneseVideoPlayer);
