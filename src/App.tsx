import { Routes, Route } from "react-router-dom";
import BusinessProfile from "@/pages/BusinessProfile";
import RestaurantProfile from "@/pages/RestaurantProfile";
import BusinessLogin from "@/pages/BusinessLogin";
import ConsumerLogin from "@/pages/ConsumerLogin";
import Index from "@/pages/Index";
import RegisterComplaint from "@/pages/RegisterComplaint";
import VerifyLicense from "@/pages/VerifyLicense";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/business-login" element={<BusinessLogin />} />
      <Route path="/consumer-login" element={<ConsumerLogin />} />
      <Route path="/business-profile/:licenseNumber" element={<BusinessProfile />} />
      <Route path="/restaurant-profile/:licenseNumber" element={<RestaurantProfile />} />
      <Route path="/register-complaint" element={<RegisterComplaint />} />
      <Route path="/verify-license" element={<VerifyLicense />} />
    </Routes>
  );
}

export default App;