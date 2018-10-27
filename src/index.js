import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { DrizzleProvider } from 'drizzle-react'

import App from './App'
// layouts
import HomeContainer from './layouts/home/HomeContainer'
import DashboardContainer from './layouts/dashboard/DashboardContainer'
import SearchContainer from './layouts/search/SearchContainer'
// components
import LoadingContainer from './components/LoadingContainer'
import FileTable from './components/FileTable'

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
          <App>
             <Route exact path= '/' component={HomeContainer}/>
             <Route exact path="/dashboard" component={DashboardContainer} />
             <Route exact path="/search" component={SearchContainer} />
             <Route path="/users/:id" 
               render={({match}) => <FileTable fileOwnerAddress={match.params.id}/>} />
          </App>
        </BrowserRouter>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
