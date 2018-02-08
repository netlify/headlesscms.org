import React from 'react'
import { Router, Link } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header'
import Footer from './Footer'
import Routes from 'react-static-routes'

injectGlobal`
  * {
    box-sizing: border-box;
    text-size-adjust: none;
  }

  body {
    margin: 0;
  }
`

const AppStyles = styled.div`
  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
  }

  nav {
    width: 100%;
    background: #108db8;

    a {
      color: white;
      padding: 1rem;
      display: inline-block;
    }
  }

  .content {
    padding: 1rem;
  }

  img {
    max-width: 100%;
  }
`

const App = () => (
  <Router>
    <AppStyles>
      <Header/>
      <div className="content">
        <Routes />
      </div>
      <Footer/>
    </AppStyles>
  </Router>
)

export default hot(module)(App)
