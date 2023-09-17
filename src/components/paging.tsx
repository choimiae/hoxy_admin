import React from "react";

type PagingType = {
	totalPage: number,
	currentPage: number,
	setPage: number,
	handler: Function
}

function Paging(info : PagingType) {
	const {totalPage, currentPage, setPage, handler} = info;
	const pagingNum = Math.ceil(totalPage / setPage);
	return (
		<section className="flex justify-center mt-7">
			{
				Array.from({length: pagingNum}).map((_, index:number) => (
					<button
						type="button"
						key={index + 1}
						className={`h-10 px-4 border border-gray-200 text-gray-400 mx-1 bg-white ${(index + 1) === currentPage ? "bg-gray-500 text-white" : ""}`}
						onClick={() => {handler(index + 1);}}
					>
						{index + 1}
					</button>
				))
			}
		</section>
	)
}

export default Paging;