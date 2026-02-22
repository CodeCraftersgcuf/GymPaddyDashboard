import React, { useEffect, useState } from 'react';
import Horizontal from '../../../../../components/alignments/Horizontal';
import ItemAlign from '../../../../../components/alignments/ItemAlign';
import Vertical from '../../../../../components/alignments/Vertical';
import Dropdown from '../../../../../components/Dropdown';
import { boostedFilter, dates, socialFilter } from '../../../../../constants/FiltersData';
import SearchFilter from '../../../../../components/SearchFilter';
import TableCan from '../../../../../components/TableCan';
import {  UserPostHeaders } from '../../../../../constants/Data';
import UserPostRow from '../components/UserPostRow';

interface props {
    data: any;
}

const PostPortion: React.FC<props> = ({ data }) => {
    const [boosted, setBoosted] = useState('all');
    const [type, setType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        let temp = [...(data || [])];

        if (boosted === 'boosted') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'yes');
        } else if (boosted === 'normal') {
            temp = temp.filter((item) => item.boostStatus?.toLowerCase() === 'no');
        }

        if (type !== 'all') {
            temp = temp.filter((item) => item.postType?.toLowerCase() === type);
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
    }, [data, boosted, type, searchQuery]);

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
                dataTr={filteredData}
                TrName={UserPostRow}
            />
        </Horizontal>
    );
};

export default PostPortion;
