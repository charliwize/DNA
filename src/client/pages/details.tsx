import React from "react";
import { tColor } from "client/types/ui"

interface Props {
	theme: tColor,
}

class Details extends React.PureComponent<Props> {
	render() {
		console.log(this.props)
		return (
			<div>wsd</div>
		)
	}
}

export default Details