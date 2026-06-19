import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export function showToast(component, title, message, variant) {
    component.dispatchEvent(
        new ShowToastEvent({
            title,
            message,
            variant
        })
    );
}

export function getErrorMessage(error) {
    return error?.body?.message || error?.message || 'Unexpected error';
}
