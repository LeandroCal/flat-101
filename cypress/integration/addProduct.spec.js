/// <reference types="cypress" />
import 'cypress-file-upload'

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/product')
    })

    it('Add product happy path', () => {
        cy.get('#add-product-name').type('Sofá')
        cy.get('#add-product-price').type(999)
        cy.get('#add-product-description').type(
            'Muy cómodo, perfecto para echarte unos fifas'
        )
        const fixtureFile = 'sofa.jpg'
        cy.get('#add-product-image').attachFile(fixtureFile)

        cy.get('#add-product-submit').click()
        cy.location('pathname').should('eq', '/')
    })

    it('Add product with errors', () => {
        cy.get('#add-product-submit').click()

        cy.get('#add-product-name').should('have.class', 'error')
        cy.get('#add-product-price').should('have.class', 'error')
        cy.get('#add-product-description').should('have.class', 'error')

        cy.get('#add-product-name').type('Silla')
        cy.get('#add-product-name').should('have.class', '')
        cy.get('#add-product-price').type(12)
        cy.get('#add-product-price').should('have.class', '')
        cy.get('#add-product-description').type('Color blanco o negro')
        cy.get('#add-product-description').should('have.class', '')

        const fixtureFile = 'silla.jpg'
        cy.get('#add-product-image').attachFile(fixtureFile)

        cy.get('#add-product-submit').click()
        cy.location('pathname').should('eq', '/')
    })
})
