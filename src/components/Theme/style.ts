import { AppTheme } from 'styled-components'

const style: AppTheme = {
  borderRadius: '5px',
  breakpoints: {
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
    primary: '#2DDAEE',
    secondary: 'pink',
    background: '#F7F1F7',
    black: '#222',
    buttons: {
      default: '#D5E2E3',
    },
    deck: {
      inHand: 'green',
      onBoard: 'red',
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
      active: '#97DE5D',
      suited: '#0CF9DF',
      offsuit: '#F9E00C',
    },
    table: {
      board: '#58BD86',
      stroke: '#4C4949',
      button: '#E8F63C',
      action: '#de004e',
    },
  },
}

export default style
