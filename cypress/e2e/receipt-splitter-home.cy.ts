describe("Receipt Splitter Home Page", () => {
  beforeEach(() => {
    Cypress.env("NEXT_PUBLIC_APP", "receipt_splitter")
    cy.visit("/")
  })

  afterEach(() => {
    // cy.screenshot() // Take a screenshot after each test
  })

  it("should have the correct page title", () => {
    cy.get("head title").should("contain", "Receipt Splitter")
  })

  it("should load the header", () => {
    cy.get('[data-testid="header"]').should("exist")
  })

  it("should display the sign-in link", () => {
    cy.get('[data-testid="sign-in-link"]').should("exist")
  })

  it("should display the get-started button", () => {
    cy.get('[data-testid="get-started-button"]').should("exist")
  })

  // You can add more specific tests here, for example:
  it("should navigate to login page when clicking sign-in link", () => {
    cy.get('[data-testid="sign-in-link"]').click()
    cy.url().should("include", "/login")
  })

  it("should navigate to register page when clicking get-started button", () => {
    cy.get('[data-testid="get-started-button"]').click()
    cy.url().should("include", "/register")
  })
})
