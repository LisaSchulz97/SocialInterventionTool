import { FormLabel, Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'
import { useField } from 'formik'
import { FormControl } from '.'

interface Props extends TextareaProps {
  name: string
  type?: string
  label?: string
  placeholder?: string
}

export const TextArea = ({ label, placeholder, name, ...rest }: Props) => {
  const [field] = useField(name)

  return (
    <FormControl
      name={name}
      pt={4}
    >
      {label && <FormLabel mb={0}>{label}</FormLabel>}

      <ChakraTextarea
        type='text'
        placeholder={placeholder}
        _placeholder={{ color: 'primary' }}
        color='primary'
        variant='flushed'
        focusBorderColor='bgCream'
        size='lg'
        outline='none'
        transition='300ms all'
        mb={4}
        resize='none'
        {...field}
        {...rest}
      />
    </FormControl>
  )
}
