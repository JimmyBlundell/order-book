import React, { useMemo } from 'react';
import { Column, useTable, useSortBy } from 'react-table';
import { Trade } from './OrderBook';
import './TradeTable.css';

interface TradeTableProps {
  trades: Trade[];
  isBuySide: boolean;
}

const TradeTable = ({ trades, isBuySide }: TradeTableProps) => {
  const data = useMemo(() => trades, [trades]);

  const columns = useMemo(
    () => [
      {
        Header: 'Side',
        accessor: 'side',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Amount Type',
        accessor: 'amountType',
      },
      {
        Header: 'Price/Share',
        accessor: 'price',
        sortDescFirst: isBuySide
      },
      {
        Header: 'GTC',
        accessor: 'gtc',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: 'Expiration',
        accessor: 'expiration',
        Cell: ({ value }) => (value ? new Date(value).toLocaleString() : '-'),
      },
    ],
    []
  ) as Column<Trade>[];

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table
      {...getTableProps()}
      className={'trade-table'}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '70%',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                {/* Add sorting indicators */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradeTable;