import react from "react";
import styled from "styled-components";
import theme from "styled-theming";
import { tColor, Space} from "client/types/ui"

interface Props {
	color?: any;
  size?: "contain" | "cover";
	position?: "left top"
	| "left center" 
	| "left bottom" 
	| "right top" 
	| "right center" 
	| "right bottom" 
	| "center top"
	| "center center"
	| "center bottom"
	| "initial"
	| "inherit";
	src?: string;
}

const Background = styled("div")<Props>`
	background-color: ${props => props.color};
	background-image: url(${props => props.src});
	background-size: ${props => props.size ? props.size : "contain"};
	background-position: ${props => props.position ? props.position : "center"};
`

export default Background