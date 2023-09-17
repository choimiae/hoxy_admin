import React from "react";

type CardType = {
	children: React.ReactNode,
	addClassName: string | null
}

function Card(info : CardType) {
	const {children, addClassName} = info;

	return (
		<section className={`px-9 py-11 bg-white rounded shadow-sm ${addClassName}`}>
			{children}
		</section>
	)
}

export default Card;