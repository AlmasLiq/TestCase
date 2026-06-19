trigger OpportunitySizeTrigger on Opportunity (before insert, before update) {
    if (OpportunitySizeService.shouldSetSize()) {
        OpportunitySizeService.setSize(Trigger.new);
    }
}
