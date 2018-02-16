import React from 'react'
import { RouteData } from 'react-static'
import Project from './Project'

const Dropdown = ({ name, emptyLabel, options }) => {
  return (
    <div className="dropdown">
      <select name={name} className="dropdown-select">
        {emptyLabel ? <option value="" selected>{emptyLabel}</option> : null}
        {Object.entries(options).map(([ key, value ]) =>
          <option key={key} value={key}>{value}</option>
        )}
      </select>
    </div>
  );
};

const Home = props =>
  <RouteData render={({ types = [], generators = [], licenses = [], sorts = [], projects = [] }) => {
    return (
      <div className="main landing">
        <div className="projects-sort-filter-toolbar">
          <div className="projects-filters">
            <div>Filter:</div>
            <Dropdown name="filter-by-type" emptyLabel="Any CMS Type" options={types}/>
            <Dropdown name="filter-by-generator" emptyLabel="Any SSG" options={generators}/>
            <Dropdown name="filter-by-license" emptyLabel="Any License" options={licenses}/>
          </div>
          <div className="projects-sort">
            <div>Sort:</div>
            <Dropdown name="sort" options={sorts}/>
          </div>
        </div>
        <h2 className="cards-header">Open Source</h2>
        <h2 className="cards-header">Closed Source</h2>
        <ul className="projects">
          {projects.map(project => <Project {...project}/>)}
        </ul>
      </div>
    );
  }}/>

export default Home;
