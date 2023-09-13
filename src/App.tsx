import React from 'react';
import {Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Login from "./pages/login";
import "./index.css";
import ReserveList from "./pages/reserve/reserveList";
import ReserveStats from "./pages/reserve/reserveStats";
import Join from "./pages/join";
import AuthRouter from "./authRouter";
import NotFound from "./pages/notFound";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="*" element={<NotFound/>} />
				<Route path="/" element={<Login/>} />
				<Route path="/manage/join" element={<Join/>} />
				<Route element={<AuthRouter/>}>
					<Route path="/manage/reserve/list" element={<ReserveList />} />
					<Route path="/manage/reserve/stats" element={<ReserveStats />} />
				</Route>
			</Routes>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
