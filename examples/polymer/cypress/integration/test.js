describe("Polymer test", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("it pulls data from api.ideal-postcodes.co.uk", () => {
    cy.document(document => {
      document
        .getElementsByTagName("ideal-postcodes-element")[0]
        .shadowRoot.getElementById("result").innerText;
      cy.log(text);
      expect(JSON.stringify(text)).to.have.string("2 Barons");
    });
  });
});
