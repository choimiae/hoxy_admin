import React from "react";
import {NavLink} from "react-router-dom";

type NavType = {
	name: string,
	link: string
};

const navDb = [
	{
		name: "예약 확인",
		link: "/manage/reserve/list"
	}, {
		name: "예약 통계",
		link: "/manage/reserve/stats"
	}
]


function Nav() {
	return(
		<nav className="px-8 bg-white shadow-sm">
			{
				navDb.map((item: NavType, index:number) => (
					<NavLink key={index} to={item.link}  className={({ isActive }) => isActive ? "text-lime-500 underline px-4 inline-flex items-center justify-center h-14" : "text-gray-600 px-4 inline-flex items-center justify-center h-14"}>{item.name}</NavLink>
				))
			}
		</nav>
	)
}

export default Nav;