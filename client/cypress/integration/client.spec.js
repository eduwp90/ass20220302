describe('Client E2E tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('frontpage can be opened', () => {
    cy.contains('Calculate commission:')
  })

  it('Form requires required values && disables submit', () => {
    cy.contains('Submit').click()
    cy.contains('Required')
    cy.contains('Submit').should('be.disabled')
  })

  it('Client input requires valid input && disables submit', () => {
    cy.get('#client_id').type('-5')
    cy.get('#amount').click()
    cy.contains('No negative numbers')
    cy.contains('Submit').should('be.disabled')

    cy.get('#client_id').clear().type('abc')
    cy.get('#amount').click()
    cy.contains('must be a number')
    cy.contains('Submit').should('be.disabled')
  })

  it('Amount input requires valid input && disables submit', () => {
    cy.get('#amount').type('-5')
    cy.get('#client_id').click()
    cy.contains('bigger than 0')
    cy.contains('Submit').should('be.disabled')

    cy.get('#amount').clear().type('abc')
    cy.get('#client_id').click()
    cy.contains('must be a number')
    cy.contains('Submit').should('be.disabled')
  })

  it('should show commission on submit', () => {
    cy.get('#amount').type('1000')
    cy.get('#client_id').type('42')
    cy.get('#date').click()
    cy.contains('Today').click()
    cy.contains('Submit').click()
    cy.intercept({
      method: 'POST',
      path: '/v1/commission'
    }).as('APIRequest')
    cy.contains('EUR')
  })
})
