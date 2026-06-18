import { LightningElement, track } from 'lwc';
import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';

export default class OpportunityReport extends LightningElement {
    @track opportunities = [];
    budgetYear = '2024';
    showSpinner = false;
    stage = 'all';
    closeDate;

    stageOptions  = [
        { label: 'All Stages', value: 'all' },
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' }
    ];

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Fiscal Year', fieldName: 'FiscalYear' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Description', fieldName: 'Description' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date' }
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

    handleStageChange(event) {
        this.stage = event.detail.value;
        this.doInit();
    }

    handleCloseDateChange(event) {
        this.closeDate = event.detail.value;
        this.doInit();
    }

    async doInit() {
        try {
            this.showSpinner = true;
            const params = {
                budgetYear: this.budgetYear,
                stage: this.stage,
                closeDate: this.closeDate
            };
            this.opportunities = await getOpportunitiesServer({ params });
        } catch (e) {
            console.error(e);
        } finally {
            this.showSpinner = false;
        }
    }
}
