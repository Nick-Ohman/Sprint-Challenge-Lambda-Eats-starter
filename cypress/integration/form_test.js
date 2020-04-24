describe("Test our inputs and submit our form", function ()
{
    beforeEach(function () {
        cy.visit('http://localhost:3001/pizza');
    });
    it('Add test to inputs and submit form', function () {
        cy.get('input[name="name"]')
            .type("nick")
            .should("have.value", "nick");
        
        cy.get('[type="checkbox"]').check()
            .should('be.checked')
        cy.get('button').click();
        
            
    });
});
  