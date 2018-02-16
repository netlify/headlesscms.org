import React from 'react'
import { Link, RouteData } from 'react-static'
import styled from 'styled-components'
import { TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share'
import GitHubCorner from 'react-github-corner'
import logo from 'Images/headless-logo.svg'

const ShareButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 4px;
  }
`

const ShareButton = styled(({ type, url, color, className, text }) => {
  const components = {
    twitter: { Button: TwitterShareButton, Icon: TwitterIcon },
    reddit: { Button: RedditShareButton, Icon: RedditIcon },
  }
  const { Button, Icon } = components[type];

  return (
    <Button url={url} title={text} className={className}>
      <Icon size={40} round={true} iconBgStyle={{ fill: '#313d3e' }}/>
    </Button>
  )
})`
  cursor: pointer;

  &:hover {
    circle {
      transition: fill 0.1s ease;
      fill: ${({ color }) => color} !important;
    }
  }
`

const Header = () =>
  <RouteData render={({ shareUrl, shareText }) =>
    <div>
      <div className="hero">
        <h1>
          <Link to="/" title="headlessCMS">
            <img alt="headlessCMS" src={logo}/>
          </Link>
        </h1>
        <h2>A List of Content Management Systems for JAMstack Sites</h2>

        <ShareButtonWrapper>
          <ShareButton type="twitter" url={shareUrl} color="#1da1f2" text={shareText}/>
          <ShareButton type="reddit" url={shareUrl} color="#ff4500" text={shareText}/>
        </ShareButtonWrapper>

        <GitHubCorner
          href="https://github.com/netlify/headlesscms.org"
          bannerColor="#313d3e"
          size="100"
        />
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
  }/>

export default Header
