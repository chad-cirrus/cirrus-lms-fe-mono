describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=progressindicatorcomponent--primary'));
  it('should render the component', () => {
    cy.get('cirrus-progress-indicator').should('exist');
  });
});