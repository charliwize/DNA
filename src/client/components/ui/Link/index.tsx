import React from "react";
// import s from "./style.scss";

interface Props {
  href: string;
  onClick: () => void
}
const UILink = (props: React.PropsWithChildren<Props>) => {

	return (
		<a href={props.href} onClick={props.onClick}>
			{ props.children }
		</a>
	)
}

export default UILink;