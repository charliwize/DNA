import react from "react";
import styled from "styled-components";
import { tColor, FontWeight, tFontSize, Space } from "client/types/ui";

interface Props {
  color?: string;
  height?: Space;
  weight?: FontWeight;
  size?: tFontSize;
}

const Text = styled("div")<Props>`
  font-size: ${props => props.size ? props.size : "medium"};
  font-weight: ${props => props.weight ? props.weight : 100};
  color: ${props => props.color ? props.color : "black"};
  line-height: ${props => props.height ? `${props.height}px` : "inherit"};
`

export default Text