import { LightningElement, track } from 'lwc';
import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';
import { columns as reportColumns } from './columns';
import { stageOptions as opportunityStageOptions } from './stageOptions';
import { sortRecords } from './sortUtils';

export default class OpportunityReport extends LightningElement {
    @track opportunities = [];
    budgetYear = '2024';
    showSpinner = false;
    stage = 'all';
    closeDate;
    sortedBy = 'Name';
    sortedDirection = 'asc';
    stageOptions = opportunityStageOptions;
    columns = reportColumns;

    get yearOptions() {
        const currentYear = new Date().getFullYear();
        const options = [{ label: 'All Years', value: 'all' }];
        for (let i = -2; i <= 2; i++) {
            const year = (currentYear + i).toString();
            options.push({ label: year, value: year });
        }
        return options;
    }

    get totalAmount() {
        return this.opportunities.reduce((total, opportunity) => {
            return total + (opportunity.Amount || 0);
        }, 0);
    }

    get tableRows() {
        return [
            ...this.sortedOpportunities,
            {
                Id: 'summary-row',
                Name: 'Total',
                Amount: this.totalAmount
            }
        ];
    }

    get sortedOpportunities() {
        return sortRecords(this.opportunities, this.sortedBy, this.sortedDirection);
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

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
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
