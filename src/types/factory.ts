import { I_Style, I_Styled } from "./types";

export function createStyled<T>(value: T, style: I_Style): I_Styled<T> {
	return {
		style: style || {},
		value: value
	}
}

// export function createStyled<T>(value: T): I_Styled<T> {
// 	if (value["style"] === undefined && value["value"] === undefined)
// 		return { style: {}, value: value }
// }

