export function exportRowsToCsv(rows, columns, filename) {
    const exportColumns = columns.filter((column) => column.fieldName);
    const headers = exportColumns.map((column) => column.label);
    const body = rows.map((row) => {
        return exportColumns.map((column) => formatCsvValue(row[column.fieldName])).join(',');
    });
    const csv = '\uFEFF' + [headers.join(','), ...body].join('\n');
    const link = document.createElement('a');

    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = filename;
    link.target = '_self';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function buildExportFilename(prefix = 'Opportunity_Report') {
    const date = new Date().toISOString().slice(0, 10);
    return `${prefix}_${date}.csv`;
}

function formatCsvValue(value) {
    if (value === null || value === undefined) {
        return '';
    }

    return `"${String(value).replace(/"/g, '""')}"`;
}
