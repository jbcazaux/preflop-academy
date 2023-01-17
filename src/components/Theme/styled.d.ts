import 'styled-components'

declare module 'styled-components' {
  export interface AppTheme {
    borderRadius: string
    breakpoints: {
      min: {
        mobile: string
        tablet: string
        desktop: string
      }
      max: {
        mobile: string
        tablet: string
        desktop: string
      }
    }
    colors: {
      primary: string
      secondary: string
      background: string
      black: string
      buttons: {
        default: string
      }
      deck: {
        inHand: string
        onBoard: string
      }
      loader: {
        background: string
        color: string
      }
      menu: {
        menu1: string
        menu2: string
        menu3: string
        menu4: string
        menu5: string
      }
      range: {
        active: string
        suited: string
        offsuit: string
        selected: string
      }
      table: {
        board: string
        stroke: string
        button: string
        action: string
      }
    }
  }
}
