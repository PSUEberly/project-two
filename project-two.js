/**
 * Copyright 2024 Patrick Eberly
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import { WiredButton, WiredCombo, WiredItem, WiredCheckbox } from "wired-elements";

/**
 * `project-two`
 * 
 * @demo index.html
 * @element project-two
 */
export class ProjectTwo extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-two";
  }

  constructor() {
    super();
    this.seed = "1";
    this.base = 0;
    this.accessories = 0;
    this.hair = 0;
    this.face = 0;
    this.faceItem = 0;
    this.shirt = 0;
    this.skin = 0;
    this.pants = 0;
    this.hatColor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.size = 200;
  }

  static get properties() {
    return {
      seed: { type: String },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          padding: var(--ddd-spacing-4);
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-4);
        }
        .character-panel {
          text-align: center;
        }
        .inputs-panel {
          background-color: var(--ddd-theme-background-secondary);
          padding: var(--ddd-spacing-4);
        }

        wired-combo {
          flex: 1;
          width: 100%;
        }
        wired-checkbox {
          display: block;
          margin-top: var(--ddd-spacing-4);
        }
        wired-button {
          margin-top: var(--ddd-spacing-4);
        }
        .seed-display {
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-m);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-panel">
          <rpg-character
            seed="${this.seed}"
            hat="${this.hat}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
          ></rpg-character>
          <div class="seed-display">Seed: ${this.seed}</div>
        </div>
        <div class="inputs-panel">
          <h2>Customize Your Character</h2>
          ${this._renderCheckbox("Fire", "fire")}
          ${this._renderCheckbox("Walking", "walking")}
          ${this._renderCheckbox("Circle", "circle")}
        </div>
      </div>
    `;
  }
  _renderCheckbox(label, key) {
    return html`
      <wired-checkbox
        ?checked="${this[key]}"
        @change="${(e) => this._updateCheckbox(key, e.target.checked)}"
      >
        ${label}
      </wired-checkbox>
    `;
  }


  _getSeedIndex(key) {
    const mapping = {
      accessories: 0,
      base: 1,
      face: 2,
      faceItem: 3,
      hair: 4,
      pants: 5,
      shirt: 6,
      skin: 7,
      hatColor: 8,
    };
    return mapping[key] ?? -1;
  }

  _updateCheckbox(key, value) {
    this[key] = value;
  }

}

globalThis.customElements.define(ProjectTwo.tag, ProjectTwo);