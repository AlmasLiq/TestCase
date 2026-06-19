import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';
import recalculateOpportunitySizesServer from '@salesforce/apex/OpportunityReportPageController.recalculateOpportunitySizes';

export function buildReportParams({ budgetYear, stage, closeDate }) {
    return {
        budgetYear,
        stage,
        closeDate
    };
}

export function fetchOpportunities(filters) {
    return getOpportunitiesServer({
        params: buildReportParams(filters)
    });
}

export function recalculateOpportunitySizes() {
    return recalculateOpportunitySizesServer();
}
