import React, { useEffect, useState } from 'react';
import UserPostRow from '../components/UserPostRow';
import Horizontal from '../../../components/alignments/Horizontal';
import Vertical from '../../../components/alignments/Vertical';
import ItemAlign from '../../../components/alignments/ItemAlign';
import Dropdown from '../../../components/Dropdown';
import { boostedFilter, dates, socialFilter } from '../../../constants/FiltersData';
import SearchFilter from '../../../components/SearchFilter';
import TableCan from '../../../components/TableCan';
import { UserPostHeaders } from '../../../constants/Data';
import Pagination from '../../../components/Pagination';
import { getDateThreshold } from '../../../constants/help';

interface props {
    data: any;
}

const PostPortion: React.FC<props> = ({ data }) => {
    const [boosted, setBoosted] = useState('all');
    const [type, setType] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!data || !Array.isArray(data)) {
            setFilteredData([]);
            return;
        }

        let temp = [...data];

        // Date filter
        if (dateFilter && dateFilter !== 'all') {
            const threshold = getDateThreshold(dateFilter);
            if (threshold) {
                temp = temp.filter((item) => {
                    const itemDate = item.createdAt ? new Date(item.createdAt) : item.created_at ? new Date(item.created_at) : null;
                    return itemDate && itemDate >= threshold;
                });
            }
        }

        // Boosted filter
        if (boosted === 'boosted') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'yes');
        } else if (boosted === 'normal') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'no');
        }

        // Type filter: sort by engagement metric so results are always visible
        if (type === 'comment') {
            temp = [...temp].sort((a, b) => Number(b.comments || 0) - Number(a.comments || 0));
        } else if (type === 'like') {
            temp = [...temp].sort((a, b) => Number(b.like ?? b.likes ?? 0) - Number(a.like ?? a.likes ?? 0));
        } else if (type === 'replies') {
            temp = [...temp].sort((a, b) => Number(b.replies ?? b.shares ?? 0) - Number(a.replies ?? a.shares ?? 0));
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            temp = temp.filter((item) =>
                (item.post || item.content || '').toLowerCase().includes(q) ||
                (item.fullName || '').toLowerCase().includes(q) ||
                (item.username || '').toLowerCase().includes(q)
            );
        }

        setFilteredData(temp);
        setCurrentPage(1);
        setSelectedIds(new Set());
    }, [data, boosted, type, searchQuery, dateFilter]);

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
                        onChange={(val: string) => setDateFilter(val)}
                        placeholder="Date"
                        defaultValue="all"
                        position="left-0"
                    />
                    <Dropdown
                        options={boostedFilter}
                        onChange={(val: string) => setBoosted(val)}
                        placeholder="Boosted"
                        defaultValue="all"
                        position="left-0"
                    />
                    <Dropdown
                        options={socialFilter}
                        onChange={(val: string) => setType(val)}
                        placeholder="Type"
                        defaultValue="all"
                        position="left-0"
                    />
                </ItemAlign>
                <SearchFilter
                    handleFunction={(val: string) => setSearchQuery(val)}
                />
            </Vertical>
            <TableCan
                headerTr={UserPostHeaders}
                dataTr={paginatedData}
                TrName={UserPostRow}
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

export default PostPortion;
