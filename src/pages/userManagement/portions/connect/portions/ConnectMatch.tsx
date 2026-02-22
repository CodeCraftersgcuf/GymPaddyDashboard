import React, { useMemo, useState } from "react";
import Horizontal from "../../../../../components/alignments/Horizontal";
import ItemAlign from "../../../../../components/alignments/ItemAlign";
import Dropdown from "../../../../../components/Dropdown";
import { bulkFilter, dates } from "../../../../../constants/FiltersData";
import { exportToCsv } from "../../../../../utils/exportCsv";
import TableCan from "../../../../../components/TableCan";
import SupportRow from "../../../../support/components/SupportRow";
import { supportTickets } from "../../../../../constants/Data";
const getDaysDifference = (dateStr: string) => {
    const now = new Date();
    const givenDate = new Date(dateStr);
    const diff = now.getTime() - givenDate.getTime();
    return diff / (1000 * 60 * 60 * 24);
};
interface props {
    data : any;
}
const ConnectMatch: React.FC<props> = ({data}) => {
    const [selectedDate, setSelectedDate] = useState<string>('today')

    const handleDateFilter = (value: string) => {
        setSelectedDate(value)
    }


    const filteredData = useMemo(() => {
        return data.filter((ticket : any) => {

            const daysLimit = selectedDate === "today" ? 1 : parseInt(selectedDate);
            const dateMatch = getDaysDifference(ticket.created_at) <= daysLimit;

            return dateMatch;
        });
    }, [selectedDate]);
    console.log(filteredData)


    return (
        <Horizontal>
            <ItemAlign>
                <Dropdown
                    options={dates}
                    onChange={handleDateFilter}
                    placeholder="Dates"
                    position="left-0"
                />
                <Dropdown
                    options={bulkFilter}
                    onChange={(val) => { if (val === 'ExportASCSV') exportToCsv(filteredData, 'connect_matches'); }}
                    placeholder="Status"
                    position="left-0"
                />
            </ItemAlign>
            <TableCan
                headerTr={['name', 'message', 'status', 'Date', 'actions']}
                dataTr={filteredData}
                TrName={SupportRow}
            />

        </Horizontal>
    )
};

export default ConnectMatch;
