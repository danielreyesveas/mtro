import React, { Component, useRef, useState } from "react";
import "../Metronome.css";

import c1 from "../click1.wav";
import c2 from "../click2.wav";

const Mtro = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [count, setCount] = useState(0);
	const [bpm, setBPM] = useState(60);
	const [beats, setBeats] = useState(4);
	const click1 = new Audio(c1);
	const click2 = new Audio(c2);
	const timer = useRef(null);

	const handleInputChange = (e) => {
		const new_bpm = e.target.value;

		if (isPlaying) {
			clearInterval(timer.current);
			timer.current = setInterval(playClick, (60 / new_bpm) * 1000);
			setCount(0);
		}
		setBPM(new_bpm);
	};

	const playClick = () => {
		if (count % beats === 0) {
			click2.play();
		} else {
			click1.play();
		}
	};

	const startStop = () => {
		if (isPlaying) {
			clearInterval(timer.current);
			setIsPlaying(false);
		} else {
			timer.current = setInterval(playClick, (60 / bpm) * 1000);
			setCount(0);
			setIsPlaying(true);
			playClick();
		}
	};

	return (
		<div className="metronome">
			<div className="bpm-slider">
				<p>{bpm} BPM</p>
				<input
					type="range"
					min="60"
					max="240"
					value={bpm}
					onChange={handleInputChange}
				/>
			</div>
			<button onClick={startStop}>{isPlaying ? "Stop" : "Start"}</button>
		</div>
	);
};

export default Mtro;
