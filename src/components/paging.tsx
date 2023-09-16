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
						className={`h-10 px-4 border border-slate-200 text-slate-400 mx-1 ${(index + 1) === currentPage ? "bg-slate-500 text-white" : ""}`}
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