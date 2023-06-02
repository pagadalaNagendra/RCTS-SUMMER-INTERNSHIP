import React from 'react';
import './navbarstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBackward } from '@fortawesome/free-solid-svg-icons';

import logo from "./iiit_logo.png"

function Navbar() {
  return (
    <div>
      <header className='navbar_header'>
        <nav>
          <ul>
            <li className='navbar_logo_title'>
              <img id="navbar-logo" src={logo} alt="logo" />
              {/* <span className="navbar_title">IIIT_HYDERBAD</span> */}
            </li>
            <li className='nag'><a href="/"><FontAwesomeIcon icon={faHouse} /></a></li>
            <li className='mani'><a href="/home"><FontAwesomeIcon icon={faBackward} /> </a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;