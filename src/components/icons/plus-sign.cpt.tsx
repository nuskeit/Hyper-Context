import { getImgUrl } from "../../custom-hooks/use-images";

export default function ({ width, height }: { width: number, height: number }) {
	return <image className="icon-plus-sign" href={getImgUrl("icons/plus.png")} width={width} height={height} />
}