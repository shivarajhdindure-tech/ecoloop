import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { UpcomingModulePage } from './pages/UpcomingModulePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sell"
        element={
          <UpcomingModulePage
            badge="Upcoming Module — Device Intake"
            title="Sell Your E-Waste & Get Smart Valuation"
            description="Interactive device listing, image diagnostics, and verified partner offers will launch in the next implementation phase."
            plannedCapabilities={[
              'Guided smartphone, laptop, and component condition intake',
              'Smart valuation preview backed by Cloud Firestore & Express API',
              'Doorstep pickup slot scheduling with verified EcoLoop collectors',
            ]}
          />
        }
      />
      <Route
        path="/marketplace-preview"
        element={
          <UpcomingModulePage
            badge="Upcoming Module — Certified Marketplace"
            title="EcoLoop Refurbished Marketplace"
            description="Live inventory browsing, grading certificates, and secure checkout are scheduled after authentication and backend API integration."
            plannedCapabilities={[
              'Verified refurbished laptops, smartphones, and eco-certified accessories',
              'Detailed diagnostic reports and warranty metadata per device',
              'Protected checkout and rewards wallet redemption in upcoming phases',
            ]}
          />
        }
      />
      <Route
        path="/partner-apply"
        element={
          <UpcomingModulePage
            badge="Upcoming Module — Partner Network"
            title="Collector, Refurbisher & Recycler Onboarding"
            description="Business partner registration, compliance verification, and pickup dispatch dashboards will be enabled alongside Firebase Authentication."
            plannedCapabilities={[
              'Authorized recycler and refurbisher license verification workflow',
              'Inbound device manifests and scheduled route management',
              'Compliance reporting and circular recovery tracking',
            ]}
          />
        }
      />
      <Route
        path="/auth/signin"
        element={
          <UpcomingModulePage
            badge="Upcoming Module — Authentication"
            title="EcoLoop Sign In"
            description="Firebase Authentication for customers, partners, and administrators will be integrated in the next phase."
            plannedCapabilities={[
              'Role-aware access for Customers, Partners, and Admins',
              'Secure Firebase ID token verification with the Express API',
              'No credentials or authentication forms are active in Phase 2',
            ]}
          />
        }
      />
      <Route
        path="/auth/get-started"
        element={
          <UpcomingModulePage
            badge="Upcoming Module — Onboarding"
            title="Get Started with EcoLoop"
            description="Account creation for households selling e-waste or shopping refurbished electronics, and onboarding for circular partners, is coming next."
            plannedCapabilities={[
              'Customer onboarding to list devices, schedule pickups, and track rewards',
              'Partner onboarding for certified collectors, refurbishers, and recyclers',
              'Unified EcoLoop wallet & circular impact dashboard',
            ]}
          />
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
