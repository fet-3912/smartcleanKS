import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CleaningList from './pages/CleaningList';
import ReportCenter from './pages/ReportCenter';
import Settings from './pages/Settings';
import AccountPermissions from './pages/AccountPermissions';
import ConnectionStatus from './pages/ConnectionStatus';
import UrgentCleaningForm from './pages/mobile/UrgentCleaningForm';
import UrgentCleaningSuccess from './pages/mobile/UrgentCleaningSuccess';
import CleaningReportListMobile from './pages/mobile/CleaningReportListMobile';
import AddCleaningReport from './pages/mobile/AddCleaningReport';
import PendingCleaningDetail from './pages/mobile/PendingCleaningDetail';
import CleaningInProgressDetail from './pages/mobile/CleaningInProgressDetail';
import CleaningCompleteModal from './pages/mobile/CleaningCompleteModal';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 px-8 py-8 flex flex-col gap-8">
        <div className="w-full h-px bg-gray-300" />
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mobile routes (no sidebar) */}


        {/* Desktop routes (with sidebar) */}
        <Route path="/" element={<Navigate to="/mobile/urgent-cleaning" replace />} />
        <Route path="/mobile/urgent-cleaning" element={<Layout><UrgentCleaningForm /></Layout>} />
        <Route path="/mobile/urgent-cleaning/success" element={<Layout><UrgentCleaningSuccess /></Layout>} />
        <Route path="/mobile/cleaning-list" element={<Layout><CleaningReportListMobile /></Layout>} />
        <Route path="/mobile/cleaning-list/add" element={<Layout><AddCleaningReport /></Layout>} />
        <Route path="/mobile/cleaning-list/pending" element={<Layout><PendingCleaningDetail /></Layout>} />
        <Route path="/mobile/cleaning-list/in-progress" element={<Layout><CleaningInProgressDetail /></Layout>} />
        <Route path="/mobile/cleaning-list/complete" element={<Layout><CleaningCompleteModal /></Layout>} />
        <Route path="/cleaning-list" element={<Layout><CleaningList /></Layout>} />
        <Route path="/reports" element={<Layout><ReportCenter /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/accounts" element={<Layout><AccountPermissions /></Layout>} />
        <Route path="/connection-status" element={<Layout><ConnectionStatus /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
