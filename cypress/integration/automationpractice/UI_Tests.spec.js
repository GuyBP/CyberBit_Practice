/// <reference types="cypress" />

import * as page from '../../utils.js'

describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })

  it('Adding first item from the list to the cart', () => {

    // Get product name
    let productNameBefore;
    page.getProductName().first().should(($a) => {
      productNameBefore = $a.text();
    })

    // Add first item to the cart 
    page.getAddToCartBtn().parent().first().click();

    // Assert pop up text “Product successfully added to your shopping cart”
    page.getProductAddedTitle();
    cy.wait(10000);

    // Assert the correct product was added
    cy.get('span.product-name').should(($span) => {
      const productNameAfter = $span.text();
      expect(productNameBefore).to.include(productNameAfter);
    })

    // Close item summary cart
    cy.get('span.cross').click();

    // Assert the correct total of the item appears
    cy.get('span.ajax_cart_quantity').contains('1');
  })

  it('Confirm user can search in the app', () => {
    const searchText = 'Printed Chiffon Dress';
    // Search for “Printed Chiffon Dress”
    cy.get('input.search_query.form-control.ac_input').type(searchText);
    cy.get('button.btn.btn-default.button-search').click();

    // Assert text Search "Printed Chiffon Dress" appears
    cy.get('input.search_query.form-control.ac_input').should(($input) => {
      const inputValue = $input.val();
      expect(inputValue).to.equal(searchText);
    })

    // Assert that it is the first result in the list
    cy.get('li.ajax_block_product').first().within(() => {
      cy.get('a.product-name').should(($a) => {
        const productName = $a.text();
        expect(productName).to.contain(searchText);
      })
    })
  })

  it('Confirm user can send a message to customer services', () => {
    // Render "Contact us" page
    cy.visit('http://automationpractice.com/index.php?controller=contact');

    // Select subject heading
    cy.get('select.form-control').select('Customer service');

    // Input email
    const emailAddress = 'benpaziguy@gmail.com';
    cy.get('input.form-control.grey.validate').type(emailAddress);

    // Input messege
    const msg = 'Test';
    cy.get('textarea.form-control').type(msg);

    // Click send
    cy.get('button').contains('Send').click();

    // Assert text after submission “Your message has been successfully sent to our team.”
    cy.get('p.alert.alert-success').contains('Your message has been successfully sent to our team');

  })

  it.skip('Confirm user can change images in the gallery', () => {

    cy.get('li.homeslider-container').first().within(() => {
      cy.get('img').should('have.attr', 'src', 'http://automationpractice.com/modules/homeslider/images/sample-3.jpg');
    })

    cy.get('a.bx-next').click();


  })
})