import * as React from "react"
import {useSubscription} from "./gqless"

export function App() {
  const subscription = useSubscription()

  return <div>{subscription.usersList[0].name}</div>
}