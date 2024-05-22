import { I_Hashtable, I_Size2, I_Style, I_Vector2, SystemMode } from "../types/types"

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
export function getStylePropValue<T>(s: I_Style, prop: string, defaultValue: T, omitValues?: any[]): T {
	if (Object.hasOwn(s, prop)) {
		const val = (s as any)[prop]
		if (omitValues === undefined)
			return val
		else
			if (omitValues.find(e => e === val) === undefined)
				return val
	}
	return defaultValue
}

export function ifExists<T>(o: object, fieldName: string, defaultValue: T): T {
	if (Object !== undefined && Object.hasOwn(o, fieldName))
		return (o as any)[fieldName]
	return defaultValue
}


export function cssJsonToJs(cssJson: any): any {
	if (cssJson === undefined) return {}
	const r: I_Hashtable<any> = {}

	Object.keys(cssJson).forEach((key: any) => {
		r[formatKey(key)] = cssJson[key]
	});
	return r
}


function formatKey(k: string): string {
	const split = k.split("-")
	split.forEach((e, i) => {
		if (i > 0)
			split[i] = e.substring(0, 1).toUpperCase() + e.substring(1)
	})
	return split.join("")
}

function formatKey2(k: string): string {
	let kr = ""
	let i = k.indexOf("-")
	if (i == -1) return k
	kr = k.substring(0, i)
	const r = k.substring(i + 1).split("-").reduce((p, c) => {
		return p += c.substring(0, 1).toUpperCase() + c.substring(1)
	}, kr)

	return r
}


export function centeredLayout(l: I_Vector2 & I_Size2): I_Vector2 & I_Size2 {
	return {
		width: l.width,
		height: l.height,
		x: (l.width / 2),
		y: (l.height / 2)
	}
}


export function generateNewKey(): string {
	// return Math.round(Math.random() * new Date().getTime()).toString()
	const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
		'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
		'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
	const base = (Date.now() + Math.round(Math.random() * 1000)).toString()
	let result = ""
	let count = Math.round(Math.random() * chars.length)
	base.split("").forEach((n, i) => {
		count += parseInt(n + i)
		result += chars[count % (chars.length - 1)]
	})
	return result
}


export function isEditMode(systemMode: SystemMode) {
	return systemMode === SystemMode.EDIT
}

export const isNumeric = (s: string) => /^[+-]?\d+(\.\d+)?$/.test(s)