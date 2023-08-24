import {rest} from "msw";

const loginRes = ["로그인 성공", "로그인 실패"];

export const handlers = [
	rest.post("/login", (req:any, res:any, ctx:any) => {
		loginRes.push(req.body);
		return res(ctx.status(201));
	}),
]