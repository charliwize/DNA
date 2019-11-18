import React from "react";

interface Props {
	color: string;
	type: "profile";
}

const getPath = (icon) => {
	switch (icon) {
		case "profile":
			return "M19 22H5a1 1 0 0 1 0-2h13v-5c0-.552-.448-1-1-1H7c-.552 0-1 .448-1 1v2a1 1 0 0 1-2 0v-2a3.003 3.003 0 0 1 3-3h10a3.003 3.003 0 0 1 3 3v6a1 1 0 0 1-1 1zM16 6a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
	}
	return "";
}

const Icon = (props: Props) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			preserveAspectRatio="xMinYMin meet"
			xmlns="http://www.w3.org/2000/svg"
		>
		<path
			fillRule="evenodd"
			fill={props.color}
			d={getPath(props.type)}
		/>
	</svg>
	)
}

export default Icon;