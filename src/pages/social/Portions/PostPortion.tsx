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

interface props {
    data: any;
}

const PostPortion: React.FC<props> = ({ data }) => {
    const [boosted, setBoosted] = useState('all');
    const [type, setType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        if (!data || !Array.isArray(data)) {
            setFilteredData([]);
            return;
        }
        
        let temp = [...data];

        if (boosted === 'boosted') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'yes');
        } else if (boosted === 'normal') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'no');
        }

        if (type === 'comment') {
            temp = temp.filter((item) => Number(item.comments || 0) > 0);
        } else if (type === 'like') {
            temp = temp.filter((item) => Number(item.like ?? item.likes ?? 0) > 0);
        } else if (type === 'replies') {
            temp = temp.filter((item) => Number(item.replies || 0) > 0);
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            temp = temp.filter((item) =>
                (item.post || '').toLowerCase().includes(q) ||
                (item.fullName || '').toLowerCase().includes(q) ||
                (item.username || '').toLowerCase().includes(q)
            );
        }

        setFilteredData(temp);
        setCurrentPage(1);
    }, [data, boosted, type, searchQuery]);

    const totalItems = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <Horizontal>
            <Vertical>
                <ItemAlign>
                    <Dropdown
                        options={dates}
                        onChange={() => { }} // You can integrate real date filtering later
                        placeholder="Date"
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
            />
            {totalItems > ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            )}
        </Horizontal>
    );
};

export default PostPortion;
