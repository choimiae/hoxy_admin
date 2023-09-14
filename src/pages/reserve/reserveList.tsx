import React from "react";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import Header from "../../components/layout/header";
import Container from "../../components/layout/container";
import Tab from "../../components/tab";
import Swal from "sweetalert2";
import {alertConfirmClass} from "../../components/alert";

function ReserveList() {
	type ReserveListType = {
		idx: string,
		name: string,
		phone: string,
		count: number,
		date: string
	}

	type ReserveCheckType = {
		idx: Parameters<typeof reserveHandler>[0],
		checkFlag: Parameters<typeof reserveHandler>[1]
	}

	const queryClient = useQueryClient();

	const tabDb = [
		{name: "예약 확인", link: "/manage/reserve/list", activeFlag: true},
		{name: "예약 통계", link: "/manage/reserve/stats", activeFlag: false}
	]

	const reserveListDispatch = async () => {
		const res = await axios.get("/manage/reserve/list");
		return res.data;
	}

	const {data : reserveListDb} = useQuery(["reserveList"], reserveListDispatch);

	const reserveCheckDispatch = async (info:ReserveCheckType) => {
		const {data} = await axios.post("/manage/reserve/check", info);
		return data;
	}

	const {mutate:reserveCheckMutate} = useMutation(reserveCheckDispatch, {
		onSuccess: ((data, variable) => {
			const {checkFlag} = variable;
			queryClient.invalidateQueries(["reserveList"]);
			Swal.fire({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 2000,
				icon: checkFlag ? "success" : "warning",
				text: data,
			});
		}),
		onError: (err => {
			Swal.fire({
				icon: "error",
				text: "오류가 발생했어요.",
				confirmButtonText: "확인",
				customClass: {
					confirmButton:alertConfirmClass,
				}
			});
		})
	})

	const reserveHandler = (idx:string, checkFlag: boolean) => {
		reserveCheckMutate({idx, checkFlag})
	}

	return (
		<Container>
			<Header/>
			<section>
				<Tab data={tabDb}/>
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
							<th className="px-2 py-3">예약 시간</th>
							<th className="px-2 py-3">예약 처리</th>
						</tr>
					</thead>
					<tbody>
					{
						reserveListDb?.map((item : ReserveListType, index : number) => {
							return (
								<tr className="border-b border-slate-100" key={index}>
									<td className="px-2 py-3">{reserveListDb.length - index}</td>
									<td className="px-2 py-3">{item.name}</td>
									<td className="px-2 py-3">{item.phone}</td>
									<td className="px-2 py-3">{Number(item.count)}명</td>
									<td className="px-2 py-3">{item.date}</td>
									<td className="px-2 py-3">
										<button type="button" className="text-white bg-slate-500 h-7 text-xs px-2 mx-1" onClick={() => {reserveHandler(item.idx, true)}}>예약 수락</button>
										<button type="button" className="text-white bg-gray-300 h-7 text-xs px-2 mx-1" onClick={() => {reserveHandler(item.idx, false)}}>예약 거절</button>
									</td>
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

export default ReserveList;