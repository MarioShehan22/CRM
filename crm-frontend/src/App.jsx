import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadForm from "./pages/LeadForm";
import LeadDetails from "./pages/LeadDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadSources from "./pages/LeadSources.jsx";
import LeadStatuses from "./pages/LeadStatuses.jsx";
import Salespersons from "./pages/Salespersons.jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leads"
                element={
                    <ProtectedRoute>
                        <Leads />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leads/create"
                element={
                    <ProtectedRoute>
                        <LeadForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leads/edit/:id"
                element={
                    <ProtectedRoute>
                        <LeadForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/leads/:id"
                element={
                    <ProtectedRoute>
                        <LeadDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/lead-sources"
                element={
                    <ProtectedRoute>
                        <LeadSources />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/lead-statuses"
                element={
                    <ProtectedRoute>
                        <LeadStatuses />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/salespersons"
                element={
                    <ProtectedRoute>
                        <Salespersons />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;