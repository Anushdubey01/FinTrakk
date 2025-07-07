"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/providers/toast-provider"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  preferences: {
    currency: string
    language: string
    theme: string
    notifications: {
      budgetAlerts: boolean
      weeklyReports: boolean
      transactionReminders: boolean
      marketingEmails: boolean
    }
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("fintrakk-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    setTimeout(checkAuth, 1000) // Simulate network delay
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        avatar: "/placeholder-user.jpg",
        phone: "+91 98765 43210",
        preferences: {
          currency: "INR",
          language: "en",
          theme: "system",
          notifications: {
            budgetAlerts: true,
            weeklyReports: true,
            transactionReminders: false,
            marketingEmails: false,
          },
        },
      }

      setUser(mockUser)
      localStorage.setItem("fintrakk-user", JSON.stringify(mockUser))
      showToast("Welcome back!", "success")
    } catch (error) {
      showToast("Login failed. Please try again.", "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: "1",
        name,
        email,
        preferences: {
          currency: "INR",
          language: "en",
          theme: "system",
          notifications: {
            budgetAlerts: true,
            weeklyReports: true,
            transactionReminders: false,
            marketingEmails: false,
          },
        },
      }

      setUser(mockUser)
      localStorage.setItem("fintrakk-user", JSON.stringify(mockUser))
      showToast("Account created successfully!", "success")
    } catch (error) {
      showToast("Signup failed. Please try again.", "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fintrakk-user")
    showToast("Logged out successfully", "success")
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("fintrakk-user", JSON.stringify(updatedUser))
      showToast("Profile updated successfully!", "success")
    } catch (error) {
      showToast("Failed to update profile", "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
