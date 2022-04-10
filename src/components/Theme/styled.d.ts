import 'styled-components'

declare module 'styled-components' {
  export interface AppTheme {
    borderRadius: string

    colors: {
      primary: string
      secondary: string
      loader: {
        background: string
        color: string
      }
      range: {
        active: string
        suited: string
        offsuit: string
      }
      buttons: {
        default: string
      },
      table: {
        board: string
        stroke: string
        button: string
        action: string
      },
      deck: {
        inHand: string
        onBoard: string
      }
    }
  }
}
