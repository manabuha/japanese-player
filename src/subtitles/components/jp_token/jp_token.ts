import {html, LitElement} from 'lit';
import {property} from 'lit/decorators.js';
import styles from 'subtitles/components/jp_token/style';

export class JpToken extends LitElement {
  public static is: string = 'jp-token';
  public static styles = styles;

  @property({ type: String })
    token = '';

  @property({ type: Function })
    handleTokenClick?: (token: string) => void;

  public render() {
    return html`
    <button @click="${this.handleClick}">
      ${this.token}
    </button>`;
  }

  private handleClick() {
    return this.handleTokenClick?.(this.token);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jp-token': JpToken;
  }
}

customElements.define(JpToken.is, JpToken);
