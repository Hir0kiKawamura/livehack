import React, { createContext, useCallback, useContext, useMemo } from "react";
import { TopPageForm } from "./components/Top/TopPageForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./Interfaces";
import useMedia from "use-media";
import { LivePageForm } from "./components/Live/LivePageForm";
import { useReducer } from "react";

const mediaQueries = {
  mobile: "(max-width: 599px)",
  tablet: "(min-width: 600px) and (max-width: 959px)",
  pc: "(min-width: 960px)",
};

const MediaQueryContext = createContext<Context>({
  isMobileSite: false,
  isTabletSite: false,
  isPcSite: true,
});

export type Action = {
  type: string,
  data: any
}

export type actionTypes =
  {
    type: "",
    data: {}
  } |
  {

  }

const reducer = ({ menuAnchorEl, windowDimensions, prefecture, infoLists }: any, action: Action) => {
  switch (action.type) {
    case "windowresize":
      return { menuAnchorEl, windowDimensions: action.data, prefecture, infoLists }
    case "menuAnchorToggle":
      return { menuAnchorEl: !action.data, windowDimensions, prefecture, infoLists }
    case "clickPrefecture":
      return { menuAnchorEl, windowDimensions, prefecture: action.data, infoLists }
  }

  return { menuAnchorEl, windowDimensions, prefecture, infoLists }
}

const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, {
    menuAnchorEl: null,
    windowDimensions: {
      height: window.innerHeight,
      width: window.innerWidth
    },
    prefecture: {
      name_ja: "",
      id: ""
    },
    infoLists: [{
      title: "",
      annotation: ""
    }]
  });

  const isMobileSite = useMedia(mediaQueries.mobile);
  const isTabletSite = useMedia(mediaQueries.tablet);
  const isPcSite = useMedia(mediaQueries.pc);
  const value = useMemo(() => ({ isMobileSite, isTabletSite, isPcSite }), [
    isMobileSite,
    isTabletSite,
    isPcSite,
  ]);

  //値とアクションタイプを引数にdispatchする
  const setDataFunc = useCallback((action: Action) => {
    dispatch(action);
  }, []);

  return (
    <MediaQueryContext.Provider value={value} >
      <Router>
        <Switch>
          <Route path="/" exact>
            <TopPageForm dispatch={dispatch} state={state} />
          </Route>
          <Route path="/Top">
            <TopPageForm dispatch={dispatch} state={state} />
          </Route>
          <Route path="/Live">
            <LivePageForm dispatch={dispatch} state={state} />
          </Route>
        </Switch>
      </Router>
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = (): Context => useContext(MediaQueryContext);

export default App;
