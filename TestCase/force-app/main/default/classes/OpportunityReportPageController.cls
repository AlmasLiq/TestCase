public with sharing class OpportunityReportPageController {

    @AuraEnabled
    public static List<Opportunity> getOpportunitiesServer(Map<String, String> params) {
        String budgetYear = params.get('budgetYear');
        String stage = params.get('stage');
        String closeDate = params.get('closeDate');
        Integer budgetYearValue;
        String stageValue;
        Date closeDateValue;
        List<String> filters = new List<String>{ 'Id != NULL' };

        if (!String.isEmpty(budgetYear) && budgetYear != 'all') {
            budgetYearValue = Integer.valueOf(budgetYear);
            filters.add('FiscalYear = :budgetYearValue');
        }

        if (!String.isEmpty(stage) && stage != 'all') {
            stageValue = stage;
            filters.add('StageName = :stageValue');
        }

        if (!String.isEmpty(closeDate)) {
            closeDateValue = Date.valueOf(closeDate);
            filters.add('CloseDate = :closeDateValue');
        }

        String query = 'SELECT Id, Name, FiscalYear, Amount, StageName, Description, CloseDate, Size__c ' +
            'FROM Opportunity ' +
            'WHERE ' + String.join(filters, ' AND ') + ' ' +
            'ORDER BY Name';

        return Database.query(query);
    }

    @AuraEnabled
    public static Id recalculateOpportunitySizes() {
        return Database.executeBatch(new OpportunitySizeBatch(), 200);
    }

}
