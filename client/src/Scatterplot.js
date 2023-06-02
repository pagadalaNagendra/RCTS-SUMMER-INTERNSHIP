// import React, { useState, useEffect } from "react";
// import Chart from 'react-apexcharts';
// import Navbar from './components/navbar/navbar'

// function ScatterPlot() {
//   const [Fruits, setFruits] = useState([]);
//   const [Quantatiny, setQuantatiny] = useState([]);

//   useEffect(() => {
//     const sFruits = [];
//     const sQuantatiny = [];

//     const getFruitsData = async () => {
//       try {
//         const reqData = await fetch("http://127.0.0.1:5000/get-data");
//         const resData = await reqData.json();
//         console.log(resData);

//         for (let i = 0; i < resData.length; i++) {
//           sFruits.push(resData[i].question);
//           sQuantatiny.push({ x: resData[i].question, y: parseInt(resData[i].answer) });
//         }
//         setFruits(sFruits);
//         setQuantatiny(sQuantatiny);
//         console.log(resData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getFruitsData();
//   }, []);

//   return (
//     <React.Fragment>
//       <Navbar/>
//       <div className="color">
//         <h3>Welcome to scatter plot</h3>
//         <Chart
//           type="scatter"
//           width={1500}
//           height={640}
//           series={[{ data: Quantatiny}]}
//           options={{
//             title: { text: "Fruits Scatter Plot" },
//             noData: { text: "Empty Data" },
//             xaxis: { categories: Fruits },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   );
// }

// export default ScatterPlot;


import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import Navbar from './components/navbar/navbar'

function ScatterPlot() {
  const [Fruits, setFruits] = useState([]);
  const [Quantatiny, setQuantatiny] = useState([]);

  useEffect(() => {
    const sFruits = [];
    const sQuantatiny = [];

    const getFruitsData = async () => {
      try {
        const reqData = await fetch("http://127.0.0.1:5000/get-data");
        const resData = await reqData.json();
        console.log(resData);

        // Calculate average for repeated questions
        const fruitMap = new Map();
        const fruitCountMap = new Map();

        for (let i = 0; i < resData.length; i++) {
          const question = resData[i].question;
          const answer = parseInt(resData[i].answer);

          if (fruitMap.has(question)) {
            const total = fruitMap.get(question) + answer;
            const count = fruitCountMap.get(question) + 1;
            fruitMap.set(question, total);
            fruitCountMap.set(question, count);
          } else {
            fruitMap.set(question, answer);
            fruitCountMap.set(question, 1);
          }
        }

        fruitMap.forEach((total, question) => {
          sFruits.push(question);
          const average = total / fruitCountMap.get(question);
          sQuantatiny.push({ x: question, y: average });
        });

        setFruits(sFruits);
        setQuantatiny(sQuantatiny);
      } catch (error) {
        console.error(error);
      }
    };

    getFruitsData();
  }, []);

  return (
    <React.Fragment>
      <Navbar/>
      <div className="color">
        <h3>Welcome to scatter plot</h3>
        <Chart
          type="scatter"
          width={1500}
          height={640}
          series={[{ data: Quantatiny }]}
          options={{
            title: { text: "Fruits Scatter Plot" },
            noData: { text: "Empty Data" },
            xaxis: { categories: Fruits },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default ScatterPlot;

