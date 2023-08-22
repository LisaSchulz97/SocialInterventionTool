import { Button, ButtonProps } from '@chakra-ui/react'
import { useFormikContext } from 'formik'

interface Props extends ButtonProps {
  isUppercase?: boolean
}

export const SubmitButton = ({ children, isUppercase, ...rest }: Props) => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button
      type='submit'
      color='white'
      borderRadius='28px'
      border='none'
      backgroundColor='bgDark'
      _hover={{ backgroundColor: 'primary', color: 'white' }}
      isLoading={isSubmitting}
      isDisabled={isSubmitting}
      textTransform={isUppercase ? 'uppercase' : 'none'}
      {...rest}
    >
      {children}
    </Button>
  )
}
