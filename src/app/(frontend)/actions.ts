'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { equal } from 'assert';

// Get the Payload instance (cached after the first call)
const getClient = () => getPayload({ config })

export async function addTodo(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const priority = String(formData.get('priority'))
  if (priority !== 'low' && priority !== 'medium' && priority !== 'high') return
  if (!title) return

  const payload = await getClient()
  await payload.create({
    collection: 'todos',
    data: { title, priority }
  })

  // Tell Next.js the home page data changed, so it re-renders with the new todo
  revalidatePath('/')
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get('id'))
  const completed = formData.get('completed') === 'true'

  const payload = await getClient()
  await payload.update({
    collection: 'todos',
    id,
    data: { completed: !completed },
  })

  revalidatePath('/')
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get('id'))
  const payload = await getClient()
  await payload.delete({
    collection: 'todos',
    id,
  })

  revalidatePath('/')
}
export async function changePriority(formData: FormData) {
    const id = Number(formData.get('id'))
    const priority = formData.get('priority')
    if (!id) return
    if (priority !== 'low' && priority !== 'medium' && priority !== 'high') return

    const payload = await getClient()
    await payload.update({
      collection: 'todos',
      id,
      data: { priority: priority }
    })

    revalidatePath('/')
  }

  export async function clearCompleted() {
    const payload = await getClient()
    await payload.delete({
      collection: 'todos',
      where: { completed: { equals: true}}
    })
    revalidatePath('/')
  }
