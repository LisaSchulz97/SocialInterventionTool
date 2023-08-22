import { Box } from '@chakra-ui/react'
import { Header } from '.'
import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            transition='.3s ease'
            paddingTop={40}
            paddingBottom={10}
            px={{ base: 4, lg: 10 }}
          >
            {children}
          </Box>
        </motion.main>
      </AnimatePresence>
    </>
  )
}
