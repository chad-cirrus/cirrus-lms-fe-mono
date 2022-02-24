describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lessoncontentitemcomponent--primary&args=item;instructorView;'));
  it('should render the component', () => {
    cy.get('cirrus-lesson-content-item').should('exist');
  });
});