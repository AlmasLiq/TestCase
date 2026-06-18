import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';

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
