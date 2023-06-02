import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';

import Navbar from './components/navbar/navbar';

function AreaChart() {
  const [Fruits, setFruits] = useState([]);
  const [Quantatiny, setQuantatiny] = useState([]);

  useEffect(() => {
    const sFruits = [];
    const sQuantatiny = [];

    const getFruitsData = async () => {
      const reqData = await fetch("http://127.0.0.1:5000/get-data");
      const resData = await reqData.json();
      console.log(resData);

      for (let i = 0; i < resData.length; i++) {
        sFruits.push(resData[i].question);
        sQuantatiny.push(parseInt(resData[i].answer));
      }
      setFruits(sFruits);
      setQuantatiny(sQuantatiny);
    };

    getFruitsData();
  }, []);

  return (
    <React.Fragment>
      <Navbar/>
      <div className="color">
        <h3>Welcome to area chart</h3>
        <Chart
          type="area"
          width={1500}
          height={640}
          series={[
            {
              name: "Quantatiny",
              data: Quantatiny
            }
          ]}
          options={{
            chart: {
              id: "area-chart",
            },
            xaxis: {
              categories: Fruits,
              title: {
                text: "Fruits"
              }
            },
            yaxis: {
              title: {
                text: "Quantatiny"
              }
            },
            title: {
              text: "Fruits Area chat",
            },
            noData: {
              text: "Empty Data",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default AreaChart;

