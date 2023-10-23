/// <reference types ="cypress"/>

import DSL from '../../core/DSL';
import 'cypress-iframe';

export default class homePage extends DSL {
    loadingModulesCora() {
        cy.intercept('https://apim-dev.ambevdevs.com.br/stg/autorizacao/controle-acesso-core/v1/api/permissions/menu?menu=hercules').as('menu');
        cy.validateRoute('@menu');
    }

    clickModulesCora(name) {
        this.enterMicrofrontend()
            .find('[class="card-title"]')
            .filter(':visible')
            .contains(name)
            .parentsUntil('[data-testid="card"]')
            .parent()
            .first()
            .find('[class="card-footer"] button')
            .click();
    }

    assertWellcome() {
        this.enterMicrofrontend()
            .find('[class="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-16 ant-col-lg-16"] p')
            .filter(':visible')
            .contains('Acesso rápido aos sistemas disponíveis para seu perfil de usuário')
    }

    assertDescription() {
        this.enterMicrofrontend()
            .find('h2')
            .filter(':visible')
            .should('have.text', 'Acesse aos módulos através dos atalhos abaixo:');
    }
}