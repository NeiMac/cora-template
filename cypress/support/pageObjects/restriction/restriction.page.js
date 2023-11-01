// <reference types ="cypress"/>

import DSL from '../../core/DSL';
import 'cypress-iframe';

export default class loginPage extends DSL {

    clickListClient() {
        this.enterMicrofrontend()
            // .find('#app')
            // .find('[slot="cockpit-content"]')
            // .find('[slot="content"]')
            // .find('[slot="toolbar"]')
            .find('[data-testid="geo-multiselect"]').click()
    };
}





