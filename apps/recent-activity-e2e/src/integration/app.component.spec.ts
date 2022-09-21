describe('recent-activity', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('cirrus-root').should('exist');
  });
});