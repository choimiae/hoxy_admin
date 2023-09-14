import React, {useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {NavLink, useNavigate} from "react-router-dom";
import {userInfo} from "../components/user";
import Swal from "sweetalert2";

function Login() {
	type UserType = {
		id: string,
		password: string
	}
	const navigate = useNavigate();

	const [user, setUser] = useState<UserType>({
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
		const {data} = await axios.post("/manage/login", info);
		return data;
	}

	const {mutate:loginMutate} = useMutation(userLoginInfo, {
		onSuccess: (data) => {
			const {token, name} = data;
			userInfo.setUser({token: token, name: name});
			navigate("/manage/reserve/list");

		},
		onError: (error) => {
			Toast.fire({
				title: "계정 정보가 일치하지 않습니다."
			});
		}
	});

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		icon: "error"
	});

	const login = () => {
		if(!id || id.trim() === "") {
			Toast.fire({
				title: "아이디를 입력해 주세요."
			});
			return false;
		}
		if(!password || password.trim() === "") {
			Toast.fire({
				title: "비밀번호를 입력해 주세요."
			});
			return false;
		}

		loginMutate({ id: id, password: password });
	}

	return (
		<main className="flex items-center justify-center h-screen text-center bg-slate-50">
			<div className="inline-flex flex-col basis-2/6">
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
				<div className="mt-6">
					<NavLink to="/manage/join" className="underline text-gray-500">회원가입</NavLink>
				</div>
			</div>
		</main>
	)
}

export default Login;