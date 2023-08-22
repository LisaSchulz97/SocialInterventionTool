import useTranslation from 'next-translate/useTranslation'
import i18nConfig from '@/i18n.json'
import Select, { SingleValue } from 'react-select'
import setLanguage from 'next-translate/setLanguage'
import { useTheme } from '@chakra-ui/react'

export const LangSwitcher = () => {
  const { locales } = i18nConfig
  const { t, lang } = useTranslation()
  const chakraTheme = useTheme()

  const options = locales
    .filter(lng => lng !== lang)
    .map(lng => ({
      value: lng,
      label: t(lng?.toUpperCase()),
    }))

  const handleChange = async (newValue: SingleValue<{ value: string; label: string }>) => {
    await setLanguage(newValue?.value as string)
  }

  return (
    <Select
      styles={{
        control: provided => ({
          ...provided,
          background: 'white',
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            border: 'none',
          },
        }),
        singleValue: provided => ({
          ...provided,
          color: chakraTheme.colors.primary,
        }),
        option: provided => ({
          ...provided,
          color: chakraTheme.colors.primary,
          background: 'white',
          '&:hover': {
            background: chakraTheme.colors.primary,
            color: 'white',
          },
        }),
        indicatorSeparator: provided => ({
          ...provided,
          background: chakraTheme.colors.primary,
        }),
        dropdownIndicator: provided => ({
          ...provided,
          color: chakraTheme.colors.primary,
          '&:hover': {
            color: chakraTheme.colors.primary,
          },
        }),
      }}
      options={options}
      defaultValue={{ label: t(lang?.toUpperCase()), value: lang }}
      onChange={handleChange}
    />
  )
}
