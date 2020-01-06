describe("Polymer test", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("it pulls data from api.ideal-postcodes.co.uk", () => {
    cy.document(document => {
      const text = document.getElementById("result").innerText;
      expect(JSON.stringify(text)).to.have.string("2 Barons");
    });
  });
});
