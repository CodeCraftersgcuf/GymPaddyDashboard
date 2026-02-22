import React, { useState, useMemo } from 'react';
import Horizontal from '../../../../../components/alignments/Horizontal';
import ItemAlign from '../../../../../components/alignments/ItemAlign';
import Dropdown from '../../../../../components/Dropdown';
import { bulkFilter, dates } from '../../../../../constants/FiltersData';
import { exportToCsv } from '../../../../../utils/exportCsv';
import TableCan from '../../../../../components/TableCan';
import {  matchesTableHeaders } from '../../../../../constants/Data';
import MatchRow from '../components/MatchRow';
import dayjs from 'dayjs'; // ✅ make sure this is installed

interface Props {
  data: any;
}

const Matches: React.FC<Props> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const itemDate = dayjs(item.date, 'DD/MM/YY - hh:mm A'); // ✅ format must match your date string

      const today = dayjs();
      let dateMatch = true;

      if (selectedDate === 'today') {
        dateMatch = itemDate.isSame(today, 'day');
      } else if (selectedDate && !isNaN(parseInt(selectedDate))) {
        dateMatch = itemDate.isAfter(today.subtract(parseInt(selectedDate), 'day'));
      }


      return dateMatch;
    });
  }, [selectedDate]);

  return (
    <Horizontal>
      <ItemAlign>
        <Dropdown
          options={dates}
          onChange={setSelectedDate}
          placeholder="Dates"
          position="left-0"
        />
        <Dropdown
          options={bulkFilter}
          onChange={(val) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'matches'); }}
          placeholder="Bulk Actions"
          position="left-0"
        />
      </ItemAlign>

      <TableCan
        headerTr={matchesTableHeaders}
        dataTr={filteredData}
        TrName={MatchRow}
      />
    </Horizontal>
  );
};

export default Matches;
