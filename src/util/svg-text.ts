export const wholeWordsMultilineText = (text: string, lineLength: number): string[] => {
	const result: string[] = []
	let startPos = 0
	let endPos = lineLength;
	while (endPos < text.length - 1) {
		const brFound = text.substring(startPos, endPos + 1).indexOf("\n")
		if (brFound > -1)
			endPos = startPos + brFound
		else if (text[endPos] != " " || text[endPos + 1] != " ")
			endPos = text.lastIndexOf(" ", endPos)

		result.push(text.substring(startPos, endPos))
		if (endPos == startPos) throw new Error("OVERFLOW: There are words that exceed the criteria.")
		startPos = endPos + 1

		endPos += lineLength

	}
	result.push(text.substring(endPos - lineLength))

	return result

}