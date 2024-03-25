import {property} from 'lit/decorators.js';
import styles from 'subtitles/style';
import {LitElement, html} from 'lit';

import 'subtitles/components/jp_line/jp_line';

export class JpSubtitles extends LitElement {
  public static is: string = 'jp-subtitles';
  public static styles = styles;

  @property({ type: Object })
    textTracks?: TextTrackList;

  @property({ type: Function })
    handleTokenClick?: (token: string) => void;

  public render() {
    if (!this.textTracks) {
      return html``;
    }

    return html`
      ${Array.from(this.textTracks).map((textTrack) => (
    html`
          <jp-line
            lang="${textTrack.language}"
            .textTrack="${textTrack}"
            .handleTokenClick="${this.handleTokenClick}"
          "></jp-line>
        `
  ))}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jp-subtitles': JpSubtitles;
  }
}

customElements.define(JpSubtitles.is, JpSubtitles);
