import { createContext, ReactNode, useState } from "react";
import { createWindowServices } from "../types/factory-from-data";
import { WindowServices } from "../types/types";

export const WindowServicesContext = createContext<WindowServices>(createWindowServices())
export const WindowServicesContextSetter = createContext((vb: WindowServices) => { })

export default function (props: { children: ReactNode }) {
	const [viewBox, setWindowServices] = useState<WindowServices>(createWindowServices())

	const setterFn = (vb: WindowServices) => {
		setWindowServices(vb)
	}

	return (
		<WindowServicesContext.Provider value={viewBox}>
			<WindowServicesContextSetter.Provider value={setterFn}>
				{props.children}
			</WindowServicesContextSetter.Provider>
		</WindowServicesContext.Provider>
	)
}
