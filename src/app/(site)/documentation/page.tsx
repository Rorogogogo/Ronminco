import { Documentation } from '@/app/components/documentation/Documentation'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Documentation | “Ronminco',
}

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  )
}
