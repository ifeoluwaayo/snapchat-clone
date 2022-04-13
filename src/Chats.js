import React, { useState, useEffect } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
	const [posts, setPosts] = useState([]);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
	}, []);

	const takeSnap = () => {
		dispatch(resetCameraImage());
		history.push("/");
	};

	return (
		<div className="chats">
			<div className="chats__header">
				<Avatar
					src={user.profilePic}
					className="chats__headerAvatar"
					onClick={() => auth.signOut}
				/>
				<div className="chats__headerSearch">
					<SearchIcon className="chats__headerSearchIcon" />
					<input type="text" placeholder="Friends" />
				</div>
				<ChatBubbleIcon className="chats__headerChatIcon" />
			</div>

			<div className="chats__posts">
				{posts.map(
					({
						id,
						data: {
							profilePic,
							userName,
							timestamp,
							imageUrl,
							read,
						},
					}) => (
						<Chat
							key={id}
							id={id}
							profilePic={profilePic}
							username={userName}
							timestamp={timestamp}
							imageUrl={imageUrl}
							read={read}
						/>
					)
				)}
			</div>

			<RadioButtonUncheckedIcon
				className="chats__takePicIcon"
				onClick={takeSnap}
				fontSize="large"
			/>
		</div>
	);
}

export default Chats;
