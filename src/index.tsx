import * as React from "react"
import ReactDOM from "react-dom"
import {Router} from "react-router-dom"
import {createBrowserHistory} from "history"
import {Route, Switch} from "react-router"
import {HomePage} from "./HomePage"
import {UsersPage} from "./UsersPage"
import {Navigation} from "./Navigation"
import {GroupsPage} from "./GroupsPage"

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Navigation/>

    <Switch>
      <Route path="/users" component={UsersPage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
