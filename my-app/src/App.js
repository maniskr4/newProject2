import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/foodItems');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Image',
      accessor: 'image',
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Label',
      accessor: 'label',
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: ({ row }) => (
        <input
          type="text"
          value={row.original.price}
          onChange={(e) => handlePriceChange(row.original._id, e.target.value)}
        />
      ),
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
  ];

  const handlePriceChange = async (id, price) => {
    try {
      await axios.put(`/api/foodItems/${id}`, { price });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default App;