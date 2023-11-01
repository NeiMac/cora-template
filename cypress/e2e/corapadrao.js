/// <reference types="cypress" />

import HomePage from "../support/pageObjects/common/home.page";
import Login from "../support/pageObjects/common/login.page";
import NewQueryOrders from "../support/pageObjects/common/newQueryOrders.page";
import DetalhesCliente from "../support/pageObjects/detalhesCliente/detalhes.page";
import Restricao from "../support/pageObjects/restriction/restriction.page";

const homePage = new HomePage();
const login = new Login();
const newQueryOrders = new NewQueryOrders();
const detalhesCliente = new DetalhesCliente();
const restricao = new Restricao();

before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    if (Cypress.env('host') !== 'local') {
        cy.task('loginSSO').then(loginData => {
            const { tokenId } = loginData;
            localStorage.setItem('@cross/data', tokenId);
        })
    }
})

beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
})



describe('Automação Cora', function () {

    beforeEach(() => {
        login.urlCora();
        login.clickAmbevButton();

        homePage.loadingModulesCora();
        homePage.assertWellcome();
        //        homePage.assertDescription();
        homePage.clickModulesCora('Restrição');
        cy.wait(2000)
    });

    it('Detalhes Cliente', () => {
        detalhesCliente.clickGeografia('1 - Geo SUL');
        detalhesCliente.clicksearchCDD()
        detalhesCliente.clickUnidade('50 - CDD SAO JOSE')
        detalhesCliente.clicksearchUnidade()
        detalhesCliente.clickCliente('3')
        detalhesCliente.clickAplicarButton('Aplicar')
        detalhesCliente.validCddCliente('50 - CDD SAO JOSE')
        // detalhesCliente.validStatusCliente()

        detalhesCliente.validCustomerName()
        //  detalhesCliente.validStatusCustomers()
        detalhesCliente.validStatusCustomerFirst()
        detalhesCliente.validStatusCustomerLast()
        detalhesCliente.validGeneralInfo()
    })

    it.only('Restriction', () => {
        restricao.clickListClient();
    });

})