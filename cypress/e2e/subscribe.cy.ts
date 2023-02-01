describe("Newsletter Subscribe Form", () => {
    beforeEach(() => {
        cy.intercept('/_next/static/development/_devMiddlewareManifest.json').as('fetch1')
        cy.visit("/")
        cy.wait('@fetch1')
    })
  
    it("allows users to subscribe to the email list", () => {
        cy.getByData("email-input").type("tom@aol.com")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("exist").contains("tom@aol.com")
    })

    it("does NOT allow an invalid email address", () => {
        cy.getByData("email-input").type("tom")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("not.exist")
      })

    it("does NOT allow already subscribed email addresses", () => {
        cy.getByData("email-input").type("john@example.com")
        cy.getByData("submit-button").click()
        cy.getByData("server-error-message").should("exist").contains("john@example.com already exists")
    })
  })

export {}