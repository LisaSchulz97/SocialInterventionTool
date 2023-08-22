/* eslint-disable */
import { Box } from '@chakra-ui/react'
import { Form as FormikForm, Formik, FormikConfig } from 'formik'
import { ReactNode } from 'react'

interface Props extends FormikConfig<any> {
  children: ReactNode
}

export const Form = ({ children, ...rest }: Props) => {
  return (
    <Box
      w='full'
      sx={{ '& > form': { w: 'full' } }}
    >
      <Formik {...rest}>
        <FormikForm>{children}</FormikForm>
      </Formik>
    </Box>
  )
}
