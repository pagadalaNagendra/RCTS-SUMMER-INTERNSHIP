import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Form from './form';
import Piechart from './Piechart';
import BarChart from './Barchart';
import LineChart from './Linechart';
import AreaChart from './Areachart';
import ScatterPlot from './Scatterplot';
import HeatMapChart from './Heatmap';
import Homepage from "./components/home/homepage";
import ExcelUploadPage from './ExcelUploadPage';
import Pie from './Pie';
import PieChartComponent from './components/PieChartComponent';






function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Form />}></Route>
        <Route path="/home" exact element={<Homepage/>}></Route> 
        <Route path="/piechart" exact element={<Piechart />}></Route>
        <Route path="/Barchart" exact element={<BarChart />}></Route>
        <Route path="/Linechart" exact element={<LineChart />}></Route>
        <Route path="/Areachart" exact element={<AreaChart />}></Route>
        <Route path="/Scatterplot" exact element={<ScatterPlot />}></Route>
        <Route path="/Heatmap" exact element={<HeatMapChart />}></Route>
        <Route path="/ExcelUploadPage" exact element={<ExcelUploadPage/>}></Route> 
        <Route path="/pie" exact element={<Pie />}></Route>
        <Route path="/PieChartComponents" exact element={<PieChartComponent/>}></Route>
      

        </Routes>
      </BrowserRouter>
    </>
    );
  }
export default App;