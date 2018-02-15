import React from 'react'
import { Link } from 'react-static'
import logo from './images/headless-logo.svg'

const Header = ({}) =>
  <div>
    <div className="hero">
      <h1>
        <Link to="/" title="headlessCMS">
          <img alt="headlessCMS" src={logo}/>
        </Link>
      </h1>
      <h2>A List of Content Management Systems for JAMstack Sites</h2>

      <div id="share-button-top" className='share-button share-button-top'></div>

      <a href="https://github.com/netlify/headlesscms.org">
        <img style={{ position: 'absolute', top: 0, right: 0, border: 0 }} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/>
      </a>
    </div>
    <div className="navbar">
      <div className="container">
        <div className="menu left">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contribute">Contribute</Link></li>
            <li><a href="https://jamstack.org/" target="_blank">What is JAMstack?</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

export default Header
