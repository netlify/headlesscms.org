import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { EntypoHome, EntypoTwitter, EntypoGithub } from 'react-entypo'

const EntypoIcon = styled(({ Icon, className }) =>
  <Icon className={className}/>
)`
  position: relative;
  top: 1px;
`


const SiteGenerators = styled.div`
  margin: 20px 0 28px;

  .title {
    font-weight: 700;
    margin-right: 12px;
  }
`

const Project = () =>
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
  }) =>
    <div className="main">
      <div className="sheet">

        {openSource ? <div className="tag">open source</div> : null}
        <h1>{title}</h1>

        <div className="links">
          <a href={homepage}><EntypoIcon Icon={EntypoHome}/> {homepage}</a>
          {!twitter ? null :
            <span>
              <span className="separator">|</span>
              <a href={`https://twitter.com/${twitter}`}><EntypoIcon Icon={EntypoTwitter}/> {twitter} ({followers})</a>
            </span>
          }
          {!repo ? null :
            <span>
              <span className="separator">|</span>
              <a href={`https://github.com/${repo}`}><EntypoIcon Icon={EntypoGithub}/> https://github.com/{repo} ({stars})</a>
            </span>
          }
        </div>

        <SiteGenerators>
          <span className="title">Supported Site Generators:</span>
          <span>{generators.join(', ')}</span>
        </SiteGenerators>

        {!images ? null :
          <div className="images">
            {images.map(({ path }) => <img src={path} className="responsive"/>)}
          </div>
        }

        <div className="text">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>

      </div>
    </div>
  }/>

export default Project
