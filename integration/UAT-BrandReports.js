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
		cy.get('.first-line',{timeout:15000}).first().find('h2').then(brd=>{
			var brand = brd.text()
			cy.get('input[id="input_product_search"]',{timeout:15000}).type(brand).type('{enter}')
			cy.get('a.btn',{timeout:15000}).contains('Details').should('have.attr','href','/report/brand/id/228279')
			cy.visit('https://app.prisync.com/report/brand/id/228279',{timeout:15000})
			cy.get('h2',{timeout:15000}).contains('Price position')
			cy.get('h2',{timeout:15000}).contains('Site breakdown')
			cy.get('h2').contains('Historical Index Chart')

			//Check Filter
			cy.get('li[id="preview-menu"]',{timeout:15000}).contains('Reports').click()
			cy.get('a',{timeout:15000}).contains('Brand Reports').click()
			cy.url().should('contain','/panel/report/type/brand')
			cy.get('[id="button_filter"]',{timeout:15000}).click()
			cy.get('[id="s2id_form_filter_brand"]',{timeout:15000}).find('.select2-choices').find('input').type(brand).type('{enter}',{force:true})
			cy.get('input[name="index_min"]',{timeout:15000}).type('0')
			cy.get('input[name="index_max"]',{timeout:15000}).type('10')

			//number of products
			cy.get('.product_count').should('have.text','5 Brands Found.')

			cy.wait(2000)
			//Reset
			cy.get('a.btn').contains('Reset').click()

		})
	})
})