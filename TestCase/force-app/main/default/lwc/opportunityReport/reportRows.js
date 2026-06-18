import { sortRecords } from './sortUtils';

export function buildYearOptions(currentYear = new Date().getFullYear()) {
    const options = [{ label: 'All Years', value: 'all' }];

    for (let i = -2; i <= 2; i++) {
        const year = (currentYear + i).toString();
        options.push({ label: year, value: year });
    }

    return options;
}

export function calculateTotalAmount(opportunities) {
    return opportunities.reduce((total, opportunity) => {
        return total + (opportunity.Amount || 0);
    }, 0);
}

export function buildTableRows(opportunities, sortedBy, sortedDirection) {
    return [
        ...sortRecords(opportunities, sortedBy, sortedDirection),
        {
            Id: 'summary-row',
            Name: 'Total',
            Amount: calculateTotalAmount(opportunities),
            disableRowActions: true
        }
    ];
}
