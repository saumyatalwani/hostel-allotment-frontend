import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginForm } from './routes/login';
import Root from './routes/root';
import Dashboard from './routes/dash';
import RoomSelect from './routes/roomSelect';
import DocumentUpload from "./routes/docUpload";
import HostelIDForm from "./routes/hostelidform";
import ComplaintForm from "./routes/complaintform";
import FinalSelect from "./routes/finalRoomSelection";
import AdminDashboard from "./routes/admin/dash";
import Batch from "./routes/admin/batch";
import BlockAssignment from "./routes/admin/blockG";
import UserDisplay from "./routes/admin/users";
import IdDetails from "./routes/admin/IdDetails";
import ComplaintDetails from "./routes/admin/complaint";
import Layout from "./layout";

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard/>,
        },
        {
          path : '/roomSelect',
          element : <RoomSelect />
        },
        {
          path : '/finalize',
          element : <FinalSelect />
        },
        {
          path: "/upload",
          element: <DocumentUpload />,
        },
        {
          path: "/idForm", // 
          element: <HostelIDForm />,
        },
        {
          path: "/complaintForm", // 
          element: <ComplaintForm />,
        },
        {
          path:"/admin",
          element: <AdminDashboard />
        },
        {
          path:"/batchAssign",
          element: <Batch />
        },
        {
          path:"/blockGender",
          element: <BlockAssignment />
        },
        {
          path:"/users",
          element: <UserDisplay />
        },
        {
          path:"/hostelID",
          element: <IdDetails />
        },
        {
          path:"/complaints",
          element: <ComplaintDetails />
        }
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginForm />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForAuthenticatedOnly,
    ...(!token ? routesForNotAuthenticatedOnly : []),
  ]);
  

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;