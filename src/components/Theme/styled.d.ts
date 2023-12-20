import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    breakpoints: {
      mobile: number
      tablet: number
      desktop: number
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
      white: string
      inHand: string
      onBoard: string
      buttons: {
        default: string
      }
      deck: {
        diamond: string
        heart: string
        club: string
        spade: string
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
        border: string
        button: string
        action: string
      }
    }
  }
}
