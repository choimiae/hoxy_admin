import React from "react";
import Card from "../components/card";
import {NavLink} from "react-router-dom";

function NotFound() {

	return (
		<main className="flex items-center justify-center h-screen text-center bg-gray-100">
			<div className="inline-flex flex-col basis-96">
				<h1 className="text-2xl text-lime-500 font-black flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<Card addClassName="px-9 py-11 bg-white mt-8 rounded shadow-sm">
					<h2 className="text-gray-400 font-semibold mb-6 text-4xl text-lime-500">404</h2>
					<p className="text-lg">잘못된 접근이에요.</p>
					<div className="mt-6">
						<NavLink to="/" className="flex items-center justify-center bg-lime-600 text-white h-12">메인 페이지로 이동</NavLink>
					</div>
				</Card>
			</div>
		</main>


	)
}

export default NotFound;