import React from "react";
import { tColor } from "client/types/ui"

interface Props {
	theme: tColor,
}

class Details extends React.PureComponent<Props> {
	render() {
		return (
			<div>Subscription detail should be here</div>
		)
	}
}

export default Details