export function updateBudgetYear(component, event) {
    component.budgetYear = event.detail.value;
    return component.loadOpportunities();
}

export function updateStage(component, event) {
    component.stage = event.detail.value;
    return component.loadOpportunities();
}

export function updateCloseDate(component, event) {
    component.closeDate = event.detail.value;
    return component.loadOpportunities();
}

export function updateSort(component, event) {
    component.sortedBy = event.detail.fieldName;
    component.sortedDirection = event.detail.sortDirection;
}
