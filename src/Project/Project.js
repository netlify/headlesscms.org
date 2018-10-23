import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { EntypoHome, EntypoTwitter, EntypoGithub } from 'react-entypo'

const EntypoIcon = styled(({ Icon, className }) =>
  <Icon className={className} />
)`
  position: relative;
  top: 1px;
`

const DetailLink = styled.div`
  display: inline-block;
  white-space: nowrap;
  margin-right: 18px;
`

const SiteGenerators = styled.div`
  margin: 20px 0 28px;

  .title {
    font-weight: 700;
    margin-right: 12px;
  }
`

const Project = () => (
  <RouteData render={({
    title,
    repo,
    homepage,
    openSource,
    generators = [],
    stars,
    followers,
    images,
    twitter,
    content,
  }) => (
    <div className="main">
      <div className="sheet">
        {openSource && <div className="tag">open source</div>}
        <h1>{title}</h1>

        <div className="links">
          <DetailLink>
            <a href={homepage}><EntypoIcon Icon={EntypoHome} /> {homepage}</a>
          </DetailLink>
          {twitter &&
            <DetailLink>
              <a href={`https://twitter.com/${twitter}`}><EntypoIcon Icon={EntypoTwitter} /> {twitter} ({followers})</a>
            </DetailLink>
          }
          {repo &&
            <DetailLink>
              <a href={`https://github.com/${repo}`}><EntypoIcon Icon={EntypoGithub} /> https://github.com/{repo} ({stars})</a>
            </DetailLink>
          }
        </div>

        <SiteGenerators>
          <span className="title">Supported Site Generators:</span>
          <span>{generators.join(', ')}</span>
        </SiteGenerators>

        {images &&
          <div className="images">
            {images.map(({ path }) => <img alt="" src={path} className="responsive" />)}
          </div>
        }

        <div className="text">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )} />
)

export default Project
