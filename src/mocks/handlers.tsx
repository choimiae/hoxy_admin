import {rest} from "msw";

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
]