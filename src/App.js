import React, { Suspense } from "react";
import { lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantsMenus from "./components/RestaurantsMenus";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Config Driven UI

const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
};

const GroceyPreview = lazy(() => import("./components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // this is a parent component
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantsMenus />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <GroceyPreview />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return <AppComponent />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
