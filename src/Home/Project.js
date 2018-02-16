import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import Octicon from 'react-component-octicons'
import { EntypoTwitter } from 'react-entypo'
import photos from 'Images/photos.svg'


const DataPoint = styled.div`
  margin-top: 8px;

  p {
    margin-top: 0;
  }
`

const DataPointTitle = styled.h6`
  display: inline;
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
`

const OpenSourceStatChange = styled.div.attrs({ title: props => props.title })`
  ${props => props.indicateColor && parseFloat(props.children, 10) > 0 && 'color: #31bb47;'}
  ${props => props.indicateColor && parseFloat(props.children, 10) < 0 && 'color: #c91b1b;'}
  font-size: 16px;
`

const OpenSourceStat = styled(({ icon, value, change, indicateColor, label, className }) =>
  <div title={label} className={className}>
    <div>
      <GitHubIcon name={icon}/>
    </div>
    <div>
      <strong>{value}</strong>
    </div>
    {/* Commenting out for seven days, when we have enough data to use it.
    <OpenSourceStatChange title={`${label} in the last 7 days`} indicateColor={indicateColor}>
      {parseFloat(change, 10) > 0 ? `+${change}` : change}
    </OpenSourceStatChange>
    */}
  </div>
)`
  font-size: 18px;
  text-align: center;
  color: #313d3e;
  flex: none;
  width: 33.3%;
`

const GitHubIcon = styled(({ name, className }) =>
  <span className={className}>
    <Octicon name={name} zoom="100%"/>
  </span>
)`
  display: inline-block;
  width: 22px;
  height: 22px;
`

const TwitterIcon = styled(({ className }) =>
  <EntypoTwitter className={className}/>
)`
  width: 16px !important;
  height: 16px !important;
`

const TwitterFollowers = ({ followers }) =>
  <div>
    <TwitterIcon/> <strong>{followers}</strong> followers
  </div>

const OpenSourceStats = styled(({
  stars,
  starsPrevious,
  issues,
  issuesPrevious,
  forks,
  forksPrevious,
  className,
}) =>
  <div className={className}>
    <OpenSourceStat
      icon="star"
      label="GitHub stars"
      value={stars}
      change={stars - starsPrevious}
      indicateColor={true}
    />
    <OpenSourceStat
      icon="issue-opened"
      label="GitHub open issues"
      value={issues}
      change={issues - issuesPrevious}
    />
    <OpenSourceStat
      icon="repo-forked"
      label="GitHub forks"
      value={forks}
      change={forks - forksPrevious}
      indicateColor={true}
    />
  </div>
)`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fcfcfc;
  padding: 18px;
  margin: 16px -18px 0;
  display: flex;
`


const Project = ({
  title,
  repo,
  homepage,
  openSource,
  type,
  generators = [],
  stars,
  followers,
  forks,
  issues,
  starsPrevious = 0,
  forksPrevious = 0,
  issuesPrevious = 0,
  images,
  description,
  slug,
}) => {
  const stats = { stars, starsPrevious, issues, issuesPrevious, forks, forksPrevious }

  return (
    <Link to={`/projects/${slug}`} className="card">
      <div className={`tag ${openSource ? '' : 'proprietary'}`}>
        {openSource ? 'open source' : null}
      </div>
      {images ? <img className="photos-inside" src={photos}/> : null}
      <h4 className="title">{title}</h4>
      {followers ? <TwitterFollowers followers={followers}/> : null}
      {openSource ? <OpenSourceStats {...stats}/> : null }
      <div className="description">{description}</div>
      <DataPoint>
        <DataPointTitle>Type:</DataPointTitle>
        <p className="type">{type || 'Unknown'}</p>
      </DataPoint>
      <DataPoint>
        <DataPointTitle>Supported Site Generators:</DataPointTitle>
        <p>{generators.join(', ')}</p>
      </DataPoint>
    </Link>
  )
}

export default Project
