import { html, fixture, expect } from '@open-wc/testing';
import "../project-two.js";

describe("ProjectTwo test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <project-two
        title="title"
      ></project-two>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
