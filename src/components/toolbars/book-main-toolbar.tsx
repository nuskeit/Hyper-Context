import { useParams } from "react-router-dom";
import useRepository from "../../custom-hooks/use-repository";
import "./book-main-toolbar.scss"
import { useEffect } from "react";

export default function () {
	const param = useParams()
	const [getBook, saveBook] = useRepository()

	function handleOpen() {
		//getBook("book Key")
	}

	function handleSave() {
		// saveBook()
	}

	useEffect(() => {
		console.log('param key', param["key"]);
		getBook(param["key"] + "")
	}, [param])

	return <>
		<div className="book-main-toolbar">
			<div>
				<button onClick={handleOpen}>OPEN</button>
			</div>
			<div>
				<button onClick={handleSave}>SAVE</button>
			</div>
			<div>
				<button onClick={handleSave}>SAVE</button>
			</div>
		</div>
	</>
}
