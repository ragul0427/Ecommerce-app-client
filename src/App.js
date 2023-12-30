import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { CategoriesHeader,SubCategories,ExploreCategories, ExploreProduct, Cart } from "./components";
import { Product } from "./screens";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/forgotPassword";
import PasswordReset from "./Authentication/passwordReset";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<CategoriesHeader/>}/>
      <Route path="product" element={<Product />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="subcategories/:id" element={<SubCategories />} />
      <Route path="ExploreCategories/:id" element={<ExploreCategories />} />
      <Route path="ExploreProduct/:id" element={<ExploreProduct />} />
      <Route path="Cart/:id" element={<Cart />} />
      <Route path="password_reset" element={<PasswordReset />} />
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
