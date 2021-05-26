import * as React from "react"
import {useSubscription} from "./gqless"

export function UsersPage() {
  const subscription = useSubscription()

  return <div>Users: {subscription.users[0].name}</div>
}