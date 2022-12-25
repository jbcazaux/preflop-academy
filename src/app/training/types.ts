import Hand from 'domain/hand'
import Action from 'domain/action'

export type Play = {
  hand: Hand
  actions: ReadonlyArray<Action>
}

export type Distribution = { [key: string]: number }
