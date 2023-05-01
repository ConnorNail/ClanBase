import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import Image from 'next/image';
import { Text, Div, Icon } from 'atomize';
import useGetEntityDefinition from '../../../functions/useGetEntityDefinition';
import LoadingWrapper from '../../LoadingWrapper';

const formatValue = (value, valueStyle) => {
  switch (valueStyle) {
    case 0: // Automatic
    default:
      return <Icon name="Loading3" size="20px" color="cbGrey2" />;
    case 3: // Percentage
      return `${value}%`;
    case 4: // DateTime
      return new Date(value * 1000).toLocaleString();
    case 6: // Integer
      // return parseInt(value);
      return value.toLocaleString();
    case 7: // TimeDuration
      const duration = new Date(value);
      const hours = duration.getUTCHours();
      const minutes = duration.getUTCMinutes();
      const seconds = duration.getUTCSeconds();
      const hoursString = hours === 1 ? 'hour' : 'hours';
      const minutesString = minutes === 1 ? 'minute' : 'minutes';
      const secondsString = seconds === 1 ? 'second' : 'seconds';
    
      if (hours > 0) {
        return `${hours} ${hoursString} ${minutes} ${minutesString}`;
      } else if (minutes > 0) {
        return `${minutes} ${minutesString} ${seconds} ${secondsString}`;
      } else {
        return `${seconds} ${secondsString}`;
      }    
    case 8: // Hidden
      return 'N/A';
    case 9: // Multiplier
      return `${value}x`;
    case 12: // ExplicitPercentage
      return `${value}%`;
    case 13: // RawFloat
      return (value / 100).toFixed(2);
  }
};

const PlayerMetricsTable = ({ data }) => {

  const objDefinition = useGetEntityDefinition('DestinyObjectiveDefinition', data[0]?.stat?.objectiveHash)
  const inProgressValueStyle = objDefinition ? objDefinition?.Response?.inProgressValueStyle : null

  const columns = useMemo(
    () => [
      {
        Header: 'Player Name',
        accessor: 'playerName',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={row.original.profilePicture}
              alt={`${row.original.playerName}'s profile`}
              width={32}
              height={32}
            />
            <span style={{ marginLeft: '8px' }}>
              {row.original.playerName}
            </span>
          </div>
        ),
      },
      {
        Header: 'Stat Progress',
        accessor: 'stat.progress',
        Cell: ({ row }) => {
          const { stat } = row.original;
          if (stat === "Unavailable") {
            return "Unavailable";
          } else {
            return formatValue(stat.progress, inProgressValueStyle);
          }
        },
      },
      {
        Header: 'Stat Completion Value',
        accessor: 'stat.completionValue',
        Cell: ({ row }) => {
          const { stat } = row.original;
          if (stat === "Unavailable") {
            return "Unavailable";
          } else {
            return formatValue(stat.completionValue, inProgressValueStyle);
          }
        },
      },
      {
        Header: 'Status',
        id: 'status',
        Cell: ({ row }) => {
          const { stat } = row.original;

          const getStatus = () => {
            if (stat === "Unavailable") {
              return "Unavailable";
            } else {
              return stat.complete ? "Completed" : "Incomplete";
            }
          };

          const status = getStatus();

          return (
            <Div
              d="flex"
              justify="center"
              align="center"
            >
              <Div
                d="inline-flex"
                p="0.25rem"
                justify="center"
                align="center"
                bg={status === "Completed" ? "cbBlue" : "transparent"}
                rounded="md"
              >
                <Text textColor={status === "Completed" ? "cbGrey1" : "cbWhite"}>{status}</Text>
              </Div>
            </Div>
          );
        },
      },
    ],
    [inProgressValueStyle]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map((headerGroup, hgIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`hg-${hgIndex}`}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ padding: '0.25rem', border: '1px solid #8B8989', cursor: 'pointer' }}
                key={`header-${hgIndex}-${columnIndex}`}
              >
                <Text textColor="cbWhite" tag="span">
                  {column.render('Header')}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </Text>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
              {row.cells.map((cell, cellIndex) => {
                return <td {...cell.getCellProps()} style={{ padding: '0.25rem', border: '1px solid #8B8989' }} key={`cell-${rowIndex}-${cellIndex}`}>
                  <Text textColor="cbWhite" tag="span">
                    {cell.render('Cell')}
                  </Text>
                </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlayerMetricsTable;
