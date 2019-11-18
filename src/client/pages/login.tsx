import React from 'react';
import { Button, Layout, Text, Background } from "../../client/components/ui";
import { Input } from "../../client/components/ui";
import { UserData, tColor } from "client/types/ui"
import axios from 'axios';

interface Props {
	theme: tColor,
	changeRoute?: (value: boolean) => void
}

interface State {
	password: string,
	username: string,
	error: string,
}

class Login extends React.PureComponent<Props, State> {
	readonly state: State = {
		password: "",
		username: "",
		error: ""
	}
	
	private handlePassword = (e: any) => {
		this.setState({
			password: e.target.value
		})
	}

	private handleError = (value) => {
		this.setState({ error: value });
	}

	private handleUserName = (e: any) => {
		this.setState({
			username: e.target.value
		});
	}

	private loginUser = async () => {
		let data: UserData = undefined;

		await axios.get(`http://localhost:3001/api/users/getUsers/`,
			{ 
				params: {
					username: this.state.username
				},
				headers: {'Content-Type': 'application/json'}
			}
		)
		.then(res => {		
			// if user exist set user into in cookie
			if (res.status === 200) {
				data = res.data;
				document.cookie = `loggedIn=${true}; path=localhost:3001/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
				document.cookie = `username=${this.state.username}; path=localhost:3001/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
				this.props.changeRoute(true);
			}
		})
		.catch((err) => {
			if (err.response.status === 404) {
				this.handleError("User not found");
			}
		})
	}

	private validateInput = (username, password) => {
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const usernameTransformed = username.toLowerCase();

		if (!emailRegex.test(usernameTransformed)) {
			this.handleError("Enter a valid email")
			return;
		}

		this.loginUser();
	}

	private handleSubmit = () => {
		const { username, password }  = this.state;

		if (!username || !password) {
			this.handleError("Empty username or password");
		}
		else {
			this.handleError("");
			this.validateInput(username, password);
		}
	}

	render() {
		return (
			<Layout fullHeight justify="center">
				<Layout width="300" align="center">
					<Layout height="24">
						{ this.state.error && 
							<Text color={this.props.theme.warning}>
								{ this.state.error }
							</Text>
						}
					</Layout>
					<Layout sBottom="20">
						<Text> Enter login credentials </Text>
					</Layout>
					<Layout sBottom="16">
						<Input type="text" 
							height="40" 
							borderColor={ this.props.theme.darkGray } 
							textSize="16"
							onChange={this.handleUserName}
						/>
					</Layout>
					<Layout sBottom="16">
						<Input 
							type="password" 
							height="40" 
							onChange={this.handlePassword}
							borderColor={ this.props.theme.darkGray } 
							textSize="16"
						/>
					</Layout>
					<Button background={this.props.theme.primaryDefault} onClick={this.handleSubmit}>Login</Button>
				</Layout>
			</Layout>
		)
	}
}
export default Login;