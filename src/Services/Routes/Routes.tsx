import React, { lazy, FC, useMemo, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import containers from "../../Modules";
import { NavigationScroll } from "../../Layout/NavigationScroll";
import { LazyLoader } from "../../Components/Loader/LazyLoader";
import Themes from '../../Themes/Components/Theme';

import { useAppSelector } from "../../Services/Hook/Hook";
import { getCustomizationState } from "../../Themes/Reducer/customizationActions";

import { getAuthUser } from "../Methods/AuthMethods";
// import { config } from '../Config/Config';

import { AuthLayout } from '../../Layout/AuthLayout';
import { MainLayout } from '../../Layout/MainLayout';


type PropType = {
  component: React.FC;
  auth: boolean;
};

export const GeneralRoutes = React.memo(() => {
  const Login = lazy(() => import("../../Modules/Auth/Views/Login"));
  const customizationState = useAppSelector(getCustomizationState);

  const PrivateRoute: FC<PropType> = ({ component: Component, auth: Auth }) => {
    if (Auth) {
      const data=getAuthUser();
      if (data) { return <Component />; }
      else { return <Navigate to="/login" />; }
    }
    return <Component />;
  };

  const renderGeneratedRoutes = useMemo(() => {
    let element = [];
    for (let data in containers) {
      let router = containers[data].router;
      let moduleName = containers[data].moduleName;
      // let parentModuleName = containers[data].moduleName;

      for (let item of router) {
        let elementPath = item.elementPath;
        let auth = item.auth;

        if (moduleName && elementPath) {
          const generated = lazy(() => import(`../../Modules/${moduleName}/Views/${elementPath}.tsx`));     /* @vite-ignore */
          console.log(generated,"generated");
          
          element.push(
            <Routes key={elementPath}>
              {item.path === "/login" &&
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                </Route>}
              {item.path !== "/login" &&
                <Route element={<MainLayout />}>
                  <Route
                    path={item.path}
                    element={<PrivateRoute component={generated} auth={auth} />}
                  />
                </Route>}
            </Routes>
          );
        }
      }

    }
    return element;
  }, [window?.location?.pathname]);

  return (
    // <BrowserRouter basename={config.basename}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Themes(customizationState)}>
          <CssBaseline />
          <NavigationScroll>
            <Suspense fallback={<LazyLoader />}>
              <>
                {renderGeneratedRoutes}
              </>
            </Suspense>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
});
