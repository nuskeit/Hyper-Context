import { ChangeEventHandler } from "react"

export default function TextCtl(
	{
		value,
		onChange
	}: {
		value: string | number
		onChange: ChangeEventHandler<HTMLInputElement>
	}
) {



	return (
		<input type="text" value={value} onChange={onChange} />
	)
}