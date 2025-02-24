import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

// import Product from "./pages/Product.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Login from "./pages/Login.jsx";

import CityList from "./components/CityList/CityList.jsx";
import CountryList from "./components/CountryList/CountryList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/Form/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage.jsx";

//import() funkcijata vaka pishana e dynamic import funkcija od JS
//So pomosh na lazy loading, ke gi loadirame ovie page components
//kako shto ni trebaat, taka gi loadirame, namesto site odednash
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

//BUILD before bundle size optimization:
// dist/index.html                   1.16 kB │ gzip:   0.50 kB
// dist/assets/index-d645b37d.css   30.19 kB │ gzip:   5.05 kB
// dist/assets/index-35527d2d.js   549.48 kB │ gzip: 160.94 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />s
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  // ProtectedRoute nema dd dozvoli da odime vo <AppLayout/> ako
                  //ne sme logirani, t.e. isAuthenticated === true
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Index route se pokazuva po default, koga ke ja otvoris Rutata*/}
                {/* replace -> se pishuva za <- back kopcheto da raboti na 
          web browserot */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                {/* Koga aplikacijata ke go naceka ovoj url cities/(something) 
          ke go aktivira ovoj route,  za da stignes do ovoj route treba
          da imas <Link></Link> do nego*/}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
export default App;
