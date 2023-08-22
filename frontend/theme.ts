import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: '#59C4BC',
    primaryLight: 'rgba(89, 196, 188, 0.12)',
    bgGrey: '#E2E2E2',
  },

  components: {
    Button: {
      baseStyle: {
        color: 'white',
        borderRadius: 'md',
        border: '1px solid',
        fontWeight: 'bold',
        py: 3,
      },
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
        },
        lg: {
          fontSize: 'lg',
          px: 12,
        },
      },
      variants: {
        isPrimary: {
          backgroundColor: 'primary',
          borderColor: 'primary',
          _hover: {
            backgroundColor: 'transparent',
            color: 'primary',
            border: '1px solid',
            borderColor: 'primary',
          },
        },
        isSecondary: {
          backgroundColor: 'bgGrey',
          borderColor: 'bgGrey',
          color: 'black',
          _hover: {
            backgroundColor: 'transparent',
            color: 'black',
            border: '1px solid',
            borderColor: 'bgGrey',
          },
        },
      },
      defaultProps: {
        size: 'md',
        variants: 'isPrimary',
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        scrollBehavior: 'smooth',
        overflowX: 'hidden',
      },
    },
  },
})
