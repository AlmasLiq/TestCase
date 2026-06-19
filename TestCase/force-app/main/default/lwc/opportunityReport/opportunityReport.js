import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { columns as reportColumns } from './columns';
import { buildTableRows, buildYearOptions, calculateTotalAmount } from './reportRows';
import { buildExportFilename, exportRowsToCsv } from './exportUtils';
import { fetchOpportunities, recalculateOpportunitySizes } from './opportunityService';
import { handleRowAction as runRowAction } from './rowActions';
import { getErrorMessage, showToast } from './notifications';
import { stageOptions as opportunityStageOptions } from './stageOptions';
import { updateBudgetYear, updateCloseDate, updateSort, updateStage } from './filterHandlers';

export default class OpportunityReport extends NavigationMixin(LightningElement) {
    @track opportunities = [];
    budgetYear = '2024';
    showSpinner = false;
    isRecalculatingSizes = false;
    stage = 'all';
    closeDate;
    sortedBy = 'Name';
    sortedDirection = 'asc';
    stageOptions = opportunityStageOptions;
    columns = reportColumns;

    get yearOptions() {
        return buildYearOptions();
    }

    get totalAmount() {
        return calculateTotalAmount(this.opportunities);
    }

    get tableRows() {
        return buildTableRows(this.opportunities, this.sortedBy, this.sortedDirection);
    }

    get disableExport() {
        return this.showSpinner || this.opportunities.length === 0;
    }

    get disableRecalculateSizes() {
        return this.showSpinner || this.isRecalculatingSizes;
    }

    connectedCallback() {
        this.loadOpportunities();
    }

    handleChange(event) {
        updateBudgetYear(this, event);
    }

    handleStageChange(event) {
        updateStage(this, event);
    }

    handleCloseDateChange(event) {
        updateCloseDate(this, event);
    }

    handleSort(event) {
        updateSort(this, event);
    }

    handleRowAction(event) {
        runRowAction(this, event);
    }

    handleExport() {
        exportRowsToCsv(this.tableRows, this.columns, buildExportFilename());
    }

    async handleRecalculateSizes() {
        try {
            this.isRecalculatingSizes = true;
            const jobId = await recalculateOpportunitySizes();
            showToast(this, 'Size recalculation started', `Batch job ${jobId} was started.`, 'success');
        } catch (e) {
            console.error(e);
            showToast(this, 'Size recalculation failed', getErrorMessage(e), 'error');
        } finally {
            this.isRecalculatingSizes = false;
        }
    }

    async loadOpportunities() {
        try {
            this.showSpinner = true;
            this.opportunities = await fetchOpportunities({
                budgetYear: this.budgetYear,
                stage: this.stage,
                closeDate: this.closeDate
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.showSpinner = false;
        }
    }

}
