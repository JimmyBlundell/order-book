import React, { useMemo } from 'react';
import { Column, useTable, useSortBy } from 'react-table';
import { Trade } from './OrderBook';
import "./TradeTable.css";

interface TradeTableProps {
  trades: Trade[];
}

const TradeTable = ({ trades }: TradeTableProps) => {
  const data = React.useMemo(() => trades, [trades]);

  const columns = useMemo(() => [
    {
      Header: 'Side',
      accessor: 'side'
    },
    {
      Header: 'Amount',
      accessor: 'amount'
    },
    {
      Header: 'Amount Type',
      accessor: 'amountType'
    },
    // is this necessary if a user is only bidding via amoutn in dollars? is this only for sellers or 
    // when bidding on an amount of shares?
    {
      Header: 'Price/Share',
      accessor: 'price'
    },
    {
      Header: 'GTC',
      accessor: 'gtc',
      Cell: ({ value }) => (value ? 'Yes' : 'No')
    },
    {
      Header: 'Expiration',
      accessor: 'expiration',
      Cell: ({ value }) => (value ? new Date(value).toLocaleString() : '-')
    }
  ] as const, []) as readonly Column<Trade>[];

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className={"trade-table"} style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '70%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: 'solid 3px gray', background: 'aliceblue', color: 'gray', fontWeight: 'bold', padding: '12px 6px', textAlign: 'left' }}>
                {column.render('Header')}
                <span style={{ marginLeft: '5px' }}>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
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
              {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableDataCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
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