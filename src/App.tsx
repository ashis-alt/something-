import { Routes, Route } from "react-router-dom";
import BusinessProfile from "@/pages/BusinessProfile";
import RestaurantProfile from "@/pages/RestaurantProfile";

function App() {
  return (
    <Routes>
      <Route path="/business-profile/:licenseNumber" element={<BusinessProfile />} />
      <Route path="/restaurant-profile/:licenseNumber" element={<RestaurantProfile />} />
    </Routes>
  );
}

export default App;
