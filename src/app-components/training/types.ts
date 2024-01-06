import Action from 'domain/action'
import Hand from 'domain/hand'
import Position from 'domain/position'

export type Play = {
  heroPosition: Position
  hand: Hand
  actions: ReadonlyArray<Action>
}

export type Distribution = { [key: string]: number }
