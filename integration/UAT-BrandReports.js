describe('Category Reports',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('demo@prisync.com')
		cy.get('[name="password"]').type('demo')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('First',()=>{

		//Go path
		cy.get('li[id="preview-menu"]',{timeout:15000}).contains('Reports').click()
		cy.get('a',{timeout:15000}).contains('Brand Reports').click()
		cy.url().should('contain','/panel/report/type/brand')
		
		//Check field
		cy.get('h2',{timeout:15000}).contains('Price position')
		
		//Categories in the products should be visible this page.
		cy.get('.first-line',{timeout:15000}).first().find('h2').then(ctg=>{
			var category = ctg.text()
			cy.get('input[id="input_product_search"]',{timeout:15000}).type(category).type('{enter}')
			cy.get('a.btn',{timeout:15000}).contains('Details').click()
			cy.get('h2',{timeout:15000}).contains('Price position')
			cy.get('h2',{timeout:15000}).contains('Site breakdown')
			cy.get('h2').contains('Historical Index Chart')

		})
	})
})