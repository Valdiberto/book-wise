'use client'

import { useState } from 'react'

export const useToggleShowMore = (text: string, maxLength: number) => {
  const safeText = text || ''
  const [showMore, setShowMore] = useState(safeText.length <= maxLength)

  const toggleShowMore = () => setShowMore((state) => !state)

  const displayedText = showMore
    ? safeText
    : safeText.slice(0, maxLength) + (safeText.length > maxLength ? '...' : '')

  return {
    text: displayedText,
    toggleShowMore,
    isShowingMore: showMore,
  }
}
