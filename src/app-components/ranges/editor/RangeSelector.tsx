interface Props {
  numberOfHands: number
  setNumberOfHands: (n: number) => void
}

const RangeSelector = ({ numberOfHands, setNumberOfHands }: Props) => (
  <>
    <datalist id="markers">
      {new Array(11).fill(false).map((_, i) => (
        <option value={17 * i} key={i} />
      ))}
    </datalist>
    <input
      type="range"
      min={0}
      max={170}
      step={1}
      list="markers"
      value={numberOfHands}
      onChange={e => setNumberOfHands(parseInt(e.target.value))}
    />
  </>
)

export default RangeSelector
