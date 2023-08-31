import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/layout/header";
import Tab from "../../components/tab";
import Container from "../../components/layout/container";
import Datepicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import {useMutation} from "@tanstack/react-query";
registerLocale("ko", ko);
setDefaultLocale("ko");

function ReserveStats() {
	type ReserveStatsType = {
		idx: string,
		name: string,
		phone: string,
		count: number,
		date: string,
		checkFlag:boolean
	}

	const [startDt, setStartDt] = useState<Date>(new Date());

	const tabDb = [
		{name: "예약 확인", link: "/manage/reserve/list", activeFlag: false},
		{name: "예약 통계", link: "/manage/reserve/stats", activeFlag: true}
	]

	useEffect(() => {
		reserveStatsMutate(startDt);
	}, [])

	const dateHandler = (data: Date) => {
		setStartDt(data);
		reserveStatsMutate(data);
	}

	const reserveStatsDispatch = async (date:Date) => {
		const {data} = await axios.post("/manage/reserve/stats", date);
		return data;
	}

	const {mutate:reserveStatsMutate, data:reserveStatsDb} = useMutation(reserveStatsDispatch, {
		onError: (err => {
			alert("오류 발생");
		})
	})

	return (
		<Container>
			<Header/>
			<section>
				<Tab data={tabDb}/>
				<div className="flex justify-end mb-5">
					<Datepicker locale="ko" dateFormat="yyyy-MM-dd" closeOnScroll={true} selected={startDt} onChange={dateHandler} className="h-10"/>
				</div>
				<table className="table-fixed text-center w-full">
					<colgroup>
						<col style={{width: "10%"}}/>
						<col style={{width: "16%"}}/>
						<col style={{width: "16%"}}/>
						<col style={{width: "16%"}}/>
						<col style={{width: "18%"}}/>
						<col style={{width: "auto"}}/>
					</colgroup>
					<thead>
					<tr className="bg-gray-100 border-y border-slate-200">
						<th className="px-2 py-3">No</th>
						<th className="px-2 py-3">이름</th>
						<th className="px-2 py-3">핸드폰 번호</th>
						<th className="px-2 py-3">예약 인원</th>
						<th className="px-2 py-3">예약 상태</th>
						<th className="px-2 py-3">예약 처리 시간</th>
					</tr>
					</thead>
					<tbody>
						{
							reserveStatsDb?.map((item:ReserveStatsType, index:number) => {
								return (
									<tr className="border-b border-slate-100" key={index}>
										<td className="px-2 py-3">{reserveStatsDb.length - index}</td>
										<td className="px-2 py-3">{item.name}</td>
										<td className="px-2 py-3">{item.phone}</td>
										<td className="px-2 py-3">{Number(item.count)}명</td>
										<td className="px-2 py-3">
											{item.checkFlag ? <span className="text-lime-500">예약 수락</span> : <span className="text-gray-400">예약 거절</span>}
										</td>
										<td className="px-2 py-3">{item.date}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</section>
		</Container>
	)
}

export default ReserveStats;