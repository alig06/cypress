describe('Category Reports',()=>{
	before('LOGİN',()=>{
		//LOGİN
		cy.visit('www.prisync.com/login')
		cy.get('[name="email"]').type('demo@prisync.com')
		cy.get('[name="password"]').type('demo')
		cy.get('button[name="submit"]').contains('Sign In').click()
	})
	it('First',()=>{

		cy.get('a',{timeout:15000}).contains('Reports').click()
		cy.get('[id="excel-reports"]',{timeout:15000}).find('.badge').then(bdg=>{
			var bd = bdg.text()
			//Value type make integer
			var badge = parseInt(bd)
			var badge2 = badge+1
			//Value type make string
			var strBadge= badge2.toString()
			console.log()

			cy.get('a',{timeout:15000}).contains('Products').click()
			cy.get('.product').then(pro=>{
				var product = pro.length
				if (product >0){
					cy.get('[id="a_export_csv"]',{timeout:15000}).click()
					
					//Wait for download csv
					cy.wait (5000)

					//
					cy.get('.modal-header:visible').find('[id="myModalLabel"]',{timeout:20000}).contains('Your report is ready!')
					cy.get('.btn:visible',{timeout:15000}).contains('OK').click()
					cy.get('a',{timeout:15000}).contains('Reports').click()
					cy.get('[id="excel-reports"]',{timeout:15000}).find('.badge').should('have.text',strBadge)		
				}
				else{
					cy.get('button.add_product_button').click()				}
			})
		})
	})
})