"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"
import { TransactionHistoryPage } from "@/components/pages/transaction-history"
import { BudgetsGoalsPage } from "@/components/pages/budgets-goals"
import { AnalyticsPage } from "@/components/pages/analytics"
import { ProfilePage } from "@/components/pages/profile"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { Navigation } from "@/components/layout/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider, useAuth } from "@/components/providers/auth-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { LoadingScreen } from "@/components/ui/loading-screen"

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [showAddModal, setShowAddModal] = useState(false)

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onAddTransaction={() => setShowAddModal(true)} />
      case "transactions":
        return <TransactionHistoryPage />
      case "budgets":
        return <BudgetsGoalsPage />
      case "analytics":
        return <AnalyticsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <Dashboard onAddTransaction={() => setShowAddModal(true)} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} onAddClick={() => setShowAddModal(true)} />

      <main className="container mx-auto px-4 pb-20 md:pb-8 pt-20 md:pt-6">{renderCurrentPage()}</main>

      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}

export default function FinTrakkApp() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
