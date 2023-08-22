import { ButtonProps, Button as ChakraButton, useStyleConfig } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends ButtonProps {
  variant?: 'isPrimary' | 'isSecondary'
  size?: 'md' | 'lg'
  children: ReactNode
}

export const Button = ({ variant, size, children, ...rest }: Props) => {
  const styles = useStyleConfig('Button', {
    size: size,
    variant: variant,
  })

  return (
    <ChakraButton
      height='auto'
      __css={styles}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}
