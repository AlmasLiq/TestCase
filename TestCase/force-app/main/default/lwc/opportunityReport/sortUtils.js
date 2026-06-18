export function sortRecords(records, fieldName, sortDirection) {
    const direction = sortDirection === 'asc' ? 1 : -1;

    return [...records].sort((a, b) => {
        const valueA = getSortValue(a, fieldName);
        const valueB = getSortValue(b, fieldName);

        if (valueA > valueB) {
            return direction;
        }

        if (valueA < valueB) {
            return -direction;
        }

        return 0;
    });
}

function getSortValue(record, fieldName) {
    const value = record[fieldName];

    if (value === null || value === undefined) {
        return '';
    }

    return typeof value === 'string' ? value.toLowerCase() : value;
}
