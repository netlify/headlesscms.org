import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { partial, sortBy, reverse, map, find, difference, filter } from 'lodash'
import Project from './Project'

const SORTS = [
  { field: 'stars', label: 'GitHub stars', reverse: true },
  { field: 'followers', label: 'Twitter followers', reverse: true },
  { field: 'title', label: 'Title' },
]

const Dropdown = ({ emptyLabel, options, selection, onChange }) => {
  return (
    <div className="dropdown">
      <select value={selection} className="dropdown-select" onChange={onChange}>
        {emptyLabel ? <option value="">{emptyLabel}</option> : null}
        {Object.entries(options).map(([ key, value ]) =>
          <option key={key} value={value}>{value}</option>
        )}
      </select>
    </div>
  );
};

const ControlLabel = styled.div`
  font-weight: 600;
  margin-left: 5px;
`

const LicenseSectionHeader = styled.h2`
  font-size: 32px;
  font-weight: 400;
  margin-left: 5px;
  margin-top: 48px;
  padding: 0 22px;
`

const StaticGenPromo = () =>
  <li className="project staticgen-promo">
    <h3>
      Also visit <a href="https://www.staticgen.com" target="_blank">staticgen.com</a>
      for a ranked list of open source static site generators!
    </h3>
  </li>

const ProjectCard = ({ project }) =>
  <li className="project">
    <Project key={project.slug} { ...project }/>
  </li>

const withStaticGenPromo = arr => {
  arr.splice(3, 0, <StaticGenPromo key="static-gen-promo"/>)
  return arr
}

const ClearfixYesThisIsReallyHappening = styled.div`
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

const Projects = ({ projects, filter, sort }) => {
  const shouldUseLicenseSections = !filter.license && sort === 'GitHub stars'

  if (shouldUseLicenseSections) {
    const openSourceProjects = projects.filter(({ openSource }) => openSource)
    const closedSourceProjects = projects.filter(({ openSource }) => !openSource)

    return (
      <div>
        <ClearfixYesThisIsReallyHappening>
          <LicenseSectionHeader>Open source</LicenseSectionHeader>
          <ul className="projects">
            {withStaticGenPromo(openSourceProjects.map(project =>
              <ProjectCard key={project.slug} project={project}/>
            ))}
          </ul>
        </ClearfixYesThisIsReallyHappening>
        <ClearfixYesThisIsReallyHappening>
          <LicenseSectionHeader>Closed source</LicenseSectionHeader>
          <ul className="projects">
            {closedSourceProjects.map(project => <ProjectCard key={project.slug} project={project}/>)}
          </ul>
        </ClearfixYesThisIsReallyHappening>
      </div>
    )
  }

  return (
    <div>
      <ul className="projects">
        {withStaticGenPromo(projects.map(project =>
          <ProjectCard key={project.slug} project={project}/>
        ))}
      </ul>
    </div>
  )
}

class Home extends React.Component {
  state = {
    filter: {},
    sort: SORTS[0].label,
  }

  canShow = (project) => {
    const { license, ssg, type } = this.state.filter
    const shouldHide = (license === 'Open source' && !project.openSource)
      || (license === 'Closed source' && project.openSource)
      || (ssg && (!project.generators.includes(ssg) && !project.generators.includes('All')))
      || (type && project.type !== type)
    return !shouldHide
  }

  getSort = label => {
    return find(SORTS, { label }) || {}
  }

  sort = projects => {
    const { sort } = this.state
    const sortObj = find(SORTS, { label: sort }) || {}
    const sorted = sortBy(projects, sortObj.field)

    if (sortObj.reverse) {
      const withSortField = filter(sorted, sortObj.field)
      const withoutSortField = difference(sorted, withSortField)
      return [ ...reverse(withSortField), ...withoutSortField ]
    }

    return sorted
  }

  filter = projects => {
    return projects.filter(this.canShow)
  }

  handleFilterChange = (filter, event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [filter]: event.target.value,
      }
    })
  }

  handleSortChange = event => {
    this.setState({ sort: event.target.value })
  }

  render() {
    const { type, ssg, license } = this.state.filter
    const { sort } = this.state
    const licenses = [ 'Open source', 'Closed source' ]
    const sorts = map(SORTS, 'label')
    return (
      <RouteData render={({ dataAgeInDays, types = [], generators = [], projects = [] }) => {
        const visibleProjects = this.sort(this.filter(projects))
        return (
          <div className="main landing">
            <div className="projects-sort-filter-toolbar">
              <div className="projects-filters">
                <ControlLabel>Filter</ControlLabel>
                <Dropdown
                  emptyLabel="Any CMS Type"
                  options={types}
                  selection={type}
                  onChange={partial(this.handleFilterChange, 'type')}
                />
                <Dropdown
                  emptyLabel="Any SSG"
                  options={generators}
                  selection={ssg}
                  onChange={partial(this.handleFilterChange, 'ssg')}
                />
                <Dropdown
                  emptyLabel="Any License"
                  options={licenses}
                  selection={license}
                  onChange={partial(this.handleFilterChange, 'license')}
                />
              </div>
              <div className="projects-sort">
                <ControlLabel>Sort</ControlLabel>
                <Dropdown
                  name="sort"
                  options={sorts}
                  selection={sort}
                  onChange={this.handleSortChange}
                />
              </div>
            </div>
            <h2 className="cards-header">Open Source</h2>
            <h2 className="cards-header">Closed Source</h2>
            <Projects
              dataAgeInDays={dataAgeInDays}
              projects={visibleProjects}
              filter={this.state.filter}
              sort={this.state.sort}
            />
          </div>
        );
      }}/>
    )
  }
}

export default Home;
