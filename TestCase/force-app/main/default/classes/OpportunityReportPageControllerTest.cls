@IsTest
private class OpportunityReportPageControllerTest {

    @IsTest
    static void getOpportunitiesServerAppliesFilters() {
        Date closeDate = Date.today().addDays(14);
        Opportunity opportunity = new Opportunity(
            Name = 'Controller Filter Opportunity',
            StageName = 'Prospecting',
            CloseDate = closeDate,
            Amount = 25000
        );
        insert opportunity;

        List<Opportunity> allResults = OpportunityReportPageController.getOpportunitiesServer(new Map<String, String>{
            'budgetYear' => 'all',
            'stage' => 'all',
            'closeDate' => ''
        });

        List<Opportunity> stageResults = OpportunityReportPageController.getOpportunitiesServer(new Map<String, String>{
            'budgetYear' => 'all',
            'stage' => 'Prospecting',
            'closeDate' => ''
        });

        List<Opportunity> closeDateResults = OpportunityReportPageController.getOpportunitiesServer(new Map<String, String>{
            'budgetYear' => 'all',
            'stage' => 'all',
            'closeDate' => toIsoDate(closeDate)
        });

        List<Opportunity> yearResults = OpportunityReportPageController.getOpportunitiesServer(new Map<String, String>{
            'budgetYear' => String.valueOf(closeDate.year()),
            'stage' => 'all',
            'closeDate' => ''
        });

        System.assertEquals(1, allResults.size());
        System.assertEquals(opportunity.Id, allResults[0].Id);
        System.assertEquals(1, stageResults.size());
        System.assertEquals(opportunity.Id, stageResults[0].Id);
        System.assertEquals(1, closeDateResults.size());
        System.assertEquals(opportunity.Id, closeDateResults[0].Id);
        System.assertNotEquals(null, yearResults);
    }

    @IsTest
    static void recalculateOpportunitySizesStartsBatch() {
        Test.startTest();
        Id jobId = OpportunityReportPageController.recalculateOpportunitySizes();
        Test.stopTest();

        System.assertNotEquals(null, jobId);
    }

    private static String toIsoDate(Date value) {
        String month = value.month() < 10 ? '0' + value.month() : String.valueOf(value.month());
        String day = value.day() < 10 ? '0' + value.day() : String.valueOf(value.day());
        return value.year() + '-' + month + '-' + day;
    }

}
