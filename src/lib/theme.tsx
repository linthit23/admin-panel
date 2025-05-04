import { Button, createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Poppins',
  primaryColor: 'primary',
  primaryShade: 4,
  colors: {
    primary: [
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
      '#99e9ff',
    ],
  },
  components: {
    Button: Button.extend({
      defaultProps: { classNames: { label: 'text-gray-700' } },
    }),
  },
})
