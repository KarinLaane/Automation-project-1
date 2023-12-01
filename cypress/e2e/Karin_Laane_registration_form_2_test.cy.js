beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
         cy.get('input[name="username"]').type('KarinL')
         cy.get('input[name="email"]').type('test@test.com')
         cy.get('input[name="name"]').type('Karin')
         cy.get('input[name="lastName"]').type('Laane')
         cy.get('input[data-testid="phoneNumberTestId"]').type('55667788')
         cy.get('[name=password]').type('KarinL123')
         
         // Type confirmation password which is different from first password
         cy.get('[name=confirm]').type('KarinL1')

         // in order to activate submit button, user has to click somewhere outside the input field    
         cy.get('h2').contains('Password').click()
        
         // Assert that password error message is visible, and message should contain 'Passwords do not match!
         cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

         // Assert that success message is not visible
         cy.get('#success_message').should('not.be.visible')

         // Asserting that Submit button is disabled
         cy.get('.submit_button').should('be.disabled')

         // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
         cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')

         // Scroll back to confirm input field
         cy.get('#confirm').scrollIntoView()
         cy.get('#confirm').clear()
         cy.get('h2').contains('Password').click()

         // Match confirmation password to password 
         cy.get('[name=confirm]').type('KarinL123')

         // in order to activate submit button, user has to click somewhere outside the input field
         cy.get('h2').contains('Password').click()
         cy.get('.submit_button').should('be.enabled')
         cy.get('.submit_button').click()
 
         // Assert that both input and password error messages are not shown
         cy.get('#input_error_message').should('not.be.visible')

         // Assert that success message is visible
         cy.get('#success_message').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
         // Add test steps for filling in ALL fields
         cy.get('input[name="username"]').type('KarinL')
         cy.get('input[name="email"]').type('test@test.com')
         cy.get('input[name="name"]').type('Karin')
         cy.get('input[name="lastName"]').type('Laane')
         cy.get('input[data-testid="phoneNumberTestId"]').type('55667788')
         cy.get('input#cssFavLanguage').check()
         cy.get('input#vehicle1').check()
         cy.get("#cars").select("Audi")
         cy.get("#animal").select("Cat")
         cy.get('[name=password]').type('KarinL123')
         cy.get('[name=confirm]').type('KarinL123')

         //in order to activate submit button, user has to click somewhere outside the input field
         cy.get('h2').contains('Password').click()

         // Assert that submit button is enabled
         cy.get('.submit_button').should('be.enabled')

         // Assert that after submitting the form system show successful message
         cy.get('.submit_button').click()
         cy.get('#success_message').should('be.visible')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
         // Add test steps for filling in ONLY mandatory fields
         cy.get('input[name="username"]').type('KarinL')
         cy.get('input[name="email"]').type('test@test.com')
         cy.get('input[name="name"]').type('Karin')
         cy.get('input[name="lastName"]').type('Laane')
         cy.get('input[data-testid="phoneNumberTestId"]').type('55667788')
         cy.get('[name=password]').type('KarinL123')
         cy.get('[name=confirm]').type('KarinL123')

         // in order to activate submit button, user has to click somewhere outside the input field
         cy.get('h2').contains('Password').click()

         // Assert that submit button is enabled
         cy.get('.submit_button').should('be.enabled')

         // Assert that after submitting the form system shows successful message
         cy.get('.submit_button').click()
         cy.get('#success_message').should('be.visible')
    })

     it('Checking username field absence', ()=>{
         // Add test steps for filling in ONLY mandatory fields
         cy.get('input[name="username"]').type('KarinL')
         cy.get('input[name="email"]').type('test@test.com')
         cy.get('input[name="name"]').type('Karin')
         cy.get('input[name="lastName"]').type('Laane')
         cy.get('input[data-testid="phoneNumberTestId"]').type('55667788')
         cy.get('[name=password]').type('KarinL123')
         cy.get('[name=confirm]').type('KarinL123')

         // Clear username field
         cy.get('#username').scrollIntoView()
         cy.get('#username').clear()
         cy.get('h2').contains('Password').click()

         // Asserting that Submit button is disabled
         cy.get('.submit_button').should('be.disabled')

         // Assert that success message is not visible
         cy.get('#success_message').should('not.be.visible')

         // Assert that correct error message is visible and contain given text
         cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

    })


    })

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
         cy.log('Will check logo source and size')
         cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
         // get element and check its parameter height, to less than 178 and greater than 100
         cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
         // Create similar test for checking the second picture
         cy.log('Will check logo source and size')
         cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')

         // get element and check its parameterheight, to less than 178 and greater than 100
         cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    });

    it('Check navigation part', () => {
         cy.get('nav').children().should('have.length', 2)

         // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
         cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
         // Get navigation element, find its first child, check the link content and click it
         cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
         // Check that currently opened URL is correct
         cy.url().should('contain', '/registration_form_1.html')
        
         // Go back to previous page
         cy.go('back')
         cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 
    it('Check navigation part', () => {
         cy.get('nav').children().should('have.length', 2)

         // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
         cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
         // Get navigation element, find its first child, check the link content and click it
         cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
         // Check that currently opened URL is correct
         cy.url().should('contain', '/registration_form_3.html')
        
         // Go back to previous page
         cy.go('back')
         cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
         // Array of found elements with given selector has 4 elements in total
         cy.get('input[type="radio"]').should('have.length', 4)

         // Verify labels of the radio buttons
         cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
         cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
         cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
         cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

         //Verify default state of radio buttons
         cy.get('input[type="radio"]').eq(0).should('not.be.checked')
         cy.get('input[type="radio"]').eq(1).should('not.be.checked')
         cy.get('input[type="radio"]').eq(2).should('not.be.checked')
         cy.get('input[type="radio"]').eq(3).should('not.be.checked')

         // Selecting one will remove selection from other radio button
         cy.get('input[type="radio"]').eq(0).check().should('be.checked')
         cy.get('input[type="radio"]').eq(1).check().should('be.checked')
         cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that checkboxes list is correct', () => {

         // Array of found elements with given selector has 3 elements in total
         cy.get('input[type="checkbox"]').should('have.length', 3)

         // Verify labels of the checkboxes
         cy.get('input[type="checkbox"]').eq(0).next().should('have.text','I have a bike')
         cy.get('input[type="checkbox"]').eq(1).next().should('have.text','I have a car')
         cy.get('input[type="checkbox"]').eq(2).next().should('have.text','I have a boat')
    
         //Verify default state of checkboxes 
         cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
         cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
         cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

         // try marking the first checkbox as checked and assert its state
         cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')

         //Try marking the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked)
         cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
         cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
     
 })

    it('Car dropdown is correct', () => {
         // Here is an example how to explicitely create screenshot from the code
         // Select second element and create screenshot for this area, and full page
         cy.get('#cars').select(1).screenshot('Cars drop-down')
         cy.screenshot('Full page screenshot')

         // Here are given different solutions how to get the length of array of elements in Cars dropdown
         // Next 2 lines of code do exactly the same!
         cy.get('#cars').children().should('have.length', 4)
         cy.get('#cars').find('option').should('have.length', 4)
        
         //Check  that first element in the dropdown has text Volvo
         cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
         // Advanced level how to check the content of the Cars dropdown
         cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one 
    it('Animal dropdown is correct', () => {

         // Verify that the animal dropdown has six choices.
         cy.get('#animal').children().should('have.length', 6)

         // Verify all values in the dropdown.
         cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
         cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
         cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
         cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
         cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
         cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}
})