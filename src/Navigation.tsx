import {Link} from "react-router-dom"
import * as React from "react"

export function Navigation() {
  return <div>
      <Link to="/">Home</Link>
        &nbsp;|&nbsp;
      <Link to="/users">Users</Link>
        &nbsp;|&nbsp;
      <Link to="/groups">Groups</Link>
    </div>
}