import React from "react";
import Header from "../../components/layout/header";
import Container from "../../components/layout/container";
import Tab from "../../components/tab";

function ReserveList() {
	const tabData = [
		{name: "예약 확인", link: "/reserve/list", activeFlag: true},
		{name: "예약 통계", link: "/reserve/stats", activeFlag: false}
	]

	return (
		<Container>
			<Header/>
			<section>
				<Tab data={tabData}/>

			</section>
		</Container>
	)
}

export default ReserveList;