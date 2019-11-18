import * as React from 'react';
import { Button, Layout, Text, Background, UILink } from "../../client/components/ui";
import axios from 'axios';
import { tColor } from "client/types/ui";
import { Link } from "react-router-dom";

interface subscription {
  _id: string,
  subscription_name: string,
  subscription_price: string,
  subscription_speed: string,
  subscription_rate: string,
  subscription_opening_fee: string,
  subscription_type: string, 
}

interface UserData {
  data: {
    createdAt: string
    password: string
    subscriptions: string[]
    updatedAt: string
    username: string
    _id: string
  }
}

interface Props {
  theme?: tColor
  userData: UserData;
  setSubscriptionId: (id: string) => void;
  screenwidth: number;
}

interface State {
  subscriptions: subscription[],
}

class Subscriptions extends React.PureComponent<Props> {
  readonly state: State = {
    subscriptions: [],
  }

  componentDidUpdate(prevProps) {
    // update state when user data changes
    if (prevProps.userData !== this.props.userData) {
      this.getSubscriptions()
    }
  }

  componentDidMount() { 
    this.getSubscriptions()
  }

  componentWillUnmount() { 
    this.setState({ subscription: [] })
  }


  private getSubscriptions = async () => {

    const combinedSubscriptions = []
    // get user data after login passed from props

    const data = this.props.userData ? this.props.userData.data.subscriptions : [];

    if (data && data.length) {
      const querySubscription = async (subscription_id) => {
        const subscriptions = [];

        //make http request to backend for subscriptions list of user
        await axios.get('http://localhost:3001/api/subscriptions/getSubscriptions', {
          params: {
            subscription_id: subscription_id
          },
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
          if (response.status === 200) {
            subscriptions.push(response.data.data);
          }
        })
        .catch(err => { if (err.response.status === 404) {} })
        return subscriptions
      }

      // map through and get subscription based on subscription ID
      const result = data.map(async (id) => {
        return querySubscription(id)
      })

      // resolve above promise and create a list of subscription of user
      Promise.all(result).then(resolved =>  {
        resolved.map((item) => {
          combinedSubscriptions.push(item[0])
        })
        this.setState({ subscriptions : combinedSubscriptions})
      })
    }
  }

  render() {
    return (
      <Layout
        direction="column" 
        sLeft={ this.props.screenwidth >= 768 ? "40" : this.props.screenwidth <= 375 ? "12" : "20" }
        sRight={ this.props.screenwidth >= 768 ? "40" : this.props.screenwidth <= 375 ? "12" : "20" }
        sTop="40" 
        sBottom="40"
        alignItems="center"
      >

        { !!this.state.subscriptions.length &&
            <Layout sBottom="24">
              <Text size="large" height="28">
                
              </Text>
            </Layout>
        }
        <Layout direction="row" wrapped width="1290" alignContent="flex-start">
        { this.state.subscriptions.length ? 
            this.state.subscriptions.map(item => 
            (
              <Layout 
                width="300" 
                sLeft={ this.props.screenwidth >= 768 ? "20" : "12" } 
                sRight={ this.props.screenwidth >= 768 ? "20" : "12" } 
                sTop="20"  key={item._id} expand="1" align="flex-start" 
                >
                <Background color={this.props.theme.verylightGray}>
                  <Layout 
                    direction="column" 
                    align="flex-start" 
                    wrapped
                    borderWidth="4" 
                    borderLeft 
                    borderColor={item.subscription_type === "Phone Subscription" 
                    ? this.props.theme.primaryDefault : this.props.theme.secondaryDefault}
                    >
                    { item.subscription_speed && 
                    <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" border expand="1">
                      <Layout sTop="4" sBottom="4" sLeft="8" sRight="20">
                        <Text weight="800" size="large">{ item.subscription_name }</Text>
                      </Layout>
                    </Layout>
                    }
                    { item.subscription_speed &&
                    <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" border>
                      <Layout sTop="4" sBottom="4" sLeft="8" sRight="20" expand="1">
                        <Text>{ item.subscription_speed }</Text>
                      </Layout>
                    </Layout>
                    }
                    { item.subscription_rate && 
                      <Layout borderColor={this.props.theme.whiteColor} expand="1" borderWidth="2" border>
                        <Layout sTop="4" sBottom="4" sLeft="8" sRight="20">
                          <Text>{ item.subscription_rate }</Text>
                        </Layout>
                      </Layout>
                    }
                    { item.subscription_type && 
                      <Layout borderColor={this.props.theme.whiteColor} expand="1" borderWidth="2" border>
                        <Layout sTop="4" sBottom="4" sLeft="8" sRight="20">
                          <Text>{ item.subscription_type }</Text>
                        </Layout>
                      </Layout>
                    }
                    { item.subscription_price && 
                      <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" border expand="1">
                        <Layout sTop="4" sBottom="4" sLeft="8" sRight="8">
                          <Text size="x-large" weight="800">{ item.subscription_price }</Text>
                        </Layout>
                      </Layout>
                    }
                    <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" expand="1" border >
                      <Layout sTop="8" sBottom="8" sLeft="8" sRight="8" alignItems="flex-end">
                        {/* <Link to={{ pathname: "/details", state: { subscription_id: item._id }}}> */}
                          <Button background={this.props.theme.primaryDefault}>
                            <Text color={this.props.theme.whiteColor} size="small" weight="600">
                              See More
                            </Text>
                          </Button>
                        {/* </Link> */}
                      </Layout>
                    </Layout>
                  </Layout>
                </Background>
              </Layout>
            )
          ) :
          <Layout sLeft="8">
            <Text>No Subscription available for this account</Text>
          </Layout>
          }
        </Layout>
      </Layout>
    )
  }
}

export default Subscriptions;