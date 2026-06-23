import getOpportunitiesServer from '@salesforce/apex/OpportunityReportPageController.getOpportunitiesServer';
import recalculateOpportunitySizesServer from '@salesforce/apex/OpportunityReportPageController.recalculateOpportunitySizes';

export function fetchOpportunities(filters) {
    return getOpportunitiesServer({
        params: filters
    });
}

export function recalculateOpportunitySizes() {
    return recalculateOpportunitySizesServer();
}
