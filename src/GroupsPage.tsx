import * as React from "react"
import {useSubscription} from "./gqless"

export function GroupsPage() {
  const subscription = useSubscription()

  return <div>Groups: {subscription.groups[0].name}</div>
}