describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username').parent().should('contain', 'username:')
    cy.get('#password').parent().should('contain', 'password:')
  })
})
