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

    validCddCliente(cdd) {
        this.enterMicrofrontend()
            .find('[class="sc-bjUoiL bgEoYR"]')
            .filter(':visible')
            .contains(cdd).should('be.visible')
    }

    validStatusCliente() {
        this.enterMicrofrontend()
            .find('[class="ant-tag sc-bCwfaz hzzSzX positive"]')
            .first()
            .invoke('text')
            .should('contain', 'Sem restrições')
        /*
         .last()
         .invoke('text')
         .should('contain', 'Não Negativado')
         **/
    }

    validTradeName() {
        this.enterMicrofrontend()
            .find('[class="class="item-panel-description"]')
            .should('be.visible')
    }

}