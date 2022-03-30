/// <reference types="cypress" />

import * as page from '../../utils.js'

describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })

  it.only('Adding first item from the list to the cart', () => {

    // Get product name
    let productNameBefore;
    page.getProductName().first().should(($a) => {
      productNameBefore = $a.text();
    })

    // Add first item to the cart 
    page.getAddToCartBtn().parent().first().click().as('addToCart');

    cy.wait(8000);

    // Assert pop up text “Product successfully added to your shopping cart”
    page.getProductAddedTitle();

    // Assert the correct product was added
    page.getProductNameSummaryCart().should(($span) => {
      const productNameAfter = $span.text();
      expect(productNameBefore).to.include(productNameAfter);
    })

    // Close item summary cart
    page.getCloseBtn().click();

    // Assert the correct total of the item appears
    page.getCartQuantity().contains('1');
  })

  it('Confirm user can search in the app', () => {
    const searchText = 'Printed Chiffon Dress';

    // Search for “Printed Chiffon Dress”
    page.getSearchInput().type(searchText);
    page.getSearchBtn().click();

    // Assert text Search "Printed Chiffon Dress" appears
    page.getSearchInput().should(($input) => {
      const inputValue = $input.val();
      expect(inputValue).to.equal(searchText);
    })

    // Assert that it is the first result in the list
    page.getProductBlock().first().within(() => {
      page.getProductName().should(($a) => {
        const productName = $a.text();
        expect(productName).to.contain(searchText);
      })
    })
  })

  it('Confirm user can send a message to customer services', () => {
    // Render "Contact us" page
    cy.visit('http://automationpractice.com/index.php?controller=contact');

    // Select subject heading
    page.getSelect().select('Customer service');

    // Input email
    const emailAddress = 'benpaziguy@gmail.com';
    page.getEmailInput().type(emailAddress);

    // Input messege
    const msg = 'Test';
    page.getTextareaInput().type(msg);

    // Click send
    page.getBtn().contains('Send').click();

    // Assert text after submission “Your message has been successfully sent to our team.”
    page.getSuccessAlert().contains('Your message has been successfully sent to our team');

  })

  it.skip('Confirm user can change images in the gallery', () => {

    cy.get('li.homeslider-container').first().within(() => {
      cy.get('img').should('have.attr', 'src', 'http://automationpractice.com/modules/homeslider/images/sample-3.jpg');
    })

    cy.get('a.bx-next').click();


  })
})