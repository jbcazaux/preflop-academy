import { AppTheme } from 'styled-components'

const style: AppTheme = {
  borderRadius: '5px',
  colors: {
    primary: '#2DDAEE',
    secondary: 'pink',
    loader: {
      background: '#D5E2E3',
      color: '#3498DB',
    },
    range: {
      active: '#97DE5D',
      suited: '#0CF9DF',
      offsuit: '#F9E00C',
    },
    buttons: {
      default: '#D5E2E3',
    },
    table: {
      board: '#58BD86',
      stroke: '#4C4949',
      button: '#E8F63C',
      action: '#E34719',
    },
    deck: {
      inHand: 'green',
      onBoard: 'red',
    },
  },
}

export default style
