import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { getErrorMessage, showToast } from './notifications';

export function handleRowAction(component, event) {
    const { action, row } = event.detail;

    if (row.disableRowActions) {
        return;
    }

    if (action.name === 'edit') {
        navigateToEditPage(component, row.Id);
        return;
    }

    if (action.name === 'delete') {
        deleteOpportunity(component, row.Id);
    }
}

function navigateToEditPage(component, recordId) {
    component[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId,
            objectApiName: 'Opportunity',
            actionName: 'edit'
        }
    });
}

async function deleteOpportunity(component, recordId) {
    try {
        component.showSpinner = true;
        await deleteRecord(recordId);
        component.opportunities = component.opportunities.filter((opportunity) => opportunity.Id !== recordId);
        showToast(component, 'Opportunity deleted', 'The opportunity was deleted successfully.', 'success');
    } catch (e) {
        console.error(e);
        showToast(component, 'Delete failed', getErrorMessage(e), 'error');
    } finally {
        component.showSpinner = false;
    }
}
