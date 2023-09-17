import React from "react";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import Container from "../../components/layout/container";
import Swal from "sweetalert2";
import {alertConfirmClass} from "../../components/alert";
import Card from "../../components/card";

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

	const title = "예약 확인";
	const queryClient = useQueryClient();

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
		<Container title={title}>
			<Card>
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
							<th className="px-2 py-3 font-medium">예약 시간</th>
							<th className="px-2 py-3 font-medium">예약 처리</th>
						</tr>
					</thead>
					<tbody>
					{
						reserveListDb && reserveListDb.length > 0 ?
							reserveListDb.map((item : ReserveListType, index : number) => {
								return (
									<tr className="border-b border-gray-100" key={index}>
										<td className="px-2 py-3">{reserveListDb.length - index}</td>
										<td className="px-2 py-3">{item.name}</td>
										<td className="px-2 py-3">{item.phone}</td>
										<td className="px-2 py-3">{Number(item.count)}명</td>
										<td className="px-2 py-3">{item.date}</td>
										<td className="px-2 py-3">
											<button type="button" className="text-white bg-gray-400 h-7 text-xs px-2 mx-1" onClick={() => {reserveHandler(item.idx, true)}}>예약 수락</button>
											<button type="button" className="text-gray-500 border-gray-300 border h-7 text-xs px-2 mx-1" onClick={() => {reserveHandler(item.idx, false)}}>예약 거절</button>
										</td>
									</tr>
								)
							})
						:
							<tr className="border-b border-gray-100"><td className="px-2 py-3" colSpan={6}>목록이 없어요.</td></tr>
					}
					</tbody>
				</table>
			</Card>
		</Container>
	)
}

export default ReserveList;