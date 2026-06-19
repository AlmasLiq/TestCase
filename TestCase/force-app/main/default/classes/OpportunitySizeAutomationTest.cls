@IsTest
private class OpportunitySizeAutomationTest {

    @IsTest
    static void triggerSetsSizeOnInsertAndUpdate() {
        List<Opportunity> opportunities = new List<Opportunity>{
            buildOpportunity('Small Opportunity', 999),
            buildOpportunity('Middle Opportunity', 1000),
            buildOpportunity('Large Opportunity', 100001),
            buildOpportunity('Null Amount Opportunity', null)
        };

        insert opportunities;

        Map<String, Opportunity> insertedByName = getOpportunitiesByName(new Set<String>{
            'Small Opportunity',
            'Middle Opportunity',
            'Large Opportunity',
            'Null Amount Opportunity'
        });

        System.assertEquals(OpportunitySizeService.SMALL, insertedByName.get('Small Opportunity').Size__c);
        System.assertEquals(OpportunitySizeService.MIDDLE, insertedByName.get('Middle Opportunity').Size__c);
        System.assertEquals(OpportunitySizeService.LARGE, insertedByName.get('Large Opportunity').Size__c);
        System.assertEquals(OpportunitySizeService.MIDDLE, insertedByName.get('Null Amount Opportunity').Size__c);

        Opportunity smallOpportunity = insertedByName.get('Small Opportunity');
        smallOpportunity.Amount = 250000;
        update smallOpportunity;

        Opportunity updatedOpportunity = [
            SELECT Size__c
            FROM Opportunity
            WHERE Id = :smallOpportunity.Id
        ];

        System.assertEquals(OpportunitySizeService.LARGE, updatedOpportunity.Size__c);
    }

    @IsTest
    static void batchRecalculatesExistingOpportunities() {
        Opportunity opportunity = buildOpportunity('Batch Opportunity', 500);
        insert opportunity;

        OpportunitySizeService.bypassAutomation = true;
        try {
            opportunity.Size__c = OpportunitySizeService.LARGE;
            update opportunity;
        } finally {
            OpportunitySizeService.bypassAutomation = false;
        }

        Test.startTest();
        Database.executeBatch(new OpportunitySizeBatch(), 200);
        Test.stopTest();

        Opportunity recalculatedOpportunity = [
            SELECT Size__c
            FROM Opportunity
            WHERE Id = :opportunity.Id
        ];

        System.assertEquals(OpportunitySizeService.SMALL, recalculatedOpportunity.Size__c);
    }

    private static Opportunity buildOpportunity(String name, Decimal amount) {
        return new Opportunity(
            Name = name,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30),
            Amount = amount
        );
    }

    private static Map<String, Opportunity> getOpportunitiesByName(Set<String> names) {
        Map<String, Opportunity> opportunitiesByName = new Map<String, Opportunity>();

        for (Opportunity opportunity : [
            SELECT Name, Size__c
            FROM Opportunity
            WHERE Name IN :names
        ]) {
            opportunitiesByName.put(opportunity.Name, opportunity);
        }

        return opportunitiesByName;
    }

}
