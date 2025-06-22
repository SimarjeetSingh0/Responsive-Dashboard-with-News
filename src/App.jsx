import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/common/Navbar'
import Loading from './components/common/Loading'
import ErrorBoundary from './components/common/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PayoutCalculator from './pages/PayoutCalculator'
import NewsAnalytics from './pages/NewsAnalytics'
import ExportData from './pages/ExportData'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/calculator" 
                  element={
                    <PrivateRoute>
                      <PayoutCalculator />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <PrivateRoute>
                      <NewsAnalytics />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/export" 
                  element={
                    <PrivateRoute>
                      <ExportData />
                    </PrivateRoute>
                  } 
                />

                {/* Catch all route - redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App