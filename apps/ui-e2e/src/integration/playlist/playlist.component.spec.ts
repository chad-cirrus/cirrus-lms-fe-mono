describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=playlistcomponent--primary&args=playListItem;'));
  it('should render the component', () => {
    cy.get('cirrus-playlist').should('exist');
  });
});