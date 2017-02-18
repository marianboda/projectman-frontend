import React from 'react'
import { Link } from 'redux-little-router'

const Header = (props) => (
  <div className="App-header">
    <h2>PROJECTMAN</h2>
    <Link href="/tasks">Tasks</Link>&nbsp;
    <Link href="/projects">Projects</Link>
  </div>
)

export default Header
