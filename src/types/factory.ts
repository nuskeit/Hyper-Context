import { I_Style, I_Styled } from "./types";

export function createStyled<T>(value: T, style: I_Style): I_Styled<T> {
	return {
		style: {},
		value: value
	}
}
