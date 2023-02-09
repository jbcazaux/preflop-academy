import { AppTheme } from 'styled-components'

const style: AppTheme = {
  borderRadius: '5px',
  breakpoints: {
    mobile: 420,
    tablet: 768,
    desktop: 1200,
    min: {
      mobile: 'min-width: 420px',
      tablet: 'min-width: 768px',
      desktop: 'min-width: 1200px',
    },
    max: {
      mobile: 'max-width: 420px',
      tablet: 'max-width: 768px',
      desktop: 'max-width: 1200px',
    },
  },
  colors: {
    primary: '#93B7BE',
    secondary: '#F7D488',
    background: '#F7F1F7',
    black: '#222',
    white: '#D5E2E3',
    buttons: {
      default: '#D5E2E3',
    },
    deck: {
      diamond: 'red',
      heart: 'red',
      club: 'black',
      spade: 'black',
    },
    loader: {
      background: '#D5E2E3',
      color: '#3498DB',
    },
    menu: {
      menu1: '#de004e',
      menu2: '#860029',
      menu3: '#321450',
      menu4: '#d40078',
      menu5: '#f6019d',
    },
    range: {
      active: '#FE5F55',
      suited: '#2DDAEE',
      offsuit: 'pink',
      selected: '#d40078',
    },
    table: {
      board: '#58BD86',
      border: '#4C4949',
      button: '#E8F63C',
      action: '#de004e',
    },
  },
}

export default style
