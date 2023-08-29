import React from 'react';
import {Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Login from "./pages/login";
import "./index.css";
import ReserveList from "./pages/reserve/reserveList";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<Login/>} />
				<Route path="/reserve/list" element={<ReserveList />} />
			</Routes>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
