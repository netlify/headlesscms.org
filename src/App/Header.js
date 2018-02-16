import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import { TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share'
import GitHubCorner from 'react-github-corner'
import logo from 'Images/headless-logo.svg'

const ShareButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 6px;
  }
`

const Header = () => {
  const shareUrl = 'https://headlesscms.org'
  const shareIconSize = 40
  const shareText = `
headlessCMS is a leaderboard of the top Content Management Systems (CMS) for
JAMstack sites. Promoting a static approach to building websites.
  `
  return (
    <div>
      <div className="hero">
        <h1>
          <Link to="/" title="headlessCMS">
            <img alt="headlessCMS" src={logo}/>
          </Link>
        </h1>
        <h2>A List of Content Management Systems for JAMstack Sites</h2>

        <ShareButtonWrapper>
          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon size={shareIconSize} round={true}/>
          </TwitterShareButton>
          <RedditShareButton url={shareUrl} title={shareText}>
            <RedditIcon size={shareIconSize} iconBgStyle={{ fill: '#ff4500' }} round={true}/>
          </RedditShareButton>
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
  );
}

export default Header
