import React from 'react';
// import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';
import "./homepage.css";


function Card(props) {
  return (
    <a href={props.link}>
      <div className="card">
        <div className={`front ${props.class}`}></div>
        <div className="back">
          {props.title}
        </div>
      </div>
    </a>
  );
}

function Homepage() {
  return (
    <>
    <div>
      <div className="App">
        <Navbar/>
        
      <div className="homepage_container">
        <Card class="front" title="Piechart" link="/piechart" />
        <Card class="front1" title="Barchart" link="/Barchart" />
        <Card class="front2" title="Linechart" link="/Linechart" />
        <Card class="front3" title="Heatmap" link="/Heatmap" />
        <Card class="front4" title="Areachart" link="/Areachart" />
        <Card class="front5" title="Scattterplot" link="/Scatterplot" />
      </div>
      </div>
    </div>
    </>
  );
}

export default Homepage;

