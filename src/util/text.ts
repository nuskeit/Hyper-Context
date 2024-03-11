export function padL(expression: string, len: number, char: string): string {
	return right(chr(char, len) + expression, len)
}

export function padR(expression: string, len: number, char: string): string {
	return left(expression + chr(char, len), len)
}

export function right(expression: string, len: number): string {
	return expression.substring(expression.length - len)
}

export function left(expression: string, len: number): string {
	return expression.substring(0, len)
}

export function chr(char: string, len: number): string {
	let result = ""
	while (result.length < len)
		result += char[0]

	return result
}