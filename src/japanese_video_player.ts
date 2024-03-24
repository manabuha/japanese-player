import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import {Subtitle, SupportedLanguage} from 'types';
import {checkIfLanguageSupported} from 'utils';

export class JapaneseVideoPlayer extends LitElement {
  public static is: string = 'japanese-video-player';

  public static styles = css`
    :host {
      display: block;
    }

    video {
      width: 100%;
    }

    #container {
      position: relative;
      font-size: 16px;
    }

    #subtitles {
      position: absolute;
      top: 20%;
      left: 0;
      right: 0;
      max-width: 60%;
      margin: 0 auto;
      text-align: center;
      cursor: default;
      box-sizing: border-box;
    }

    #subtitles .language-container {
      border-radius: 8px;
    }

    #subtitles .language-container + .language-container {
      margin-top: 16px;
    }

    #subtitles .language-container {
      min-height: 20px;
      padding: 8px 12px;
      pointer-events: none;
    }

    #subtitles .language-container[active] {
      color: #ddd;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: all;
    }

    #subtitles .token:hover {
      color: #fff;
    }
`;

  @property({ type: String }) src = '';
  @property({ type: Array }) subtitles: Array<Subtitle> = [];
  @property({ type: Function }) handleTokenClick =
    (token: string): void => alert(token);

  @query('#video') videoElement!: HTMLVideoElement;
  @query('#subtitles') subtitlesElement!: HTMLDivElement;

  private parseSubtitlesLine(line: string): string[] {
    return line.split(' ');
  }

  private updateSubtitles(line: string, language: SupportedLanguage) {
    this.clearSubtitlesContent();

    const languageContainer = this.subtitlesElement.querySelector(
      `[lang="${language}"]`,
    );
    if (!languageContainer) return;
    this.updateLanguageContainerContent(line, languageContainer);
  }

  private updateLanguageContainerContent(line: string, languageContainer: Element) {
    const parsedLine = this.parseSubtitlesLine(line);
    for (let lineIndex = 0; lineIndex < parsedLine.length; lineIndex++) {
      const token = parsedLine[lineIndex];
      const tokenElement = this.createTokenElement(token);

      languageContainer.appendChild(tokenElement);
      this.maybeAddSpaceAfterToken(lineIndex, parsedLine.length, tokenElement);
    }
  }

  private maybeAddSpaceAfterToken(
    lineIndex: number,
    lastIndex: number,
    tokenElement: Element,
  ) {
    if (lineIndex !== lastIndex) {
      const space = document.createElement('span');
      space.textContent = ' ';
      tokenElement.insertAdjacentElement('afterend', space);
    }
  }

  private createTokenElement(token: string) {
    const tokenElement = document.createElement('span');
    tokenElement.textContent = token;
    tokenElement.addEventListener(
      'click',
      () => this.handleTokenClick(token),
    );
    tokenElement.classList.add('token');
    return tokenElement;
  }

  private clearSubtitlesContent() {
    const languageContainers =
      this.subtitlesElement.querySelectorAll('.language-container');

    for (const languageContainer of languageContainers) {
      languageContainer.innerHTML = '';
    }
  }

  private handleCueEnter(vttCue: VTTCue, language: SupportedLanguage) {
    const languageContainer = this.subtitlesElement.querySelector(
      `[lang="${language}"]`,
    );
    if (!languageContainer) return;

    languageContainer.toggleAttribute('active', true);
    console.log(vttCue);
    if (!vttCue.track || !checkIfLanguageSupported(vttCue.track.language)) {
      return;
    }
    this.updateSubtitles(vttCue.text, vttCue.track.language);
  }

  private handleCueExit(_vttCue: VTTCue, language: SupportedLanguage) {
    const languageContainer = this.subtitlesElement.querySelector(
      `[lang="${language}"]`,
    );
    if (!languageContainer) return;

    languageContainer.toggleAttribute('active', false);
  }

  private setUpCueChangeListener() {
    const video = this.videoElement;
    const textTracks = video.textTracks;

    const mutationCallback: MutationCallback = () => {
      for (const track of textTracks) {
        track.mode = 'hidden';

        this.maybeCreateLanguageContainers();

        track.addEventListener('cuechange', () => {
          console.log(track.cues);
          for (const cue of Array.from(track.cues ?? [])) {
            const vttCue = cue as VTTCue;
            if (!vttCue.track || !checkIfLanguageSupported(vttCue.track.language)) {
              return;
            }
            const lang = vttCue.track.language;
            vttCue.addEventListener('enter', () => this.handleCueEnter(vttCue, lang));
            vttCue.addEventListener('exit', () => this.handleCueExit(vttCue, lang));
          }
        });
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(video, { attributes: true });
  }

  private maybeCreateLanguageContainers() {
    if (this.subtitlesElement.childElementCount === 0) {
      for (const subtitle of this.subtitles) {
        const languageContainer = document.createElement('div');
        languageContainer.classList.add('language-container');
        languageContainer.setAttribute('lang', subtitle.srclang);
        this.subtitlesElement.appendChild(languageContainer);
      }
    }
  }

  public firstUpdated() {
    this.setUpCueChangeListener();
  }

  render() {
    return html`
      <div id="container">
        <video
            id="video"
            src="${this.src}"
            preload="auto"
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
            Your browser does not support the video tag.
        </video>
        <div id="subtitles"></div>
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
