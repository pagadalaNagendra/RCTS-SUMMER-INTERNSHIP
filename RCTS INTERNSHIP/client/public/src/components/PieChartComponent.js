import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your Flask API endpoint
    fetchData();
  }, []);

  const fetchData = async () => {
    // Make a request to your Flask API endpoint to retrieve the column names
    const response = await fetch('http://localhost:5000/get_columns');
    const jsonData = await response.json();

    // Assuming your API response contains the 'columns' field
    const columns = jsonData.columns;

    // Process the column data to generate the pie chart data
    const chartData = columns.map((column, index) => ({
      name: column,
      value: index + 1,
    }));

    setData(chartData);
  };

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;

