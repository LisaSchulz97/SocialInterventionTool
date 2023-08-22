import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useField } from 'formik'

interface Props extends ChakraFormControlProps {
  name: string
  helpText?: string
}

export const FormControl = ({ name, children, helpText, ...rest }: Props) => {
  const [, { error, touched }] = useField(name)

  const isInvalid = !!error && touched

  return (
    <ChakraFormControl
      id={name}
      isInvalid={isInvalid}
      {...rest}
    >
      {children}
      {isInvalid ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        helpText && <FormHelperText>{helpText}</FormHelperText>
      )}
    </ChakraFormControl>
  )
}
