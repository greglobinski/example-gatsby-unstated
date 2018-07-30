import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Subscribe } from 'unstated'
import CounterContainer from '../state/CounterContainer'

import Header from './header'
import './layout.css'

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}

          <Subscribe to={[CounterContainer]}>
            {counter => (
              <div
                style={{
                  margin: '20px 0 0 0',
                  padding: '10px 15px',
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <button onClick={() => counter.decrement()}>-</button>
                <span>Count: {counter.state.count}</span>
                <button onClick={() => counter.increment()}>+</button>
              </div>
            )}
          </Subscribe>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
