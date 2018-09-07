describe('Dynamic Price',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('demo@prisync.com')
		cy.get('[name="password"]').type('demo')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('First',()=>{
		
		//Add New Rule.
		cy.get('a[href="/dynamicPricing"]',{timeout:15000}).click()
		cy.get('[id="add-new-rule"]',{timeout:15000}).click()

		
		//Create new rule and check options.
		cy.get('input[id="rule-pricing-position-value"]',{timeout:15000}).type('{selectall}').type('5')
		cy.get('select[id="rule-pricing-position-value-type"]',{timeout:15000}).select('TRY')
		cy.get('select[id="rule-pricing-position-value-type"]',{timeout:15000}).select('%')
		cy.get('select[id="rule-pricing-position"]',{timeout:15000}).select('higher')
		cy.get('select[id="rule-pricing-position"]',{timeout:15000}).select('lower')
		cy.get('select[id="rule-breakdown"] option',{timeout:15000}).contains('average')
		cy.get('select[id="rule-breakdown"] option',{timeout:15000}).contains('highest')
		cy.get('select[id="rule-breakdown"] option',{timeout:15000}).contains('cheapest')
		cy.get('select[id="competitors"]',{timeout:15000}).select('teknosa.com')
		cy.get('input[id="rule-profit-value"]',{timeout:15000}).type('{selectall}').type('5')
		cy.get('select[id="rule-profit-value-type"]',{timeout:15000}).select('%')
		
		//SmartPrice field include number, Should be equal product number.
		cy.get('[id="suggested-price-live-view"]',{timeout:15000}).find('tbody').find('tr').then(page1=>{
			var pg1 = page1.length
			console.log(pg1)
			cy.get('[href="/SuggestedPriceTable?Product_page=2"]',{timeout:15000}).contains('2').click()
			cy.wait(3000)
			cy.get('[id="suggested-price-live-view"]',{timeout:15000}).find('tbody').find('tr').then(page2=>{
				var pg2 = page2.length
				var total = pg1+pg2
				
				cy.get('[id="new-rule-form-title"]').contains('Add New Rule')
				cy.get('[id="suggested-price-live-table-title"]',{timeout:15000}).contains('SmartPrice Live View ('+total+' products)')		

			})

		})

	})
})