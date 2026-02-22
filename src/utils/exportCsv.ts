/**
 * Converts an array of objects to a CSV string and triggers a browser download.
 * @param data     Array of plain objects to export
 * @param filename Desired filename without extension
 */
export function exportToCsv<T extends Record<string, any>>(data: T[], filename = 'export'): void {
  if (!data || data.length === 0) return;

  const flattenValue = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') return JSON.stringify(val).replace(/"/g, "'");
    return String(val);
  };

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const cell = flattenValue(row[h]);
      // Wrap in quotes if cell contains comma, newline or quote
      return /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
    }).join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
