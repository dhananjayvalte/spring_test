import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  Router,
  Routes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import CartContext from "./Context/CartContext";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const routs = [
  {
    path: "/",
    component: lazy(() => import("./Pages/ProductList")),
  },
  {
    path: "/login",
    component: lazy(() => import("./Pages/Login")),
  },
  {
    path: "/add-item",
    component: lazy(() => import("./Pages/Admin/AddProduct")),
    isAuth: true,
    isAdmin: true,
  },
  {
    path: "delete-item",
    isAuth: true,
    isAdmin: true,
    component: lazy(() => import("./Pages/Admin/DeleteProduct")),
  },
  {
    path: "/update-item",
    component: lazy(() => import("./Pages/Admin/EditProduct")),
    isAuth: true,
    isAdmin: true,
  },
  {
    path: "/product-list",
    component: lazy(() => import("./Pages/ProductList")),
    isAuth: true,
    isAdmin: false,
  },
  {
    path: "/checkout",
    component: lazy(() => import("./Pages/Checkout")),
    isAuth: true,
    isAdmin: false,
  },
];

function App() {
  return (
    <div style={{ padding: 16 }}>
      <CartContext>
        <BrowserRouter>
          <Suspense fallback={<span>Loading...</span>}>
            <Routes>
              {routs.map((data, i) => {
                const Component = data.component;
                return (
                  <Route
                    key={i}
                    path={data.path}
                    element={
                      <Layout>
                        <Component />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartContext>
    </div>
  );
}

export default App;

export function Layout(props) {
  const navigator = useNavigate();

  return (
    <div>
      <Box textAlign={"right"}>
        <Button
          onClick={() => {
            navigator("/login");
          }}
        >
          Logout
        </Button>
      </Box>
      {props.children}
    </div>
  );
}
