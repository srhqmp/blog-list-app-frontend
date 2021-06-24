describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    const user = {
      name: 'Test User',
      username: 'username',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username').parent().should('contain', 'username:')
    cy.get('#password').parent().should('contain', 'password:')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
      cy.get('.success')
        .should('contain', 'Successfully logged in Test User')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        // log in user here
        const user = {
          username: 'username',
          password: 'password',
        }

        cy.login(user)
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('Test Blog Title')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('Test URL')

        cy.get('#create-blog').click()

        cy.get('.success').should(
          'contain',
          'a new blog Test Blog Title by Test Author added'
        )

        cy.get('.blogTitle').should('contain', 'Test Blog Title')
        cy.get('.blogAuthor').should('contain', 'Test Author')
      })

      it('A user can like a blog', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('Test Like button')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('Test URL')
        cy.get('#create-blog').click()

        cy.get('#toggleVisibilityButton').click()
        cy.get('#likeButton').click().as('likeButton')
        cy.get('.blogLikes').as('likes').should('contain', '1 like')

        cy.get('@likeButton').click()
        cy.get('@likes').should('contain', '2 likes')
      })
    })
  })
})
