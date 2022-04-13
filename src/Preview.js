import React, { useEffect } from "react";
import "./Preview.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/appSlice";

function Preview() {
	const cameraImage = useSelector(selectCameraImage);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (!cameraImage) {
			history.replace("/");
		}
	}, [cameraImage, history]);

	const closePreview = () => {
		dispatch(resetCameraImage());
	};

	const sendPost = () => {
		const id = uuid();
		const uploadTask = storage
			.ref(`posts/${id}`)
			.putString(cameraImage, "data_url");

		uploadTask.on(
			"statechanged",
			null,
			(error) => {
				console.log(error);
			},
			() => {
				storage
					.ref("posts")
					.child(id)
					.getDownloadURL()
					.then((url) => {
						db.collection("posts").add({
							imageUrl: url,
							userName: user.username,
							read: false,
							profilePic: user.profilePic,
							timestamp:
								firebase.firestore.FieldValue.serverTimestamp(),
						});
						// dispatch(resetCameraImage());
						history.replace("/chats");
					});
			}
		);
	};

	return (
		<div className="preview">
			<CloseIcon className="preview__close" onClick={closePreview} />
			<div className="preview__toolbarRight">
				<TextFieldsIcon />
				<CreateIcon />
				<NoteIcon />
				<MusicNoteIcon />
				<AttachFileIcon />
				<CropIcon />
				<TimerIcon />
			</div>
			<img src={cameraImage} alt="Preview" />
			<div onClick={sendPost} className="preview__footer">
				<h2>Send Now</h2>
				<SendIcon fontSize="small" className="preview__sendIcon" />
			</div>
		</div>
	);
}

export default Preview;
