import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {userInfo} from "./components/user";

function AuthRouter() {
	const {token} = userInfo.getUser();

	return token ?
		(<Outlet/> ) :
		(<Navigate  to="" replace />)
}

export default AuthRouter;