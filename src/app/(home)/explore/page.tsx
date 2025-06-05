import { Metadata } from 'next'
import { ExploreClient } from './explore-client'

export const metadata: Metadata = {
  title: 'Explorar',
}

export default function Explorer() {
  return <ExploreClient />
}
