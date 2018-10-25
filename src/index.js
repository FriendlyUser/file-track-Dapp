import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { DrizzleProvider } from 'drizzle-react'

import App from './App'
// layouts
import HomeContainer from './layouts/home/HomeContainer'
import DashboardContainer from './layouts/dashboard/DashboardContainer'
<<<<<<< HEAD
import SearchContainer from './layouts/search/SearchContainer'
=======
>>>>>>> f4034bba9930de376c219ece7dabe3e5336ef6fd
// components
import LoadingContainer from './components/LoadingContainer'
import FileTable from './components/FileTable'

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history} store={store}>
          <App>
             <Route exact path= '/' component={HomeContainer}/>
             <Route exact path="/dashboard" component={DashboardContainer} />
             <Route exact path="/search" component={SearchContainer} />
             <Route path="/users/:id" 
               render={({match}) => <FileTable fileOwnerAddress={match.params.id}/>} />
          </App>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
