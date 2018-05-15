const DRESS_SEARCH_QUERY = 'black triangle bikini'

describe('Able to load website and navigate to a product', function () {
  it('should load website', function () {
    cy.visit('https://www.riverisland.com')

    // River Island page is loaded
    cy.title()
      .should('include', 'River Island')
      .and('include', 'Fashion Clothing')
  })
  it('should allow searching for a product', function () {
    // Searches for a product
    cy.get('#show-search').click()
    cy.get('#typeahead-search-query')
      .type(DRESS_SEARCH_QUERY)
      .should('have.value', DRESS_SEARCH_QUERY)
    cy.get('#search-submit').click()
    
    cy.get('.desktop__quadrants__quadrant__container__top__button').eq(0).click()

    // PLP is loaded with search results
    cy.get('.content-wrap--full .search-terms').contains(DRESS_SEARCH_QUERY)
 })
 it('should load product page with correct product', function () {
    // Clicking first product should load PDP with clicked product details
    cy.get('.product-listing .product__title').eq(0).should('be.visible').then(($title) => {
      const prod_title = $title.text().trim()
      cy.get('.product-listing__image-container').eq(0).click()
      cy.get('.bundle-parent .product-title--desktop').contains(prod_title)
    })
  })
});
