describe('Panel',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('first',()=>{
		cy.url().should('contain','/dashboard')
		cy.get('a',{timeout:15000}).contains('Products').click()
		cy.url().should('contain','/panel')
		cy.get('div[class="product"]').its('length').should('to.equal',2)

		//Controlling to product url number equals
		cy.get('div[class="product"]',{timeout:15000}).first().click()
		cy.get('#product-row').first().find('.products_table').children('tbody').children().its('length').should('to.equal',3)

		//Controlling to product fields
		cy.get('#product-row').first().find('[class="brand-name"]').should('have.text','Apple')
		cy.get('#product-row').first().find('[class="category-name"]').should('have.text','Smart Phones')
		cy.get('#product-row').first().find('[id="product-cost"]').should('have.text','0.00 TRY')
		cy.get('#product-row').first().find('[id="product-sp"]').should('have.text','Set a pricing rule to see a SmartPrice suggestion.')

	})
})