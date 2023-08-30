import React from "react";
import {NavLink} from "react-router-dom";

type TabType = {
	name: String,
	activeFlag: boolean,
	link: any
};

type TabCpType = {
	data: TabType[]
}

function Tab({data} : TabCpType) {
	return(
		<div className="mb-10">
			{
				data.map((item, index:number) => (
					<NavLink key={index} to={item.link} className={`text-base mr-2 px-4 inline-flex items-center justify-center text-white h-10 ${item.activeFlag ? "bg-slate-500" : "bg-gray-300"}`}>{item.name}</NavLink>
				))
			}
		</div>
	)
}

export default Tab;