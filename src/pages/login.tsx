import React from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

function Login() {

	const userLoginInfo = async (info:any) => {
		const {data} = await axios.post("http://localhost:3006/login", info);
		return data;
	}

	const {mutate, isSuccess, isError} = useMutation(userLoginInfo, {
		onMutate: (variables) => {
			console.log("onMutate", variables);
		},
		onSuccess: (data, variables, context) => {
			console.log(data)
			console.log(variables)
			console.log(context)
		},
		onError: (error, variables, context) => {
			console.log(error);
		}
	});

	const login = () => {
		mutate({ id: 1 });
	}

	return (
		<main className="flex items-center justify-center h-screen text-center bg-slate-50">
			<div className="inline-flex flex-col basis-80">
				<h1 className="text-3xl text-lime-500 font-black mb-2 flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<h2 className="text-slate-400 text-lg font-semibold mb-3">관리자 시스템</h2>
				<div className="mt-2">
					<input id="id" type="text" required className="text-sm" placeholder="아이디를 입력해 주세요."/>
				</div>
				<div className="mt-2">
					<input id="password" type="password" required className="text-sm" placeholder="비밀번호를 입력해 주세요."/>
				</div>
				<div className="mt-6">
					<button type="button" className="bg-lime-600 text-white w-full h-12" onClick={login}>로그인</button>
				</div>
			</div>
		</main>
	)
}

export default Login;