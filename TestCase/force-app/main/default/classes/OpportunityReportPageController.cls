public with sharing class OpportunityReportPageController {

    @AuraEnabled
    public static List<Opportunity> getOpportunitiesServer(Map<String, String> params) {
        String budgetYear = params.get('budgetYear');
        String stage = params.get('stage');
        String closeDate = params.get('closeDate');
        String s = 'SELECT Id, Name, FiscalYear, Amount, StageName, Description, CloseDate ';
        String f = ' FROM Opportunity';
        String w = ' WHERE Id != NULL ';
        String o = ' ORDER BY Name ';
        if (!String.isEmpty(budgetYear) && budgetYear != 'all') w += ' AND FiscalYear = ' + Integer.valueOf(budgetYear) + ' ';
        if (!String.isEmpty(stage) && stage != 'all') w += ' AND StageName = \'' + String.escapeSingleQuotes(stage) + '\' ';
        if (!String.isEmpty(closeDate)) w += ' AND CloseDate = ' + toSoqlDate(Date.valueOf(closeDate)) + ' ';
        return Database.query(s + f + w + o);
    }

    private static String toSoqlDate(Date value) {
        String month = value.month() < 10 ? '0' + value.month() : String.valueOf(value.month());
        String day = value.day() < 10 ? '0' + value.day() : String.valueOf(value.day());
        return value.year() + '-' + month + '-' + day;
    }

}
