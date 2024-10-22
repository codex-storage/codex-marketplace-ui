import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/nodes')({
  component: () => <div>Hello /nodes!</div>,
})
