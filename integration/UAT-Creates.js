
// First Case : Create new account -- if account already registered , catch the error and routing to login page and login.
// Second Case : Create product and add urls

describe('Login',()=>{

	it('Create and Login',()=>{
		//Create new account
		cy.visit("www.prisync.com",{timeout:15000})
		cy.get('[id="registerButton"]',{timeout:15000}).click()
		cy.get('[name="email"]').type('TryAccount'+Math.floor(Math.random()*1000)+'@hotmail.com').then(mailText=>{
			var mailTxt = mailText.val()

			cy.get('[name="password"]').type('Pri_Ui=05').then(passText=>{
				var passTxt = passText.val()

				cy.get('[name="phone"]').type('05457859234')
				cy.get('button[name="submit"]',{timeout:15000}).contains('Start Your Free Trial!').click()
				cy.wait(1000)
				//If already registered
				cy.get('div').then(errText=>{
					var errTxt = errText.text()
					var inText = errTxt.includes('has already been taken. ')
					if (inText == true ){
						cy.get('a.already-have-account-login-button',{timeout:15000}).click()
						cy.wait(700)
						cy.url().should('contain','/login')
						cy.get('[name="email"]').type(mailTxt)
						cy.get('[name="password"]').type(passTxt)
						cy.get('button[name="submit"]').contains('Sign In').click()
					}
					//If not already registered
					else{
						cy.wait(3000)
						cy.url().should('contain','/panel')
						cy.get('.select2-choice:visible',{timeout:15000}).click()
						cy.get('.select2-input:visible').wait(500).type('Turkey').wait(500).type('{enter}')
						cy.get('input[id="my-url"]',{timeout:15000}).type('hepsiburada.com')
						cy.get('.btn',{timeout:15000}).contains('Submit').click()
					}
				})
				
				// Add product
				cy.get('.btn-primary.add_product_button:visible',{timeout:15000}).first().click()
				cy.wait(2000)
				cy.get('input[name="new_product_name"]',{timeout:15000}).type('Apple iPhone 8 Plus Space Grey ')
				cy.get('input[id="input_new_product_code"]',{timeout:15000}).type(2+Math.floor(Math.random()*300000))
				cy.get('input[name="product_cost"]',{timeout:15000}).type('599.99')
				cy.get('input[name="category_name"]',{timeout:15000}).type('Smart Phones')
				cy.get('input[name="brand_name"]',{timeout:15000}).type('Apple').wait(500).type('{enter}')
				cy.get('.btn-success.btn-small').click()
				cy.wait(1500)

				// Add url
				cy.get('.btn.btn-success',{timeout:15000}).contains('Add URL').click()
				cy.get('input[name="new_url"]',{timeout:15000})
				.type('https://www.hepsiburada.com/apple-iphone-x-64-gb-apple-turkiye-garantili-p-HBV000007PV9T?magaza=Estekno&wt_gl=cpc.elk.telefon.pla&gclid=CjwKCAjwq57cBRBYEiwAdpx0vb5QvmPrCLOdP-JVDfmODlffsc8NOXg4XMpz4iY5S_HRejnxKwJjHxoCE7cQAvD_BwE')
				cy.get('.btn-success.btn-small:visible',{timeout:15000}).first().click()
				cy.get('[id="firstUrlModal"]').find('.btn:visible',{timeout:15000}).contains('Close').click()

			})
		})
	})
	

})