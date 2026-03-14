import React, { useEffect, useState } from 'react';
import LivePostRow from '../components/LivePostRow';
import Horizontal from '../../../components/alignments/Horizontal';
import Vertical from '../../../components/alignments/Vertical';
import ItemAlign from '../../../components/alignments/ItemAlign';
import Dropdown from '../../../components/Dropdown';
import { bulkFilter, dates } from '../../../constants/FiltersData';
import { getDateThreshold } from '../../../constants/help';
import { exportToCsv } from '../../../utils/exportCsv';
import SearchFilter from '../../../components/SearchFilter';
import TableCan from '../../../components/TableCan';
import { LivePostHeaders } from '../../../constants/Data';
import Pagination from '../../../components/Pagination';

interface props {
    data: any;
}

const LivePortion: React.FC<props> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!data || !Array.isArray(data)) {
            setFilteredData([]);
            return;
        }

        let temp = [...data];

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            temp = temp.filter((item) =>
                (item.fullName || '').toLowerCase().includes(q) ||
                (item.username || '').toLowerCase().includes(q) ||
                (item.title || '').toLowerCase().includes(q)
            );
        }

        setFilteredData(temp);
        setCurrentPage(1);
        setSelectedIds(new Set());
    }, [data, searchQuery]);

    const totalItems = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const allSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.has(String(item.id)));
    const someSelected = paginatedData.some(item => selectedIds.has(String(item.id)));
    const handleSelectAll = (checked: boolean) => {
        if (checked) setSelectedIds(new Set(paginatedData.map(item => String(item.id))));
        else setSelectedIds(new Set());
    };
    const handleToggleRow = (id: string) => {
        setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
    };

    return (
        <Horizontal>
            <Vertical>
                <ItemAlign>
                    <Dropdown
                        options={dates}
                        onChange={() => {}}
                        placeholder="Date"
                        position="left-0"
                    />
                    <Dropdown
                        options={bulkFilter}
                        onChange={(val: string) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'live_streams'); }}
                        placeholder="Bulk Actions"
                        position="left-0"
                    />
                </ItemAlign>
                <SearchFilter
                    handleFunction={(val: string) => setSearchQuery(val)}
                />
            </Vertical>
            <TableCan
                headerTr={LivePostHeaders}
                dataTr={paginatedData}
                TrName={LivePostRow}
                allSelected={allSelected}
                someSelected={someSelected}
                onSelectAll={handleSelectAll}
                TrPropsName={{ selectedIds, onToggle: handleToggleRow }}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </Horizontal>
    );
};

export default LivePortion;
