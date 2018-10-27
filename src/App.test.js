import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import { LoadingContainer } from 'drizzle-react-components'

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history} store={store}>
          <Route exact path='/' component={App} />
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
    , div)
})
