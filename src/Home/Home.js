import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { partial, sortBy, reverse, find, difference, filter, get, isString } from 'lodash'
import Project from './Project'

const SORT_GROUPS = [
  { name: 'trending', label: 'Trending' },
  { name: 'total', label: 'Total' },
]

const SORTS = [
  { name: 'title', label: 'Title' },
  { name: 'stars', label: 'GitHub stars', group: 'total', reverse: true },
  { name: 'followers', label: 'Twitter followers', group: 'total', reverse: true },
  {
    name: 'starsTrending',
    label: 'GitHub stars (7 days)',
    group: 'trending',
    reverse: true,
    filterBy: 'stars',
    compute: p => p.stars - (p.starsPrevious || 0),
  },
  {
    name: 'followersTrending',
    label: 'Twitter followers (7 days)',
    group: 'trending',
    reverse: true,
    filterBy: 'followers',
    compute: p => p.followers - (p.followersPrevious || 0),
  },
]

const Dropdown = ({ emptyLabel, options, groups, selection, onChange }) => (
  <div className="dropdown">
    <select value={selection} className="dropdown-select" onChange={onChange}>
      {emptyLabel && <option value="">{emptyLabel}</option>}
      {options.filter(opt => isString(opt) || !opt.group).map((value, key) =>
        isString(value)
          ? <option key={key} value={value}>{value}</option>
          : <option key={key} value={value.name}>{value.label}</option>
      )}
      {groups && groups.map((group, idx) => (
        <optgroup key={idx} label={group.label}>
          {options.filter(opt => get(opt, 'group') === group.name).map((value, key) =>
            <option key={key} value={value.name}>{value.label}</option>
          )}
        </optgroup>
      ))}
    </select>
  </div>
)

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

  @media (min-width: 700px) {
    padding: 0;
  }
`

const StaticGenPromo = () => (
  <li className="project staticgen-promo">
    <h3>
      Also visit
      <a href="https://www.staticgen.com" rel="noopener noreferrer" target="_blank">staticgen.com</a>
      for a ranked list of open source static site generators!
    </h3>
  </li>
)

const ProjectCard = ({ project }) => (
  <li className="project">
    <Project key={project.slug} {...project} />
  </li>
)

const withStaticGenPromo = arr => {
  arr.splice(3, 0, <StaticGenPromo key="static-gen-promo" />)
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
  const shouldUseLicenseSections = !filter.license && sort.startsWith('stars')

  if (shouldUseLicenseSections) {
    const openSourceProjects = projects.filter(({ openSource }) => openSource)
    const closedSourceProjects = projects.filter(({ openSource }) => !openSource)

    return (
      <div>
        <ClearfixYesThisIsReallyHappening>
          <LicenseSectionHeader>Open source</LicenseSectionHeader>
          <ul className="projects">
            {withStaticGenPromo(openSourceProjects.map(project =>
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </ClearfixYesThisIsReallyHappening>
        <ClearfixYesThisIsReallyHappening>
          <LicenseSectionHeader>Closed source</LicenseSectionHeader>
          <ul className="projects">
            {closedSourceProjects.map(project =>
              <ProjectCard key={project.slug} project={project} />
            )}
          </ul>
        </ClearfixYesThisIsReallyHappening>
      </div>
    )
  }

  return (
    <div>
      <ul className="projects">
        {withStaticGenPromo(projects.map(project =>
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </div>
  )
}

class Home extends React.Component {
  state = {
    filter: {},
    sort: 'starsTrending',
  }

  canShow = project => {
    const { license, ssg, type } = this.state.filter
    const shouldHide = (license === 'Open source' && !project.openSource)
      || (license === 'Closed source' && project.openSource)
      || (ssg && (!project.generators.includes(ssg) && !project.generators.includes('All')))
      || (type && project.type !== type)
    return !shouldHide
  }

  sort = projects => {
    const { sort } = this.state
    const sortObj = find(SORTS, { name: sort }) || {}
    const sorted = sortBy(projects, sortObj.compute || sortObj.name)

    if (sortObj.reverse) {
      const withSort = filter(sorted, sortObj.filterBy || sortObj.name)
      const withoutSort = difference(sorted, withSort)
      return [...reverse(withSort), ...withoutSort]
    }

    return sorted
  }

  filter = projects => projects.filter(this.canShow)

  handleFilterChange = (filter, event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [filter]: event.target.value,
      },
    })
  }

  handleSortChange = event => {
    this.setState({ sort: event.target.value })
  }

  render () {
    const { type, ssg, license } = this.state.filter
    const { sort } = this.state
    const licenses = ['Open source', 'Closed source']
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
                  options={SORTS}
                  groups={SORT_GROUPS}
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
        )
      }} />
    )
  }
}

export default Home
