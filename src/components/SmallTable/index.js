import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Div } from "atomize";

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
            pageSize: 3,
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
        <Div m="1rem">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render("Header")}
                                    <span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} key={cell.id}>
                                        <Div m={{ l: "0.5rem", r: "0.5rem" }}>
                                            {cell.render("Cell")}
                                        </Div>
                                    </td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Div>
    );
}