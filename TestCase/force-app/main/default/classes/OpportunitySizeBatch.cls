public with sharing class OpportunitySizeBatch implements Database.Batchable<SObject> {

    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator([
            SELECT Id, Amount, Size__c
            FROM Opportunity
        ]);
    }

    public void execute(Database.BatchableContext context, List<SObject> scope) {
        List<Opportunity> opportunitiesToUpdate = new List<Opportunity>();

        for (SObject record : scope) {
            Opportunity opportunity = (Opportunity) record;
            String calculatedSize = OpportunitySizeService.calculateSize(opportunity.Amount);

            if (opportunity.Size__c != calculatedSize) {
                opportunity.Size__c = calculatedSize;
                opportunitiesToUpdate.add(opportunity);
            }
        }

        if (!opportunitiesToUpdate.isEmpty()) {
            update opportunitiesToUpdate;
        }
    }

    public void finish(Database.BatchableContext context) {
    }

}
