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

const OpenSourceStat = styled(({
  Icon,
  value,
  change,
  indicateColor,
  label,
  dataAgeInDays,
  className,
}) => {
  const disabled = typeof value !== 'number'
  const changeValue = parseFloat(change, 10) > 0 ? `+${change}` : change

  return (
    <div title={label} className={`${className} ${disabled ? 'disabled' : ''}`}>
      <OpenSourceStatIcon>
        <Icon />
      </OpenSourceStatIcon>
      {disabled ? <div>N/A</div> : (
        <div>
          <strong>{value}</strong>
          {dataAgeInDays >= 1 &&
            <OpenSourceStatChange
              title={`${label} in the last ${dataAgeInDays} day${dataAgeInDays === 1 ? '' : 's'}`}
              indicateColor={indicateColor}
            >
              {changeValue === 0 ? '--' : changeValue}
            </OpenSourceStatChange>
          }
        </div>
      )}
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
  <EntypoTwitter className={className} />
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
  dataAgeInDays,
  className,
}) => (
  <div className={className}>
    <OpenSourceStat
      Icon={() => <Octicon name="star" zoom="100%" />}
      label="GitHub stars"
      value={stars}
      change={stars - starsPrevious}
      indicateColor
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="issue-opened" zoom="100%" />}
      label="GitHub open issues"
      value={issues}
      change={issues - issuesPrevious}
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="repo-forked" zoom="100%" />}
      label="GitHub forks"
      value={forks}
      change={forks - forksPrevious}
      indicateColor
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <TwitterIcon />}
      label="Twitter followers"
      value={followers}
      change={followers - followersPrevious}
      indicateColor
      dataAgeInDays={dataAgeInDays}
    />
  </div>
))`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fcfcfc;
  padding: 18px;
  margin: 16px -18px 0;
  display: flex;
`

const Project = styled(({
  title,
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
  dataAgeInDays,
  className,
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
    dataAgeInDays,
  }

  return (
    <Link to={`/projects/${slug}`} className={`card ${className}`}>
      <div className={`tag ${openSource ? '' : 'proprietary'}`}>
        {openSource && 'open source'}
      </div>
      {images && <img alt="" className="photos-inside" src={photos} />}
      <h4 className={`title ${title.length > 14 ? 'title-small' : ''}`}>{title}</h4>
      <OpenSourceStats {...stats} />
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
})`
  .title-small {
    font-size: 24px;
    padding-top: 7px !important;
    padding-bottom: 10px !important;
  }
`

export default Project
