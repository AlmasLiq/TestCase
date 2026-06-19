export const columns = [
    { label: 'Name', fieldName: 'Name', sortable: true },
    { label: 'Fiscal Year', fieldName: 'FiscalYear', sortable: true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', sortable: true },
    { label: 'Size', fieldName: 'Size__c', sortable: true },
    { label: 'Stage', fieldName: 'StageName', sortable: true },
    { label: 'Description', fieldName: 'Description', sortable: true },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date', sortable: true },
    {
        label: 'Edit',
        type: 'button',
        fixedWidth: 90,
        typeAttributes: {
            label: 'Edit',
            name: 'edit',
            variant: 'brand-outline',
            disabled: { fieldName: 'disableRowActions' }
        }
    },
    {
        label: 'Delete',
        type: 'button',
        fixedWidth: 100,
        typeAttributes: {
            label: 'Delete',
            name: 'delete',
            variant: 'destructive-text',
            disabled: { fieldName: 'disableRowActions' }
        }
    }
];
