import React, {useRef, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import {alertConfirmClass} from "../components/alert";
import Card from "../components/card";

function Join() {
	type JoinType = {
		id: string,
		password: string,
		storeIdx: string,
		nickname: string
	}

	type JoinCheckType = JoinType & {
		passwordConfirm: string
	}

	type StoreType = {
		idx: string,
		name: string
	}

	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement[] | HTMLSelectElement[]>([]);

	const [join, setJoin] = useState<JoinCheckType>({
		id: "",
		password: "",
		passwordConfirm: "",
		storeIdx: "",
		nickname: ""
	});

	const {id, password, passwordConfirm, storeIdx, nickname} = join;

	const joinInput = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		const {value, name} = e.target;

		setJoin({
			...join,
			[name]: value
		});
	};

	const storeListDispatch = async () => {
		const res = await axios.get("/manage/store");
		return res.data;
	}

	const {data : storeListDb} = useQuery(["storeList"], storeListDispatch);

	const joinDispatch = async (info:JoinType) => {
		const {data} = await axios.post("/manage/join", info);
		return data;
	}

	const {mutate:joinMutate} = useMutation(joinDispatch, {
		onSuccess: ((data) => {
			Swal.fire({
				icon: "success",
				text: data,
				confirmButtonText: "확인",
				customClass: {
					confirmButton:alertConfirmClass,
				}
			}).then(() => {
				navigate("/");
			})
		}),
		onError: (error => {
			Swal.fire({
				icon: "success",
				text: "오류가 발생했어요.",
				confirmButtonText: "확인",
				customClass: {
					confirmButton:alertConfirmClass,
				}
			})
		})
	})

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		icon: "error"
	});

	const joinHandler = () => {
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
		if(!passwordConfirm || passwordConfirm.trim() === "") {
			Toast.fire({
				title: "비밀번호를 입력해 주세요."
			});
			inputRef.current[2].focus();
			return false;
		}
		if(password.trim() !== passwordConfirm.trim()) {
			Toast.fire({
				title: "비밀번호가 일치하지 않아요."
			});
			inputRef.current[1].focus();
			return false;
		}
		if(!storeIdx || storeIdx.trim() === "") {
			Toast.fire({
				title: "업체명을 선택하세요."
			});
			inputRef.current[3].focus();
			return false;
		}
		if(!nickname || nickname.trim() === "") {
			Toast.fire({
				title: "닉네임을 입력해 주세요."
			});
			inputRef.current[4].focus();
			return false;
		}

		joinMutate({
			id: id,
			password: password,
			storeIdx: storeIdx,
			nickname: nickname
		})
	}

	return(
		<main className="flex items-center justify-center h-screen bg-gray-100">
			<div className="inline-flex flex-col basis-96">
				<h1 className="text-2xl text-lime-500 font-black flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<Card addClassName="px-9 py-11 bg-white mt-8 rounded shadow-sm">
					<h2 className="text-gray-400 text-lg font-semibold mb-6 text-center">회원가입</h2>
					<div className="text-sm">
						<label htmlFor="id" className="mb-1 block">아이디</label>
						<input id="id" type="text" placeholder="아이디를 입력해 주세요." name="id" value={id} ref={el => inputRef.current[0] = el!} onChange={joinInput}/>
					</div>
					<div className="mt-4 text-sm">
						<label htmlFor="password" className="mb-1 block">비밀번호</label>
						<input id="password" type="password" placeholder="비밀번호를 입력해 주세요." name="password" value={password} ref={el => inputRef.current[1] = el!} onChange={joinInput}/>
					</div>
					<div className="mt-4 text-sm">
						<label htmlFor="passwordConfirm" className="mb-1 block">비밀번호 확인</label>
						<input id="passwordConfirm" type="password" placeholder="비밀번호를 입력해 주세요." name="passwordConfirm" value={passwordConfirm} ref={el => inputRef.current[2] = el!} onChange={joinInput}/>
					</div>
					<div className="mt-4 text-sm">
						<label htmlFor="storeIdx" className="mb-1 block">업체명</label>
						<select name="storeIdx" id="storeIdx" className="w-full h-12 border border-x-gray-200" value={storeIdx} ref={el => inputRef.current[3] = el!} onChange={joinInput}>
							<option value="" disabled>업체명을 선택하세요.</option>
							{
								storeListDb?.map((item : StoreType) => {
									return <option key={item.idx} value={item.idx}>{item.name}</option>
								})
							}
						</select>
					</div>
					<div className="mt-4 text-sm">
						<label htmlFor="nickname" className="mb-1 block">닉네임</label>
						<input id="nickname" type="text" className="text-sm" placeholder="닉네임을 입력해 주세요." name="nickname" value={nickname} ref={el => inputRef.current[4] = el!} onChange={joinInput}/>
					</div>
					<button type="button" className="mt-6 bg-lime-600 text-white h-12 px-10 w-full" onClick={joinHandler}>회원가입</button>
				</Card>
				<div className="mt-6 text-center">
					<span className="text-gray-400">이미 회원이신가요?</span>
					<NavLink to="/" className="underline text-gray-500 ml-3">로그인</NavLink>
				</div>
			</div>
		</main>
	)
}

export default Join;