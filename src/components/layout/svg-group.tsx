
export default function ({
	children,
	className,
	x,
	y
}: {
	children: any
	className: string
	x: string | number
	y: string | number
}) {
	return (
		<g calcMode={className} transform={`translate(${x}, ${y})`} > {children}</g>
	)
}



function svgGroup ({
	children,
	className,
	x,
	y
}: {
	children: any
	className: string
	x: string | number
	y: string | number
}) {
	return (
		<g calcMode={className} transform={`translate(${x}, ${y})`} > {children}</g>
	)
}
