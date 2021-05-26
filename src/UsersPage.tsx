import * as React from "react"
import {Link} from "react-router-dom"
import {useSubscription} from "./gqless"

export function UsersPage() {
  const subscription = useSubscription()

  return <div>Users: {subscription.usersList[0].name} <Link to="/">Back to home</Link></div>
}