/// <reference types ="cypress"/>

import DSL from '../../core/DSL';

export default class newQueryOrdersPage extends DSL {
   
    loadingOrderScreen() {
        cy.intercept({
            method: 'GET',
            url: 'https://apim-dev.ambevdevs.com.br/nonprod/autorizacao/controle-acesso-core/v1/api/permissions/menu?menu=hercules'
        }).as('order');
        cy.validateRoute('@order');
    }

    loadingMyQuery() {
        cy.intercept({
            method: 'POST',
            url: 'https://apim-dev.ambevdevs.com.br/nonprod/pedidos/consulta-pedidos/v1/api/manutencaoconsultapedido/consultar'
        }).as('consultar');
        cy.validateRoute('@consultar');
    }
}