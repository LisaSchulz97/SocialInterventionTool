import {
  Box,
  HStack,
  IconButton,
  Image,
  Stack,
  useDisclosure,
  useMediaQuery,
  useOutsideClick,
  useTheme,
} from '@chakra-ui/react'
import { LangSwitcher, NavLink } from '.'
import { Button, Link } from '../wrappers'
import { FiMenu } from 'react-icons/fi'

import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ConsultingCenterIcon, Logo, NotificationIcon, PatientsIcon, ReportsIcon } from '@/icons'

interface navLinks {
  name: JSX.Element
  href: string
}

interface Props {
  navlinks: navLinks[]
}

export const Header = () => {
  const { breakpoints } = useTheme()
  const isDesktopAndSmaller = useMediaQuery(`(max-width: ${breakpoints.lg})`)[0]

  const navLinks = [
    {
      name: (
        <>
          <PatientsIcon mr={2} /> Patienten
        </>
      ),
      href: '/dashboard/patients',
    },
    {
      name: (
        <>
          <ConsultingCenterIcon mr={2} /> Beratungsstellen
        </>
      ),
      href: '/dashboard/consulting-centers',
    },
    {
      name: (
        <>
          <ReportsIcon mr={2} /> Überischt
        </>
      ),
      href: '/dashboard/reports',
    },
  ]

  if (isDesktopAndSmaller) {
    return <MobileNavigation navlinks={navLinks} />
  }

  return (
    <HStack
      as='header'
      py={8}
      background='white'
      align='center'
      px={{ base: 6, md: 40 }}
      boxShadow='lg'
      position='fixed'
      width='full'
    >
      <Link href='/'>
        <Logo
          w={12}
          h={12}
        />
      </Link>

      <HStack
        gap={12}
        mx='auto'
      >
        {navLinks.map(({ name, href }, index) => (
          <NavLink
            key={index}
            href={href}
          >
            {name}
          </NavLink>
        ))}
      </HStack>

      <HStack gap={4}>
        <IconButton
          isRound
          variant='ghost'
          aria-label='notification icon'
          fontSize='3xl'
          icon={
            <>
              <NotificationIcon />
              <Box
                as='span'
                pos='absolute'
                top='-1px'
                right='-1px'
                p='4px'
                fontSize='xs'
                fontWeight='bold'
                lineHeight='none'
                color='red.100'
                transform='translate(50%,-50%)'
                bg='red.600'
                rounded='full'
              />
            </>
          }
        />
        <Button
          variant='isSecondary'
          size='md'
        >
          Logout
        </Button>
      </HStack>
    </HStack>
  )
}

const MobileNavigation = ({ navlinks }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const navRef = useRef(null)

  useOutsideClick({
    ref: navRef,
    handler: () => onClose(),
  })

  return (
    <HStack
      as='header'
      py={12}
      background='white'
      width='full'
      px={{ base: 0, md: 40 }}
    >
      <HStack
        gap={4}
        width='full'
        justify='space-around'
        align='baseline'
      >
        <LangSwitcher />
        <Link href='/'>
          <Image
            src='/images/logo.png'
            alt='logo'
            width={200}
          />
        </Link>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <Stack
              as={motion.div}
              bg='bgDark'
              position='absolute'
              justify='center'
              align='center'
              py={16}
              gap={12}
              margin='auto'
              top={40}
              right={0}
              left={0}
              width='90%'
              zIndex='23'
              borderRadius={12}
              initial={{ translateY: '-100%' }}
              animate={{ translateY: 0 }}
              exit={{ translateY: '-100%' }}
            >
              {navlinks.map(({ name, href }, index) => (
                <NavLink
                  key={index}
                  href={href}
                  isMobile
                >
                  {name}
                </NavLink>
              ))}
            </Stack>
          ) : null}
        </AnimatePresence>
      </HStack>
    </HStack>
  )
}
