import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Swipper,CategoriesHeader } from "./components/index";
import { Product } from "./screens";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import SubCategories from "./components/SubCategories";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<CategoriesHeader/>}/>
      <Route path="product" element={<Product />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="subcategories/:id" element={<SubCategories />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
