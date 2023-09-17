import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {userInfo} from "../user";
import Swal from "sweetalert2";
import {alertConfirmClass} from "../alert";

function Header() {
	const navigate = useNavigate();
	const {name} = userInfo.getUser();

	const logoutHandler = () => {
		userInfo.setUser({token: "", name: ""});
		Swal.fire({
			icon: "success",
			text: "로그아웃 되었어요.",
			confirmButtonText: "확인",
			customClass: {
				confirmButton:alertConfirmClass,
			}
		}).then(() => {
			navigate("/");
		});
	}

	return(
		<header className="flex justify-between items-center bg-gray-700 px-8 py-5">
			<h1 className="text-white text-lg font-black flex items-center"><span className="logo">Hoxy</span>예약되나요?</h1>
			<div className="flex items-center text-2xl text-gray-300">
				<FontAwesomeIcon icon={faCircleUser} />
				<span className="ml-2 text-sm">{name}</span>
				<button type="button" className="h-7 text-lg px-3 inline-flex items-center" onClick={logoutHandler}><FontAwesomeIcon icon={faRightFromBracket} /></button>
			</div>
		</header>
	)
}

export default Header;