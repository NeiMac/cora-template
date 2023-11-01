/// <reference types ="cypress"/>

import DSL from '../../core/DSL';
import 'cypress-iframe';

export default class loginPage extends DSL {


    clickGeografia(geografia) {
        this.enterMicrofrontend()
            .find('[class="ant-select ant-select-single ant-select-show-arrow ant-select-show-search"]')
            .filter(':visible')
            .first()
            .type(geografia)
    }

    clicksearchCDD() {
        //clicar no campo
        this.enterMicrofrontend()
            .find('[class="icon-label"]')
            .filter(':visible')
            .first()
            .click();
    }

    clickUnidade(unidade) {
        this.enterMicrofrontend()
            .find('[class="ant-select ant-select-single ant-select-show-arrow ant-select-show-search"]')
            .filter(':visible')
            .last()
            .type(unidade)
    }

    clicksearchUnidade() {
        //clicar no campo
        this.enterMicrofrontend()
            .find('[class="icon-label"]')
            .filter(':visible')
            .last()
            .click({ force: true })
            .click({ force: true });
    }

    clickCliente(cliente) {
        this.enterMicrofrontend()
            .find('[class="ant-input-number-input"]')
            .filter(':visible')
            .click()
            .type(cliente)
    }

    clickAplicarButton(name) {
        this.enterMicrofrontend()
            .find('.ant-btn-primary')
            .filter(':visible')
            .first()
            .contains(name)
            //.should('have.text', 'Aplicar')
            .click()
    }

    validCddCliente() {
        this.enterMicrofrontend()
            .find('[class="sc-bjUoiL bgEoYR"]')
            .filter(':visible')
            .first()
            .should('not.be.empty')
    }

    validCustomerName() {
        this.enterMicrofrontend()
            .find('[class="sc-dmRaPn oVBTY"]')
            .should('not.be.empty')
    }

    validStatusCustomerFirst() {
        this.enterMicrofrontend()
            .find('[class="ant-tag sc-bCwfaz hzzSzX positive"]')
            .first()
            .invoke('text')
            .should('contain', 'Ativo')
    }

    validStatusCustomerLast() {
        this.enterMicrofrontend()
            .find('[class="ant-tag sc-bCwfaz hzzSzX positive"]')
            .last()
            .invoke('text')
            .should('contain', 'Não Negativado')
    }

    validStatusCustomers() {
        this.enterMicrofrontend()
        // Selecione todos os elementos da lista
        cy.get('[class="sc-hHLeRK gnDtow"]').then(($elements) => {
            // Calcule o índice do primeiro e último elemento
            const primeiroIndice = 0;
            const ultimoIndice = $elements.length - 1;

            // Use .slice() para selecionar elementos entre o primeiro e o último
            const elementosEntrePrimeiroELast = $elements.slice(primeiroIndice + 1, ultimoIndice);

            // Agora, itere sobre esses elementos e verifique o texto
            elementosEntrePrimeiroELast.each(($element) => {
                cy.wrap($element).invoke('text').should('include', 'Ativo');
            });
        });
    }



    /**  
 .last()
 .invoke('text')
 .should('contain', 'Não Negativado')
 
} **/

    validGeneralInfo() {
        //Test
        this.enterMicrofrontend()
            .find('[class="item-panel-description"]')
            .filter('be.visible')
            .should('not.be.empty')
    }

}