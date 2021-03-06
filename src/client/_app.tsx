import { AppContainer, setConfig } from 'react-hot-loader';
import  React, { useState, useEffect, useRef, Fragment } from 'react';
import * as ReactDOM from "react-dom";
import { Header } from "../client/components/widgets"
import './style.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { Subscriptions, Login, Details } from "../client/pages";
import * as styledComponents from 'styled-components';
import axios from 'axios';

import { tColor } from "client/types/ui"

// setConfig({
//   reloadHooks: false,
// });

const {
  ThemeProvider,
} = styledComponents;


const theme: tColor = {
	blackColor: "#000000",
	veryDarkGray: "#333333",
	verylightGray: "#f8f8f8",
  whiteColor: "#ffffff",
  primaryDefault: "#ff007c",
  secondaryDefault: "#067f92",
	error: "#940718",
  success: "#025c1e",
  warning: "#d0860A",
	darkGray: "#666666",
}

const getCookie = (cookiename: string) => {
  var cookieArr = document.cookie.split(";");
    // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if(cookiename == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
    }
  }
 return null;
}


const App = (props) => {
  const [data, setData]: any = useState();
  const [loggedIn, setLoggedIn]: any = useState<boolean>(undefined);
  const [width, setWidth]: any = useState(window.innerWidth);
  const value = getCookie("loggedIn");
  const username = getCookie("username");
  useEffect(() => {

    const abortController = new AbortController();
    if (value === "true") {
      setLoggedIn(true)
      getData()
    }
    // clean subscription after this effecr
    return () => {
      abortController.abort();
    };
  }, []);

  usePrevious(data);

  // listen for window resizing and set screen width accordingling
  useEffect(() => {
    if (!data && loggedIn) {
      getData()
    }
    window.addEventListener("resize", setSreensize);
    return () => {
      window.removeEventListener("resize", setSreensize);
      new AbortController().abort();
    };
  })

  const setSreensize = () => {
    setWidth(window.innerWidth)
  }

  function usePrevious(value) {
    const abortController = new AbortController();

    const ref = useRef();
    // Store current data in ref
    useEffect(() => {
      ref.current = value;
      if(!ref.current) {
        getData()
      }

      return () => {
        abortController.abort();
      };

    }, [value]); // only runs when value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  // TODO show handle details page scription ID
  // function setSubscriptionInfo(id: string) {
    
  // }

  function changeRoute(status?: boolean) {
    setLoggedIn(status) 
    if (!status) {
      document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }

  // get user data after login for data to be persistent
  async function getData() {
    await axios.get(`http://localhost:3001/api/users/getUsers/`, { 
      params: {
        username: username
      },
      headers: {'Content-Type': 'application/json'}
    }
    ).then(res => {
      if (res.status === 200) {
        const data = res.data
        setData(data)
      }
    }).catch((err => {
      return 
    }))
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/subscription" render={()=> (
            loggedIn ?
              <Fragment>
                <Header 
                  theme={theme} 
                  isLoggedIn 
                  changeRoute={changeRoute} 
                  username={username} screenwidth={width}/>
                <Subscriptions 
                  theme={theme} 
                  userData={data} 
                  screenwidth={width} />
              </Fragment>
              : <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}/>
            )}>
          </Route>
          <Route path="/login" render={() => (
            !loggedIn ? 
              <Login theme={theme} changeRoute={changeRoute} loggedIn={loggedIn}/>
            : <Redirect to={{
                pathname: '/subscription',
                state: { from: props.location }
              }}/>
            )}>
          </Route>
          <Route path="/" render={() => (
            <Redirect to={{
              pathname: '/subscription',
              state: { from: props.location }
            }}/>
          )}>
          </Route>            
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

const render = (Component) => {
  
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>, document.getElementById('app')
  );
}

if (module.hot) {
  module.hot.accept();
  render(App);
}
