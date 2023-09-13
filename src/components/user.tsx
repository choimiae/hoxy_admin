import React from "react";

type User = {
	token: string,
	name: string
}

export const userInfo = {
	setUser: function(user:User) {
		const {token, name} = user;

		localStorage.setItem("token", token);
		localStorage.setItem("name", name);
	},
	getUser: function() {
		const {token, name} = localStorage;

		return {token, name};
	}
}