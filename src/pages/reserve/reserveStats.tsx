import React, {useState} from "react";
import axios from "axios";
import Container from "../../components/layout/container";
import Card from "../../components/card";
import Datepicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import {useQuery} from "@tanstack/react-query";
import Paging from "../../components/paging";
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

	const title = "예약 통계";
	const [startDt, setStartDt] = useState<Date>(new Date());
	const [paging, setPaging] = useState<number>(1)
	const [total, setTotal] = useState<number>(0);

	const dateHandler = (data: Date) => {
		setStartDt(data);
		setPaging(1);
	}

	const reserveStatsDispatch = async () => {
		const {data} = await axios.post("/manage/reserve/stats", {startDt, paging});
		setTotal(data.length);
		return data;
	}

	const {data : reserveStatsDb} = useQuery(["reserveStatsList", startDt, paging], reserveStatsDispatch, {keepPreviousData: true});

	const pagingHandler = (index:number) => {
		setPaging(index);
	}

	return (
		<Container title={title}>
			<Card>
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
					<tr className="bg-gray-50 border-y border-gray-200">
						<th className="px-2 py-3 font-medium">No</th>
						<th className="px-2 py-3 font-medium">이름</th>
						<th className="px-2 py-3 font-medium">핸드폰 번호</th>
						<th className="px-2 py-3 font-medium">예약 인원</th>
						<th className="px-2 py-3 font-medium">예약 상태</th>
						<th className="px-2 py-3 font-medium">예약 처리 시간</th>
					</tr>
					</thead>
					<tbody>
						{
							reserveStatsDb && reserveStatsDb.length > 0 ?
								reserveStatsDb.map((item:ReserveStatsType, index:number) => {
									return (
										<tr className="border-b border-gray-100" key={index}>
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
							:
								<tr className="border-b border-gray-100"><td className="px-2 py-3" colSpan={6}>목록이 없어요.</td></tr>
						}
					</tbody>
				</table>
			</Card>
			<Paging totalPage={total} currentPage={paging} setPage={10} handler={pagingHandler} />
		</Container>
	)
}

export default ReserveStats;