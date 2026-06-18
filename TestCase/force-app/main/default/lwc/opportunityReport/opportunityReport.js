import { LightningElement, track } from 'lwc';
import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';

export default class OpportunityReport extends LightningElement {
    @track opportunities = [];
    budgetYear = '2024';
    showSpinner = false;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Fiscal Year', fieldName: 'FiscalYear' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Stage', fieldName: 'Stage', type: 'String'},
        { label: 'Description', fieldName: 'Description', type: 'String'},
        { label: 'CloseDate', fieldName: 'CloseDate', type: 'FiscalYear'},
    ];

    get yearOptions() {
        const currentYear = new Date().getFullYear();
        const options = [{ label: 'All Years', value: 'all' }];
        for (let i = -2; i <= 2; i++) {
            const year = (currentYear + i).toString();
            options.push({ label: year, value: year });
        }
        return options;
    }

    connectedCallback() {
        this.doInit();
    }

    handleChange(event) {
        this.budgetYear = event.detail.value;
        this.doInit();
    }

    async doInit() {
        try {
            this.showSpinner = true;
            const params = { budgetYear: this.budgetYear };
            this.opportunities = await getOpportunitiesServer({ params });
        } catch (e) {
            console.error(e);
        } finally {
            this.showSpinner = false;
        }
    }
}