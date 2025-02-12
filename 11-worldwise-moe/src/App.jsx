import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./junk/Product.jsx";
import Homepage from "./junk/Homepage.jsx";
import Pricing from "./junk/Pricing.jsx";
import PageNotFound from "./junk/PageNotFound.jsx";
import AppLayout from "./junk/AppLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
