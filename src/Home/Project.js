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
  font-size: 14px;
`

const OpenSourceStatIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
`

const OpenSourceStat = styled(({ Icon, value, change, indicateColor, label, className }) => {
  const disabled = typeof value !== 'number'
  const changeValue = parseFloat(change, 10) > 0 ? `+${change}` : change

  return (
    <div title={label} className={`${className} ${disabled ? 'disabled' : ''}`}>
      <OpenSourceStatIcon>
        <Icon/>
      </OpenSourceStatIcon>
      {disabled ? <div>N/A</div> :
        <div>
          <strong>{value}</strong>
          {/*
            Commenting this out for now, until we have 7 days of data.
            <OpenSourceStatChange title={`${label} in the last 7 days`} indicateColor={indicateColor}>
              {changeValue === 0 ? '--' : changeValue}
            </OpenSourceStatChange>
          */}
        </div>
      }
    </div>
  )
})`
  font-size: 15px;
  text-align: center;
  color: #313d3e;
  width: 25%;

  & svg {
    fill: #313d3e !important;
  }

  &.disabled {
    color: #bbb;

    & svg {
      fill: #bbb !important;
    }
  }
`

const TwitterIcon = styled(({ className }) =>
  <EntypoTwitter className={className}/>
)`
  width: 16px !important;
  height: 16px !important;
`

const OpenSourceStats = styled(({
  stars,
  starsPrevious,
  issues,
  issuesPrevious,
  forks,
  forksPrevious,
  followers,
  followersPrevious,
  className,
}) =>
  <div className={className}>
    <OpenSourceStat
      Icon={() => <Octicon name="star" zoom="100%"/>}
      label="GitHub stars"
      value={stars}
      change={stars - starsPrevious}
      indicateColor={true}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="issue-opened" zoom="100%"/>}
      label="GitHub open issues"
      value={issues}
      change={issues - issuesPrevious}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="repo-forked" zoom="100%"/>}
      label="GitHub forks"
      value={forks}
      change={forks - forksPrevious}
      indicateColor={true}
    />
    <OpenSourceStat
      Icon={() => <TwitterIcon/>}
      label="Twitter followers"
      value={followers}
      change={followers - followersPrevious}
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
  forks,
  issues,
  followers,
  starsPrevious = 0,
  forksPrevious = 0,
  issuesPrevious = 0,
  followersPrevious = 0,
  images,
  description,
  slug,
}) => {
  const stats = {
    stars,
    starsPrevious,
    issues,
    issuesPrevious,
    forks,
    forksPrevious,
    followers,
    followersPrevious,
  }

  return (
    <Link to={`/projects/${slug}`} className="card">
      <div className={`tag ${openSource ? '' : 'proprietary'}`}>
        {openSource ? 'open source' : null}
      </div>
      {images ? <img className="photos-inside" src={photos}/> : null}
      <h4 className="title">{title}</h4>
      <OpenSourceStats {...stats}/>
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
