beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
it('Country dropdown is correct', () => {
    
    // Verify that the country dropdown has 3 choices.
    cy.get('#country').children().should('have.length', 4)
   
    // Verify all values in the dropdown.
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
    cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
   
})


it('City selection is working correctly', () => {

    // Verify that city selection has 4 choices.
    cy.get('#country').children().should('have.length', 4)
   

   // Select Estonia
    cy.get("#country").select("Estonia")

   // Verify all values in Estonia selection.
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

   // Select Tallinn
    cy.get("#city").select("Tallinn")

   // Selecting Spain, will clear Estonia values and Spain citys are visible 
    cy.get("#country").select("Spain")
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    
   // Select Malaga
     cy.get("#city").select("Malaga")


})

it('Setting value to Date of birth works', () => {
    cy.get('input[type="date"]').first().then($dateInput => {
    // Use the $dateInput jQuery object to interact with the element
    // For example, you can set its value:
    cy.wrap($dateInput).type('2023-11-30');
  });

})

it('Check that newsletter frequency radio button list is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should('have.length', 4)

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

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


it('Setting birthday date works', () => {

    // Select birthday
    cy.get("#birthday").type("2021-01-01");

})

it('Check that checkboxes and cookie policy link is working', () => {

    // Array of found elements with given selector has 2 elements in total
    cy.get('input[type="checkbox"]').should('have.length', 2)

   // Verify default state of checkboxes 
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

   // try marking the first checkbox as checked and assert its state
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    
   //Try marking the second checkbox as checked and assert the state of the first and second checkboxes (both will stay checked) - t
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

   // Get navigation element, find its first child, check the link content and click it -t
    cy.get('input[type="checkbox"]').eq(1).next().children().eq(0).should('be.visible')
    .and('have.attr', 'href', 'cookiePolicy.html')
    .click()

   // Check that currently opened URL is correct -t
    cy.url().should('contain', '/cookiePolicy.html')
        
   // Go back to previous page -t
    cy.go('back')
    cy.log('Back again in registration form 3')

})


it('User can use only valid email format', ()=>{
    // Add test steps for filling in only email field
     cy.get('input[name="email"]').type('test')

     // in order to activate submit button, user has to click somewhere outside the input field    
     cy.get('h2').contains('Birthday').click()

    // Assert that error message is visible
     cy.get('#emailAlert').should('be.visible')
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
it('User can submit form with all fields added', ()=>{
    // Add test steps for filling in ALL fields
    cy.get('input[name="name"]').type('Karin')
    cy.get('input[name="email"]').type('test@test.com')
    cy.get("#country").select("Estonia")
    cy.get("#city").select("Tallinn")
    cy.get('input[type="date"]').first().then($dateInput => {
    cy.wrap($dateInput).type('2023-11-30')
          })
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get("#birthday").type("2021-01-01")
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

    //in order to activate submit button, user has to click somewhere outside the input field
    cy.get('h2').contains('Birthday').click()

    // Assert that submit button is enabled
    cy.get('input[type="submit"]').should('be.enabled')

    // Submit form
    cy.get('input[type="submit"]').eq(1).click()

   // Check if H1 appeared
   cy.get('h1').should('be.visible')

})

it('User can submit form with mandatory fields', ()=>{
    // Add test steps for filling in ALL fields
    cy.get('input[name="email"]').type('test@test.com')
    cy.get("#country").select("Estonia")
    cy.get("#city").select("Tallinn")
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

    // Assert that submit button is disabled
    cy.get('input[type="submit"]').should('be.enabled')

    // Submit form
    cy.get('input[type="submit"]').eq(1).click()

   // Check if H1 appeared
   cy.get('h1').should('be.visible')

})

it('Mandatory fields are absent', ()=>{
    // Fill in fields that are not mandatory
    cy.get('input[name="name"]').type('Karin')
    cy.get('input[type="date"]').first().then($dateInput => {
    cy.wrap($dateInput).type('2023-11-30')
          })
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get("#birthday").type("2021-01-01")
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')

    // Verify that submit button is enabled
    cy.get('input[type="submit"]').should('be.disabled')

})

it('If city is already chosen and country is updated, then city choice should be removed', () => {

    // Verify that city selection has 4 choices.
    cy.get('#country').children().should('have.length', 4)
   
   // Select Estonia
    cy.get("#country").select("Estonia")

   // Verify all values in Estonia selection.
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

   // Select Tallinn
    cy.get("#city").select("Tallinn")

   // Selecting none, will clear Estonia values and Spain citys are visible 
    cy.get("#country").select("")

   // Check that second element does not exist
    cy.get('#city').find('option').should('have.length', 1)
    
})

it('Uploading a file', () => {

cy.get('input[type="file"]').click()
    
})

  