describe('Dashboard',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.clearCookies()
		cy.wait(1500)
		cy.visit('https://www.prisync.com/login')
		cy.get('[name="email"]').type('TryAccount@hotmail.com')
		cy.get('[name="password"]').type('Pri_Ui=05')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('first',()=>{
		
		//Take to numbers
		cy.get('a').contains('Products').click()
		cy.get('[class="brand-name"]',{timeout:15000}).then(numberLen => {
			var numberBrand = numberLen.length
			console.log(numberBrand)
			cy.get('[class="category-name"]',{timeout:15000}).then(categoryLen=>{
				var category = categoryLen.length
				console.log(category)
				cy.get('[class="product"]',{timeout:15000}).then(productLen=>{
					var product = productLen.length
					console.log(product)

					// Controlling to numbers equal
					cy.get('a',{timeout:15000}).contains('Dashboard').click()
					cy.get('[href="/panel"]',{timeout:15000}).find('.num-summary').contains(product)
					cy.get('[href="/panel/report/type/brand"]',{timeout:15000}).find('.num-summary').contains(numberBrand)
					cy.get('[href="/panel/report/type/category"]',{timeout:15000}).find('.num-summary').contains(category)
				})
			})
		})
		//Index Text
		cy.get('a',{timeout:15000}).contains('Dashboard').click()
		cy.wait(5000)
		cy.get('[id="index-info"]',{timeout:15000}).find('.text-center').then(ln=>{
			var len = ln.val().length
			if (len == 0 || len >= 1){
				//Price Changes
				cy.get('h2').contains('Price changes').parent().should('be.visible')
				
				//If this field's text equal to 0 , Passed .
				cy.get('[id="increased"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="decreased"]',{timeout:15000}).should('have.text','0')

				//--------------------------------------------------------------------------------

				//Out of stock
				cy.get('h2',{timeout:15000}).contains('Out of stock').parent().should('be.visible')

				//If this field's text equal to 0 , Passed .
				cy.get('[id="competitorstockout"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="mystockout"]',{timeout:15000}).should('have.text','0')

				//--------------------------------------------------------------------------------

				//Position
				cy.get('h2',{timeout:15000}).contains('Position').parent().should('be.visible')
				
				//If this field's text equal to 0 , Passed .
				cy.get('[id="cheapest"]',{timeout:15000}).should('have.text','1')
				cy.get('[id="cheaper"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="average"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="higher"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="highest"]',{timeout:15000}).should('have.text','0')
				cy.get('[id="allequal"]',{timeout:15000}).should('have.text','0')

			}
			

		})

	})
})