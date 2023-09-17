import React, {useRef, useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {NavLink, useNavigate} from "react-router-dom";
import {userInfo} from "../components/user";
import Swal from "sweetalert2";
import Card from "../components/card";

function Login() {
	type UserType = {
		id: string,
		password: string
	}

	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement[]>([]);

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
				title: "계정 정보가 일치하지 않아요."
			});
			inputRef.current[0].focus();
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
			inputRef.current[0].focus();
			return false;
		}
		if(!password || password.trim() === "") {
			Toast.fire({
				title: "비밀번호를 입력해 주세요."
			});
			inputRef.current[1].focus();
			return false;
		}

		loginMutate({ id: id, password: password });
	}

	return (
		<main className="flex items-center justify-center h-screen text-center bg-gray-100">
			<div className="inline-flex flex-col basis-96">
				<h1 className="text-2xl text-lime-500 font-black flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<Card addClassName="px-9 py-11 bg-white mt-8 rounded shadow-sm">
					<h2 className="text-gray-400 text-lg font-semibold mb-6">관리자 로그인</h2>
					<div>
						<input id="id" type="text" className="text-sm" placeholder="아이디를 입력해 주세요." name="id" ref={el => inputRef.current[0] = el!} value={id} onChange={changeUser}/>
					</div>
					<div className="mt-2">
						<input id="password" type="password" className="text-sm" placeholder="비밀번호를 입력해 주세요." name="password" ref={el => inputRef.current[1] = el!} value={password} onChange={changeUser}/>
					</div>
					<div className="mt-6">
						<button type="button" className="bg-lime-600 text-white w-full h-12" onClick={login}>로그인</button>
					</div>
				</Card>
				<div className="mt-6">
					<span className="text-gray-400">회원이 아니신가요?</span>
					<NavLink to="/manage/join" className="underline text-gray-500 ml-3">회원가입</NavLink>
				</div>
			</div>
		</main>
	)
}

export default Login;