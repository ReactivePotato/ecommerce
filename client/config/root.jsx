import React, { useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import DummyView from '../components/dummy-view'
import NotFound from '../components/404'
import MainPage from '../components/mainpage'
import RepoList from '../components/repolist'
import RepoDesc from '../components/repodesc'
import StoreMainPage from '../pages/storemainpage'
import Basket from '../pages/basket'
import Logs from '../pages/logs'

import Startup from './startup'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)
  const func = (props) => {
    if (!!user && !!user.name && !!token) <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)

  const func = (props) => {
    if (!!user && !!user.name && !!token) return <Component {...props} />

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  const [userName, setUserName] = useState('')

  const onButtonPush = (val) => {
    setUserName(val)
  }

  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/basket" component={() => <Basket />} />
            <Route exact path="/logs" component={() => <Logs />} />
            <Route exact path="/main" component={() => <MainPage onClickEvent={onButtonPush} />} />
            <Route exact path="/store" component={() => <StoreMainPage />} />
            <Route
              exact
              path="/:userName"
              component={() => <RepoList userInputName={userName} />}
            />
            <Route exact path="/:userName/:repositoryName" component={RepoDesc} />
            <PrivateRoute exact path="/hidden-route" component={DummyView} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={DummyView} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
