import react from "react"
import styled from "styled-components";
import { Space, Size } from "client/types/ui"

interface Props {
  height?: Size;
  width?: Size;
  noFlex?: boolean;
  align?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  sLeft?: Space;
  sTop?: Space;
  sBottom?: Space;
  sRight?: Space;
  expand?: "1" | "2" | "3";
  columns?: "2" | "3" | "4";
  direction? : "row" | "row-reverse" | "column" | "column-reverse";
  hspace?: Space; 
  borderColor?: string,
  borderLeft?: boolean,
  borderWidth?: Space,
  border?: boolean,
  wrapped?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "start" | "end";
  alignContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "start" | "end";
}

const Layout = styled("div")<Props>`
  border: ${props => props.border ? `${props.borderWidth}px solid ${props.borderColor}` : "initial"}
  border-left: ${props => props.borderLeft ? `${props.borderWidth}px solid ${props.borderColor}` : "initial"}
  display: ${props => props.noFlex ? "" : "flex"};
  height: ${props => props.height ? `${props.height}px` : props.fullHeight ? "100%" : "auto"};
  align-self: ${props => props.align};
  flex-basis: ${props => props.width ? `${props.width}px` : "auto"};
  padding-left: ${props => props.sLeft ? props.sLeft : 0}px;
  padding-top: ${props => props.sTop ? props.sTop: 0}px;
  padding-right: ${props => props.sRight ? props.sRight : 0}px;
  padding-bottom: ${props => props.sBottom ? props.sBottom : 0}px;
  max-width: ${props => props.width && !props.expand ? `${props.width}px` : "none"};
  flex-direction: ${props => props.direction ? props.direction : "column"};
  flex-grow: ${props => props.expand ? props.expand : 0};
  align-items: ${props => props.alignItems ? `${props.alignItems}` : "stretch"}
  flex-wrap: ${props => props.wrapped ? "wrap" : "nowrap"}
  justify-content: ${props => props.justify ? props.justify : "flex-start"};
  align-content: ${props => props.alignContent? props.alignContent: "stretch"};

`

export default Layout