import { I_Style } from "types/types"

export function getEpoch(y: number, m: number, d: number): number {
	return new Date(y, m - 1, d).getTime() / 1000
}

export function getDate(epoch: number): Date {
	if (epoch < 9999999999)
		return new Date(epoch * 1000)
	return new Date(epoch)
}

export function getDateString(epoch: number): string {
	let d
	if (epoch < 9999999999)
		d = new Date(epoch * 1000)
	else
		d = new Date(epoch)
	return d.toLocaleDateString()
	// return padL(d.getDate().toString(),2,"0") + "-" + padL((d.getMonth() + 1).toString(), 2,"0") + "-" + d.getFullYear().toString()
}

/**
 * Get a value or default, of any implementation of I_Styled or I_Style
 */
export function getStylePropValue(s: I_Style, prop: string, defaultValue: any): any {
	if (Object.hasOwn(s, prop))
		return (s as any)[prop]
	return defaultValue
}