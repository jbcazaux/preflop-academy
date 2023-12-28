import Hand from 'domain/hand'
import Action from 'domain/action'
import Position from 'domain/position'

export type Play = {
  heroPosition: Position
  hand: Hand
  actions: ReadonlyArray<Action>
}

export type Distribution = { [key: string]: number }
