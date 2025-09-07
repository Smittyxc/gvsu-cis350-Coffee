import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Demo from "./demo"; // Assuming you have a Home component
import RadarDemo from "./components/radarDemo";
import { ShadcnDemo } from "./components/shadcnDemo";
import Timer from "./components/timer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Demo />,
  },
  {
    path: "/radar",
    element: <RadarDemo />
  },
  {
    path: "/shadcn",
    element: <ShadcnDemo />
  },
  {
    path: "/timer",
    element: <Timer />
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;