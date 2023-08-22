import { useRouter } from 'next/router'
import { Link } from '../wrappers'
import { LinkProps } from '@chakra-ui/react'

interface NavItemProps extends LinkProps {
  href: string
  children: React.ReactNode
  isMobile?: boolean
}

export const NavLink = ({ children, href, isMobile }: NavItemProps) => {
  const { asPath } = useRouter()
  const isActive = asPath.includes(href)

  return (
    <Link
      href={href}
      color={isActive ? 'primary' : isMobile ? 'white' : 'gray.500'}
      fontWeight='bold'
      background={isActive ? 'primaryLight' : 'transparent'}
      padding={3}
      borderRadius='md'
    >
      {children}
    </Link>
  )
}
