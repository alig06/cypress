describe('Dashboard',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('first',()=>{
		
		//Take to numbers
		cy.get('a').contains('Products').click()
		cy.get('[class="brand-name"]').then(numberLen => {
			var numberBrand = numberLen.length
			console.log(numberBrand)
			cy.get('[class="category-name"]').then(categoryLen=>{
				var category = categoryLen.length
				console.log(category)
				cy.get('[class="product"]').then(productLen=>{
					var product = productLen.length
					console.log(product)

					// Controlling to numbers equal
					cy.get('a').contains('Dashboard').click()
					cy.get('[href="/panel"]').find('.num-summary').contains(product)
					cy.get('[href="/panel/report/type/brand"]').find('.num-summary').contains(numberBrand)
					cy.get('[href="/panel/report/type/category"]').find('.num-summary').contains(category)
				})
			})
		})
		//Index Text
		cy.get('a').contains('Dashboard').click()
		cy.get('[id="myspartkline"]',{timeout:15000}).contains('Updating indices...')

		//--------------------------------------------------------------------------------

		//Price Changes
		cy.get('h2').contains('Price changes').parent().should('be.visible')
		
		//If this field's text equal to 0 , Passed .
		cy.get('[id="increased"]').should('have.text','0')
		cy.get('[id="decreased"]').should('have.text','0')

		//--------------------------------------------------------------------------------

		//Out of stock
		cy.get('h2').contains('Out of stock').parent().should('be.visible')

		//If this field's text equal to 0 , Passed .
		cy.get('[id="competitorstockout"]').should('have.text','0')
		cy.get('[id="mystockout"]').should('have.text','0')

		//--------------------------------------------------------------------------------

		//Position
		cy.get('h2').contains('Position').parent().should('be.visible')
		
		//If this field's text equal to 0 , Passed .
		cy.get('[id="cheapest"]').should('have.text','0')
		cy.get('[id="cheaper"]').should('have.text','0')
		cy.get('[id="average"]').should('have.text','0')
		cy.get('[id="higher"]').should('have.text','0')
		cy.get('[id="highest"]').should('have.text','0')
		cy.get('[id="allequal"]').should('have.text','0')

	})
})