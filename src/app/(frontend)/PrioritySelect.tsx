'use client' // this component's JS ships to the browser

import { changePriority } from './actions'

type Props = { id: number; priority: string }

export default function PrioritySelect({ id, priority }: Props) {
  return (
    <form action={changePriority}>
      <input type="hidden" name="id" value={id} />
      <select
        name="priority"
        defaultValue={priority}
        // When the value changes, submit the surrounding form:
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      >
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>
    </form>
  )
}