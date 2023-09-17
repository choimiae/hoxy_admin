import React from "react";
import Header from "./header";
import Nav from "./nav";

type ContainerType = {
	children: React.ReactNode,
	title?: string
}

function Container(info : ContainerType) {
	const {children, title} = info;

	return (
		<main className="block content h-full min-h-screen bg-gray-100">
			<Header/>
			<Nav/>
			<section className="px-9 py-7 text-sm">
				{title ? <h2 className="mb-4 font-semibold text-base">{title}</h2> : ""}
				{children}
			</section>
		</main>
	)
}

export default Container;