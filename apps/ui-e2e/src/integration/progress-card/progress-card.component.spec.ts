describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=progresscardcomponent--primary&args=progress;'));
  it('should render the component', () => {
    cy.get('cirrus-progress-card').should('exist');
  });
});