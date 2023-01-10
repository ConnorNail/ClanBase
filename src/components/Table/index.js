import React from "react";
import { useTable, useSortBy } from "react-table";
import { Div, Text } from "atomize";

export default function Table({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    },
        useSortBy
    );

    return (
        <table {...getTableProps()} style={{borderCollapse: "collapse"}}>
            <thead style={{fontSize: "15px"}}>
                {headerGroups.map((headerGroup, headerI) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerI}>
                        {headerGroup.headers.map((column, columnI) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={columnI} style={{padding: "0 1rem"}}>
                                {/* <Div d="flex"> */}
                                {/* <Div> */}
                                    <Text textColor="cbWhite">
                                        {column.render("Header")}
                                    </Text>
                                {/* </Div> */}
                                <span key={columnI}>
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </span>
                                {/* </Div> */}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowI) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={rowI}>
                            {row.cells.map((cell, cellI) => {
                                return <td {...cell.getCellProps()} key={cellI} style={{padding: "0 0", borderColor: "grey", borderStyle: "solid"}}>
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