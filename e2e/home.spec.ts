/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should render home page', () => {
    cy.get('h1').contains('Blog.')
    cy.get('img[alt="Cover Image for Dynamic Routing and Static Generation"]').should('be.visible').and((img) => {
      expect(img[0].clientWidth).to.be.greaterThan(0)
    })
  })

  it('should navigate to the /posts', () => {
    cy.get('a[href="/posts"]').should('be.visible').click({ multiple: true })
    cy.url({ timeout: 500 }).should('include', '/posts')
    cy.get('h2').contains('Posts')
  })

  it('should navigate to the /posts/hello-world', () => {
    cy.get('a[href="/posts/hello-world"]').should('be.visible').click({ multiple: true })
    cy.url({ timeout: 500 }).should('include', '/posts/hello-world')
    cy.get('h1').contains('Learn How to Pre-render Pages Using Static Generation with Next.js')
  })

  it('should navigate to the /posts/preview', () => {
    cy.get('a[href="/posts/preview"]').should('be.visible').click({ multiple: true })
    cy.url({ timeout: 500 }).should('include', '/posts/preview')
    cy.get('h1').contains('Preview Mode for Static Generation')
  })
})

export {}
