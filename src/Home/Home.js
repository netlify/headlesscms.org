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
`

class Home extends React.Component {
  state = {
    filter: {
      license: 'Open source',
    },
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
      <RouteData render={({ types = [], generators = [], projects = [] }) => {
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
            <ul className="projects">
              {visibleProjects.map(project =>
                <li className="project">
                  <Project key={project.slug} { ...project }/>
                </li>
              )}
            </ul>
          </div>
        );
      }}/>
    )
  }
}

export default Home;
