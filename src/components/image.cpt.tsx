import { FC, useEffect, useState } from "react"
import { getImgUrl } from "../custom-hooks/use-images"

interface ILoadingImg {
	url: string,
	width: number,
	height: number,
	classOk?: string,
	classError?: string,
	classLoading?: string
}


const LoadingImg: FC<ILoadingImg> = ({
	url,
	width,
	height,
	classOk,
	classError,
	classLoading
}) => {


	const [isLoad, setIsLoad] = useState<boolean>(false)

	const [error, setError] = useState<string | undefined>(undefined)

	const loadingUrl = getImgUrl("cursors/loading.webp")


	useEffect(() => {

		const image = new Image()

		image.onerror = () => {
			setError(`error loading ${url}`)
			setIsLoad(false)
		};

		image.onload = function () {
			setIsLoad(true)
		}

		image.src = url




		return () => setIsLoad(false)

	}, [url])



	if (!isLoad) {
		return <image opacity={.3} x={width / 2 - width / 8} y={height / 2 - height / 8} href={loadingUrl} className={classOk} width={width / 4} height={height / 4} />
	}

	if (error) {
		return <text x={width / 2} y={height / 2} className={classError} fontSize="30" fill="red" textAnchor="middle">{error}</text>
	}


	return <image href={url} className={classOk} width={width} height={height} />

}

export default LoadingImg

