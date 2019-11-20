import * as React from 'react';
import { Layout, Text, Background } from "../../client/components/ui";
import axios from 'axios';
import { UserData, tColor } from "client/types/ui";

interface subscription {
  _id: string,
  subscription_name: string,
  subscription_price: string,
  formattedName: string,
  subscription_speed: string,
  subscription_rate: string,
  subscription_opening_fee: string,
  subscription_type: string, 
}

interface Props {
  theme?: tColor
  userData: UserData;
  setSubscriptionId?: (id: string) => void;
  screenwidth: number;
}

interface State {
  subscriptions: subscription[],
  isLoading: boolean,
}

class Subscriptions extends React.PureComponent<Props> {
  readonly state: State = {
    subscriptions: [],
    isLoading: true
  }

  componentDidUpdate(prevProps) {
    // update state when user data changes
    if (prevProps.userData !== this.props.userData) {
      this.getSubscriptions();
    }
  }

  componentDidMount() { 
    this.getSubscriptions();
  }

  componentWillUnmount() { 
    this.setState({ subscription: [] });
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
        .catch(err => { if (err.response.status === 404) { return } })
        return subscriptions
      }

      // map through and get subscription based on subscription ID
      const result = data.map(async (id) => {
        return querySubscription(id)
      })

      // resolve above promise and create a list of subscriptions of user
      Promise.all(result).then(resolved =>  {
        setTimeout(() => {
          this.setState({ isLoading: false });
          resolved.map((item) => {
            combinedSubscriptions.push(item[0])
          })
          this.setState({ subscriptions : combinedSubscriptions})
        }, 1000)
        
      })
    }
  }

  render() {
    console.log(this.state.subscriptions)
    return (
      <Layout
        direction="column" 
        sLeft={ this.props.screenwidth >= 768 ? "40" : this.props.screenwidth <= 375 ? "12" : "20" }
        sRight={ this.props.screenwidth >= 768 ? "40" : this.props.screenwidth <= 375 ? "12" : "20" }
        sTop="40" 
        sBottom="40"
        fullHeight
        alignItems="center"
      >
        { (this.props.userData && !this.state.isLoading) && (
          <React.Fragment>
            <Layout align="flex-start" direction="row">
              { (this.props.userData.data.firstname) && 
                <Layout sRight="4">
                  <Text size="medium" height="28">
                    { this.props.userData.data.firstname}
                  </Text>
                </Layout>
                }
              { (this.props.userData.data.surname ) &&
                ( <Text size="medium" height="28">
                    { this.props.userData.data.surname }
                  </Text>
                )
              }
            </Layout>
            <Layout align="flex-start" direction="row">
            { (this.props.userData.data.address) && 
              <Layout sRight="4">
                <Text size="medium" height="28">
                  { this.props.userData.data.address}
                </Text>
              </Layout>
              }
          </Layout>
          <Layout align="flex-start" direction="row">
            { (this.props.userData.data.phone) && 
              <Layout sRight="4">
                <Text size="medium" height="28">
                  { this.props.userData.data.phone}
                </Text>
              </Layout>
              }
          </Layout>
        </React.Fragment>
         )}
        <Layout direction="row" wrapped width="1290" alignContent="flex-start">
        { (!!this.state.subscriptions.length && !this.state.isLoading) &&
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
                    { item.subscription_name && 
                    <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" border expand="1">
                      <Layout sTop="4" sBottom="4" sLeft="8" sRight="20">
                        <Text weight="800" size="large">{ item.subscription_name }</Text>
                      </Layout>
                    </Layout>
                    }
                    { item.formattedName && 
                    <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" border expand="1">
                      <Layout sTop="4" sBottom="4" sLeft="8" sRight="20">
                        <Text weight="800" size="large">{ item.formattedName }</Text>
                      </Layout>
                    </Layout>
                    }
                    {/* { item.subscription_speed &&
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
                    } */}
                    {/* <Layout borderColor={this.props.theme.whiteColor} borderWidth="2" expand="1" border >
                      <Layout sTop="8" sBottom="8" sLeft="8" sRight="8" alignItems="flex-end">
                        <Link to={{ pathname: "/details", state: { subscription_id: item._id }}}>
                          <Button background={this.props.theme.primaryDefault}>
                            <Text color={this.props.theme.whiteColor} size="small" weight="600">
                              See More
                            </Text>
                          </Button>
                        </Link>
                      </Layout>
                    </Layout> */}
                  </Layout>
                </Background>
              </Layout>
            )
          )}
          { (!this.state.isLoading && !this.state.subscriptions.length) && 
            <Layout sLeft="8">
              <Text>No Subscription available for this account</Text>
            </Layout>
          }
          {
            (this.state.isLoading && !this.state.subscriptions.length) && 
            <svg className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
          }
        </Layout>
      </Layout>
    )
  }
}

export default Subscriptions;