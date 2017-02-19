// @flow
import React from 'react'
import { Link } from 'redux-little-router'

const menuData = [
  {
    title: 'Tasks',
    href: '/tasks',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
]

class Header extends React.Component {
  render() {
    const { pathname } = this.props
    console.log('pathname', pathname)
    console.log('context', this.context)
    return (
      <div className="App-header">
        <h2>PROJECTMAN</h2>
        <div className="top-menu">
          {
            menuData.map(i => {
              const isCurrent = (i.href === pathname) || (pathname.indexOf(i.href) === 0)
              const className = isCurrent ? 'current' : ''
              console.log('className', className)
              return (
                <Link href={i.href} className={className}>{i.title}</Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Header
