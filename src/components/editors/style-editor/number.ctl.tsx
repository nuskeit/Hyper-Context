
function NumberCtl({
	value,
	onChange,
	min,
	max,
	step
}: {
	value: number
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	min?: number
	max?: number
	step?: number
}) {


	return (
		<input type="number" value={value} min={min} max={max} step={step} onChange={onChange} />
	)
}

export default NumberCtl