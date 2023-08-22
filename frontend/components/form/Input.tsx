import { FormLabel, Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { useField } from 'formik'
import { FormControl } from '.'

interface InputFieldProps extends InputProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
}

export const Input = ({ type, label, placeholder, name, ...rest }: InputFieldProps) => {
  const [field] = useField(name)

  return (
    <FormControl name={name}>
      {label && <FormLabel mb={0}>{label}</FormLabel>}

      <ChakraInput
        {...field}
        type={type}
        variant='flushed'
        placeholder={placeholder}
        _placeholder={{ color: 'primary' }}
        focusBorderColor='bgCream'
        color='primary'
        {...rest}
      />
    </FormControl>
  )
}
