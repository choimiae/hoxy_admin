import React, {useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

function Login() {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		id: "",
		password: ""
	});

	const {id, password} = user;

	const changeUser = (e:React.ChangeEvent<HTMLInputElement>) => {
		const {value, name} = e.target;

		setUser({
			...user,
			[name]: value
		});
	}

	const userLoginInfo = async (info:object) => {
		const {data} = await axios.post("/login", info);
		return data;
	}

	const {mutate, isSuccess, isError} = useMutation(userLoginInfo, {
		onSuccess: (data, variables, context) => {
			const {token} = data;
			localStorage.setItem("token", token);
			navigate("/manage/reserve/list");

		},
		onError: (error, variables, context) => {
			alert("계정 정보가 일치하지 않습니다.");
		}
	});

	const login = () => {
		if(!id || id.trim() === "") {
			alert("아이디를 입력하세요.");
			return false;
		}
		if(!password || password.trim() === "") {
			alert("비밀번호를 입력하세요.");
			return false;
		}

		mutate({ id: id, password: password });
	}

	return (
		<main className="flex items-center justify-center h-screen text-center bg-slate-50">
			<div className="inline-flex flex-col basis-80">
				<h1 className="text-3xl text-lime-500 font-black mb-2 flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<h2 className="text-slate-400 text-lg font-semibold mb-3">관리자 시스템</h2>
				<div className="mt-2">
					<input id="id" type="text" className="text-sm" placeholder="아이디를 입력해 주세요." name="id" value={id} onChange={changeUser}/>
				</div>
				<div className="mt-2">
					<input id="password" type="password" className="text-sm" placeholder="비밀번호를 입력해 주세요." name="password" value={password} onChange={changeUser}/>
				</div>
				<div className="mt-6">
					<button type="button" className="bg-lime-600 text-white w-full h-12" onClick={login}>로그인</button>
				</div>
			</div>
		</main>
	)
}

export default Login;