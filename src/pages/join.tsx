import React, {useState} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

function Join() {
	type JoinType = {
		id: string,
		password: string,
		passwordConfirm: string,
		storeIdx: string,
		nickname: string
	}

	type StoreType = {
		idx: string,
		name: string
	}

	const navigate = useNavigate();

	const [join, setJoin] = useState<JoinType>({
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
			alert(data);
			navigate("/");
		}),
		onError: (error => {
			alert(error);
		})
	})

	const joinHandler = () => {
		if(!id || id.trim() === "") {
			alert("아이디를 입력하세요.");
			return false;
		}
		if(!password || password.trim() === "") {
			alert("비밀번호를 입력하세요.");
			return false;
		}
		if(!passwordConfirm || passwordConfirm.trim() === "") {
			alert("비밀번호 확인을 입력하세요.");
			return false;
		}
		if(password.trim() !== passwordConfirm.trim()) {
			alert("비밀번호가 일치하지 않습니다.");
			return false;
		}
		if(!storeIdx || storeIdx.trim() === "") {
			alert("업체명을 선택하세요.");
			return false;
		}
		if(!nickname || nickname.trim() === "") {
			alert("닉네임을 입력하세요.");
			return false;
		}

		joinMutate({
			id: id,
			password: password,
			passwordConfirm: passwordConfirm,
			storeIdx: storeIdx,
			nickname: nickname
		})
	}

	return(
		<main className="flex items-center justify-center h-screen text-center bg-slate-50">
			<div className="inline-flex flex-col basis-2/6">
				<h1 className="text-3xl text-lime-500 font-black mb-2 flex items-center justify-center"><span className="logo">Hoxy</span>예약되나요?</h1>
				<h2 className="text-slate-400 text-lg font-semibold mb-3">회원가입</h2>
				<div className="mt-2 flex items-center">
					<div className="basis-5/12">아이디</div>
					<input id="id" type="text" className="text-sm" placeholder="아이디를 입력해 주세요." name="id" value={id} onChange={joinInput}/>
				</div>
				<div className="mt-2 flex items-center">
					<div className="basis-5/12">비밀번호</div>
					<input id="password" type="password" className="text-sm" placeholder="비밀번호를 입력해 주세요." name="password" value={password} onChange={joinInput}/>
				</div>
				<div className="mt-2 flex items-center">
					<div className="basis-5/12">비밀번호 확인</div>
					<input id="passwordConfirm" type="password" className="text-sm" placeholder="비밀번호를 입력해 주세요." name="passwordConfirm" value={passwordConfirm} onChange={joinInput}/>
				</div>
				<div className="mt-2 flex items-center">
					<div className="basis-5/12">업체명</div>
					<select name="storeIdx" id="storeIdx" className="basis-full h-12 border border-x-gray-200 text-sm" value={storeIdx} onChange={joinInput}>
						<option value="" disabled>업체명을 선택하세요.</option>
						{
							storeListDb?.map((item : StoreType) => {
								return <option key={item.idx} value={item.idx}>{item.name}</option>
							})
						}
					</select>
				</div>
				<div className="mt-2 flex items-center">
					<div className="basis-5/12">닉네임</div>
					<input id="nickname" type="text" className="text-sm" placeholder="닉네임을 입력해 주세요." name="nickname" value={nickname} onChange={joinInput}/>
				</div>
				<div className="mt-6 flex items-center justify-center">
					<button type="button" className="bg-lime-600 text-white h-12 px-10 mx-2" onClick={joinHandler}>회원가입</button>
					<NavLink to="/" className="bg-gray-300 text-white h-12 px-10 inline-flex items-center mx-2">취소</NavLink>
				</div>
			</div>
		</main>
	)
}

export default Join;