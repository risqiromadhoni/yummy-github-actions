/// <reference types="cypress" />

describe('Post page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/posts')
  })

  it('should render home page', () => {
    cy.url({ timeout: 120 }).should('include', '/posts')
    cy.get('h2').should('be.visible')
    cy.get('h2').contains('Posts')
  })

  it('should have post card', () => {
    cy.url({ timeout: 120 }).should('include', '/posts')
    cy.get('a[class="hover:underline"]').should('be.visible')
  })
})

export {}
