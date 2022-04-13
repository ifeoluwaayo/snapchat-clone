import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
	const dispatch = useDispatch();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch(
					login({
						username: result.user.displayName,
						profilePic: result.user.photoURL,
						id: result.user.uid,
					})
				);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png"
					alt="Hi am here"
				/>
				<Button variant="outlined" onClick={signIn}>
					Sign in
				</Button>
			</div>
		</div>
	);
}

export default Login;
