import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Div, Icon, Text } from "atomize";

export default function SmallTable({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        page, // page for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data,
        initialState: {
            pageIndex:1,
            pageSize: 5,
            sortBy: [
                {
                    id: 'joinDate',
                    desc: true
                }
            ]
        }
    },
        useSortBy,
        usePagination
    );

    return (
        <table {...getTableProps()} style={{ borderCollapse: "collapse" }}>
            <thead style={{ fontSize: "15px" }}>
                {headerGroups.map((headerGroup, headerI) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerI}>
                        {headerGroup.headers.map((column, columnI) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={columnI} style={{ padding: "0 1rem" }}>
                                <Div d="flex">
                                    <Div>
                                        <Text textColor="cbWhite">
                                            {column.render("Header")}
                                        </Text>
                                    </Div>
                                    <Div key={columnI}>
                                        {column.isSorted ? (column.isSortedDesc ? <Icon name="DownArrow" size="20px" color="cbBlue" /> : <Icon name="UpArrow" size="20px" color="cbBlue" />) : ""}
                                    </Div>
                                </Div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, rowI) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={rowI}>
                            {row.cells.map((cell, cellI) => {
                                return <td {...cell.getCellProps()} key={cellI} style={{ padding: "0 0", borderColor: "grey", borderStyle: "solid" }}>
                                    {/* <Div> */}
                                    {cell.render("Cell")}
                                    {/* </Div> */}
                                </td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}