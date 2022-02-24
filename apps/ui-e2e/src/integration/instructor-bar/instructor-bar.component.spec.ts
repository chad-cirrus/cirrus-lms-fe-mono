describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=instructorbarcomponent--primary'));
  it('should render the component', () => {
    cy.get('cirrus-instructor-bar').should('exist');
  });
});