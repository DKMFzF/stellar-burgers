import { selectors } from '../../support/selectors';
import { initializeTestSetup, cleanTestEnvironment } from '../../support/helpers';

describe('Тестирование модальных окон', () => {
  beforeEach(initializeTestSetup);
  afterEach(cleanTestEnvironment);

  it('Открытие модального окна', () => {
    cy.get(selectors.bunComponent).click();
    cy.get(selectors.modalComponent).should('be.visible');
  });
  
  it('Закрытие модального окна по крестику', () => {
    cy.get(selectors.mainComponent).click();
    cy.get(selectors.modalComponent).should('be.visible');
    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modalComponent).should('not.exist');
  });
  
  it('Закрытие модального окна по клику на оверлей', () => {
    cy.get(selectors.alternativeBun).click();
    cy.get(selectors.modalComponent).should('be.visible');
    cy.get(selectors.modalBackdrop).click({ force: true });
    cy.get(selectors.modalComponent).should('not.exist');
  });
});
