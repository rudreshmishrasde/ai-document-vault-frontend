import { useState, useEffect } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'

export const useIsMobile = (): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}

export const useIsTablet = (): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('lg'))
}

