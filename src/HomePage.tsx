import * as React from "react"
import {Link} from "react-router-dom"

export function HomePage() {
  return <div>
    Home <Link to="/users">Got to Users</Link>
  </div>
}