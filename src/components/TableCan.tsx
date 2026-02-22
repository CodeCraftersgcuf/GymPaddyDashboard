import React from "react";

interface TableCanProps<T> {
    heading?: string;
    ButtonName?: string;
    ButtonLink?: string;
    headerTr: string[];
    dataTr: T[];
    TrName: React.ElementType;
    showHeading?: boolean;
    TrPropsName?: Record<string, any>;
    allSelected?: boolean;
    someSelected?: boolean;
    onSelectAll?: (checked: boolean) => void;
}

const TableCan = <T,>({
    heading,
    headerTr,
    dataTr,
    TrName,
    showHeading = false,
    TrPropsName = {},
    allSelected = false,
    someSelected = false,
    onSelectAll,
}: TableCanProps<T>) => {
    return (
        <div className="rounded-xl bg-white shadow-md shadow-gray-400 ">
            {showHeading && (
                <div className="flex items-center justify-between gap-2 p-4">
                    <h1 className="text-2xl font-semibold capitalize">{heading}</h1>
                </div>
            )}
            <div className={`overflow-x-auto overflow-y-visible pb-8 ${!showHeading && 'rounded-xl'}`}>
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-theme-light text-black capitalize">
                        <tr>
                            <th className="p-2 py-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                                    onChange={(e) => onSelectAll?.(e.target.checked)}
                                    className="cursor-pointer"
                                />
                            </th>
                            {headerTr.map((item, index) => (
                                <th
                                    key={index}
                                    className={`p-2 py-4 font-semibold ${item.toLowerCase() === "actions" ? "text-center" : "text-left"
                                        } capitalize`}
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataTr.length > 0 ? (
                            dataTr.map((data, index) => {
                                return <TrName key={index} displayData={data} {...TrPropsName} />;
                            })
                        ) : (
                            <tr>
                                <td colSpan={headerTr.length} className="text-center py-2 px-4">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCan;
