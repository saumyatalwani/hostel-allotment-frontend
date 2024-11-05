import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginForm } from './routes/login';
import Root from './routes/root';
import Dashboard from './routes/dash';
import RoomSelect from './routes/roomSelect';

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  /*
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard/>,
        },
        {
          path : '/roomSelect',
          element : <RoomSelect />
        }
      ],
    },
  ];*/

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
    {
      path : '/roomSelect',
      element : <RoomSelect />
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    //...routesForAuthenticatedOnly,
    //...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForNotAuthenticatedOnly
  ]);
  

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;