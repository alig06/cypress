// Login Case

describe('Login',()=>{
	beforeEach('beforeEach',()=>{
		cy.clearCookies()
		cy.wait(1500)
	})
	it('Login Success',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('Wrong e-mail',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('WRONG'+'TryAccount@hotmail.com')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('No user found!')
	})
	it('Wrong Password',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]').type('WRONG'+'Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('Wrong e-mail or password!')
	})
	it('Empty E-mail',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('invalid email')
	})
	it('Empty Password',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('password is required.')
	})
	it('Empty All Fields',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]')
		cy.get('[name="password"]')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('invalid email')
	})
	it('Empty All Fields Not POST',()=>{
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]')
		cy.get('[name="password"]')
		cy.get('button[name="submit"]').contains('Sign In').click()
		cy.get('div').children('Strong').contains('invalid email')

		//If url be equal 'dashbord', POST would be successful.
		cy.url().should('not.contain','/dashboard')
	})
	
})

