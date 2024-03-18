import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

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
  @property({ type: Array<string> }) subtitles = [];

  render() {
    return html`
      <div id="container">
        <video src="${this.src}" controls>
          <!-- <tracks> -->
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
