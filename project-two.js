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
    this.seed = "0000000000";
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
    this.scale = 1;
  }

  static get properties() {
    return {
      seed: { type: String },
      base: { type: Number },
      accessories: { type: Number },
      hair: { type: Number },
      face: { type: Number },
      faceItem: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      pants: { type: Number },
      hatColor: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
      scale: { type: Number },
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
          --rpg-character-scale: 1;
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-4);
        }
        .character-panel {
          text-align: center;
          background-color: var(--ddd-theme-default-beaverBlue);
        }
        .inputs-panel {
          padding: var(--ddd-spacing-4);
          background-color: var(--ddd-theme-default-pughBlue);
        }

        .dropdown-row {
          display: flex;
          gap: var(--ddd-spacing-4);
          margin-bottom: var(--ddd-spacing-4);
        }
        .dropdown-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        rpg-character {
          transform: scale(var(--rpg-character-scale, 1));
          margin: var(--ddd-spacing-16);

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
          style="--rpg-character-scale: ${this.scale}"
            seed="${this.seed}"
            base="${this.base}"
            face="${this.face}"
            faceitem="${this.faceItem}"
            accessories="${this.accessories}"
            hat="${this.hat}"
            pants="${this.pants}"
            shirt="${this.shirt}"
            skin="${this.skin}"
            scale="${this.scale}"
            hatColor="${this.hatColor}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
          ></rpg-character>
          <div class="seed-display">Seed: ${this.seed}</div>
        </div>

        <div class="inputs-panel">
          <h2>Customize Your Character</h2>
          ${this._renderDropdownRow([
            { label: "Accessories", key: "accessories", range: 10 },
            { label: "Base", key: "base", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Face", key: "face", range: 6 },
            { label: "Face Item", key: "faceItem", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Hair", key: "hair", range: 10 },
            { label: "Pants", key: "pants", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Shirt", key: "shirt", range: 10 },
            { label: "Skin", key: "skin", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Hat Color", key: "hatColor", range: 10 },
            { label: "Hat", key: "hat", values: [
              "none",
              "bunny",
              "coffee",
              "construction",
              "cowboy",
              "education",
              "knight",
              "ninja",
              "party",
              "pirate",
              "watermelon",
            ] },
          ])}

          <label for="scale">Character Size:</label>
          <wired-slider 
            id="scale" 
            value="2.5" 
            min="1" 
            max="3" 
            step=".5"
            @change="${(e) => this._updateCheckbox('scale', parseFloat(e.detail.value))}">
          </wired-slider>

          ${this._renderCheckbox("Fire", "fire")}
          ${this._renderCheckbox("Walking", "walking")}
          ${this._renderCheckbox("Circle", "circle")}
        </div>
      </div>
    `;
  }

  _renderDropdownRow(dropdowns) {
    return html`
      <div class="dropdown-row">
        ${dropdowns.map((dropdown) =>
          html`<div class="dropdown-container">
            <label>${dropdown.label}</label>
            ${dropdown.values
              ? this._renderDropdownWithValues(dropdown.key, dropdown.values)
              : this._renderDropdown(dropdown.key, dropdown.range)}
          </div>`
        )}
      </div>
    `;
  }
  _renderDropdown(key, range) {
    return html`
      <wired-combo
        @selected="${(e) => this._updateSeed(key, e.detail.value)}"
      >
        ${Array.from({ length: range }, (_, i) => html`<wired-item value="${i}">${i}</wired-item>`)}
      </wired-combo>
    `;
  }

  _renderDropdownWithValues(key, values) {
    return html`
      <wired-combo
        @selected="${(e) => this._updateSeed(key, e.detail.value)}"
      >
        ${values.map((value) => html`<wired-item value="${value}">${value}</wired-item>`)}
      </wired-combo>
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