import ReactDOM from 'react-dom/client'
import './index.scss'
import AppMain from './views/app-main'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'






// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <AppMain />
// 	},
// 	{
// 		path: "/hola",
// 		element: <div>HOLISS</div>
// 	}
// ])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<AppMain />
	// </React.StrictMode>
)
