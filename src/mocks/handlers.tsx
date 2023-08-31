import {rest} from "msw";

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

export const handlers = [
	// 로그인
	rest.post("/login", (req:any, res:any, ctx:any) => {
		const {id, password} = req.body;
		if(id === "admin" && password === "1234") {
			return res(ctx.status(201), ctx.json({token: "123456789"}));
		} else {
			return res(ctx.status(401));
		}
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
	})
]