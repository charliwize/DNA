import React, { Fragment } from "react";
import { Background, Button, Icon, Image, Layout, Text, UILink } from "../../ui";
import { dna_logo, header_bg } from "../../../assets";
import { tColor } from "client/types/ui";

interface Props {
	theme: tColor,
	isLoggedIn: boolean,
	changeRoute: (a: boolean) => void;
	username: string;
}

const Header = (props: Props) => {
  return (
		<Background color={props.theme.blackColor} src={header_bg} size="cover">
			<Layout sLeft="48" sBottom="12">
				<Layout height="70" direction="row">
					<Layout width="70">
						<Image src={dna_logo} />
					</Layout>
					<Layout direction="column" expand="1" alignItems="flex-end">
						<Layout sTop="8" sRight="20" direction="row">
							{ props.isLoggedIn &&
							<Fragment>
								{
								props.username &&
									<Fragment>
									<Text color={props.theme.whiteColor} size="small">Welcome</Text>
									<Layout sLeft="4" sRight="8">
										<Text color={props.theme.whiteColor} size="small">
											{props.username}
										</Text>
									</Layout>
									</Fragment>
								}
								<UILink href="/login" onClick={() => props.changeRoute(false)}>
									<Text color={props.theme.whiteColor} size="small">
										[ Logout ]
									</Text>
								</UILink>
							</Fragment>}
						</Layout>
					</Layout>
				</Layout>
				<Layout align="flex-start">
					<Layout sTop="18">
						<Layout noFlex>
							<Text size="medium" color={props.theme.whiteColor}>
								My Services
							</Text>
							<Text size="xx-large" color={props.theme.whiteColor} weight="600">
								Subscriptions
							</Text>
						</Layout>
					</Layout>
				</Layout>
				<Layout noFlex sTop="24" align="flex-start">
					<Button>
						<Layout direction="row">
							<Layout>
								<Icon type="profile" color={props.theme.blackColor}/>
							</Layout>
							<Layout sLeft="4">
								<Text color={props.theme.blackColor}>My service</Text>
							</Layout>
						</Layout>
					</Button>
				</Layout>
			</Layout>
		</Background>
	)
}
export default Header