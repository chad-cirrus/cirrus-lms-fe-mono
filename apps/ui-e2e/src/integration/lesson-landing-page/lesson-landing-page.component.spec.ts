describe('ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=lessonlandingpagecomponent--primary&args=lesson;progress;instructorView;sideNavOpen;'));
  it('should render the component', () => {
    cy.get('cirrus-lesson-landing-page').should('exist');
  });
});