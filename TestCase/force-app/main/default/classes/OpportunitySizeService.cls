public with sharing class OpportunitySizeService {

    @TestVisible
    private static Boolean bypassAutomation = false;

    public static final String SMALL = 'Small';
    public static final String MIDDLE = 'Middle';
    public static final String LARGE = 'Large';

    public static Boolean shouldSetSize() {
        return !bypassAutomation;
    }

    public static String calculateSize(Decimal amount) {
        if (amount != null && amount < 1000) {
            return SMALL;
        }

        if (amount != null && amount > 100000) {
            return LARGE;
        }

        return MIDDLE;
    }

    public static void setSize(List<Opportunity> opportunities) {
        for (Opportunity opportunity : opportunities) {
            opportunity.Size__c = calculateSize(opportunity.Amount);
        }
    }

}
