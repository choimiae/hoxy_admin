import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {userInfo} from "../user";

function Header() {
	const navigate = useNavigate();
	const {name} = userInfo.getUser();

	const logoutHandler = () => {
		userInfo.setUser({token: "", name: ""});
		alert("로그아웃되었습니다.");
		navigate("/");
	}

	return(
		<header className="flex justify-between items-center mb-16">
			<h1 className="text-lime-500 text-2xl font-black flex items-center"><span className="logo">Hoxy</span>예약되나요?</h1>
			<div className="flex items-center text-2xl text-gray-400">
				<FontAwesomeIcon icon={faCircleUser} />
				<span className="ml-1 text-sm">{name}</span>
				<button type="button" className="text-white bg-gray-400 h-7 text-xs px-2 ml-3" onClick={logoutHandler}>로그아웃</button>
			</div>
		</header>
	)
}

export default Header;