import {rest} from "msw";

const storeList = [
	{
		idx: "storeidx1",
		name: "탐앤탐스"
	},{
		idx: "storeidx2",
		name: "투썸플레이스"
	},{
		idx: "storeidx3",
		name: "스타벅스"
	}
]

let reserveList = [
	{
		idx: "jsdsdakdjkads",
		name: "홍길동",
		phone: "010-1234-5678",
		count: Number(7),
		date: "2023-08-31 00:00:00"
	},{
		idx: "2s1s2d5sd15s1ds5",
		name: "김철수",
		phone: "010-0000-000",
		count: Number(1),
		date: "2023-08-30 11:00:00"
	},{
		idx: "qwertyy",
		name: "이민기",
		phone: "010-5555-6666",
		count: Number(3),
		date: "2023-09-01 11:00:00"
	}
]

let reserveStatsList = [
	{
		idx: "qwertyy",
		name: "이민기",
		phone: "010-5555-6666",
		count: Number(3),
		date: "2023-09-01 11:00:00",
		checkFlag: false
	},{
		idx: "12121212212",
		name: "홍길동",
		phone: "010-1234-5678",
		count: Number(10),
		date: "2023-09-01 11:00:00",
		checkFlag: true
	},{
		idx: "5555555",
		name: "이수근",
		phone: "010-0000-0000",
		count: Number(1),
		date: "2023-09-05 11:00:00",
		checkFlag: false
	}
]

export const handlers = [
	// 로그인
	rest.post("/manage/login", (req:any, res:any, ctx:any) => {
		const {id, password} = req.body;
		if(id === "admin" && password === "1234") {
			return res(ctx.status(201), ctx.json({token: "123456789", name: "최고관리자"}));
		} else {
			return res(ctx.status(401));
		}
	}),

	// 회원가입 - 업체 idx 목록 조회
	rest.get("/manage/store", (req:any, res:any, ctx:any) => {
		return res(ctx.status(200), ctx.json(storeList));
	}),

	// 회원가입 처리
	rest.post("/manage/join", (req:any, res:any, ctx:any) => {
		const {nickname} = req.body;

		return res(ctx.status(201), ctx.json(`${nickname}님 회원가입이 완료되었습니다.`));
	}),

	// 예약 목록 조회
	rest.get("/manage/reserve/list", (req:any, res:any, ctx:any) => {
		return res(ctx.status(200), ctx.json(reserveList));
	}),

	// 예약 처리
	rest.post("/manage/reserve/check", (req:any, res:any, ctx:any) => {
		const {idx, checkFlag} = req.body;
		reserveList = reserveList.filter(item => item.idx !== idx);

		return res(ctx.status(201), ctx.json(`${idx} 예약 건이 ${checkFlag ? "수락" : "거절"}되었습니다.`));
	}),

	// 예약 통계 목록 조회
	rest.post("/manage/reserve/stats", (req:any, res:any, ctx:any) => {
		const {startDt, paging} = req.body;
		const changeFormat = new Date(startDt).toISOString().split("T")[0];
		const reserveStatsListFilter = reserveStatsList.filter(item => new Date(item.date).toISOString().split("T")[0] === changeFormat);

		return res(ctx.status(201), ctx.json(reserveStatsListFilter));
	}),
]