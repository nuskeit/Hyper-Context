import { useEffect, useState } from "react"

export default function ({ x = 0, y = 0, open = true, blink = false }:
	{ x?: number, y?: number, open?: boolean, blink?: boolean }) {

	const [isOpen, setIsOpen] = useState(open)

	useEffect(() => {
		let to = 0

		if (blink) {
			to = setTimeout(() => {
				setIsOpen(!isOpen)
			}, isOpen ? 5000 : 100)
		}

		return () => clearTimeout(to)
	}, [blink, isOpen])

	function eyeState() {
		if (isOpen)
			return (
				<>
					<path d="M-55 90 Q-35,65 0,65 35,65 55,90    35,115 0,115 -35,115 -55,90 Z " fill="#fff" stroke="none" strokeWidth={10}
						transform="translate(0, 20)" />

					<circle cx="0" cy="90" r="25" fill="#59d" stroke="#333" strokeWidth={3}
						transform="translate(0, 20)" />

					<circle cx="0" cy="90" r="10" fill="#333" stroke="none" strokeWidth={10}
						transform="translate(0, 20)" />

					<path d="M-55 90 Q-35,65 0,65 35,65 55,90    35,115 0,115 -35,115 -55,90 Z " fill="none" stroke="#333" strokeWidth={3}
						transform="translate(0, 20)" />
				</>
			)
		return (
			<>
				<path d="M55,90 Q35,105 0,105 -35,105 -55,90 " fill="none" stroke="#333" strokeWidth={6}
					transform="translate(0, 20)" />
			</>
		)
	}

	return (
		< svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin slice"
			x={x} y={y}>
			<g transform="translate(100)">
				<polygon points="0,0 100,130 -100,130" fill="#fd5" stroke="#333" strokeWidth={3}
					transform="translate(0, 20)" />
				{eyeState()}
			</g>
		</svg >
	)
}