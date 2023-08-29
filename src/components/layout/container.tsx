import React from "react";

type ContainerType = {
	children: React.ReactNode
}

function Container({children} : ContainerType) {

	return (
		<main className="px-8 py-8">
			{children}
		</main>
	)
}

export default Container;