"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShoppingBag,
  Car,
  Home,
  Coffee,
  Gamepad2,
} from "lucide-react"

interface DashboardProps {
  onAddTransaction: () => void
}

const pieData = [
  { name: "Food & Dining", value: 35, color: "#8B5CF6" },
  { name: "Transportation", value: 25, color: "#06B6D4" },
  { name: "Shopping", value: 20, color: "#10B981" },
  { name: "Entertainment", value: 12, color: "#F59E0B" },
  { name: "Others", value: 8, color: "#EF4444" },
]

const lineData = [
  { name: "Jan", income: 85000, expenses: 48000 },
  { name: "Feb", income: 75000, expenses: 35000 },
  { name: "Mar", income: 90000, expenses: 65000 },
  { name: "Apr", income: 82000, expenses: 58000 },
  { name: "May", income: 88000, expenses: 62000 },
  { name: "Jun", income: 92000, expenses: 55000 },
]

const recentTransactions = [
  {
    id: 1,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    amount: -450,
    date: "2024-01-15",
    icon: Coffee,
    type: "expense",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 85000,
    date: "2024-01-15",
    icon: Wallet,
    type: "income",
  },
  {
    id: 3,
    description: "Uber Ride",
    category: "Transportation",
    amount: -280,
    date: "2024-01-14",
    icon: Car,
    type: "expense",
  },
  {
    id: 4,
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -2500,
    date: "2024-01-14",
    icon: ShoppingBag,
    type: "expense",
  },
  {
    id: 5,
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -649,
    date: "2024-01-13",
    icon: Gamepad2,
    type: "expense",
  },
  {
    id: 6,
    description: "Rent Payment",
    category: "Housing",
    amount: -25000,
    date: "2024-01-01",
    icon: Home,
    type: "expense",
  },
]

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < value) {
        setCount(Math.min(count + Math.ceil((value - count) / 10), value))
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [count, value])

  return (
    <span>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  )
}

export function Dashboard({ onAddTransaction }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredTransactions = recentTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === "all" || transaction.category.toLowerCase().includes(filterCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <Button
          onClick={onAddTransaction}
          className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </motion.div>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardHeader className="relative">
              <CardDescription className="text-violet-100">Total Balance</CardDescription>
              <CardTitle className="text-3xl font-bold">
                ₹<AnimatedCounter value={485000} />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center text-violet-100">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardHeader className="relative">
              <CardDescription className="text-emerald-100">Monthly Income</CardDescription>
              <CardTitle className="text-3xl font-bold">
                ₹<AnimatedCounter value={85000} />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center text-emerald-100">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm">+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-red-600 text-white border-0 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardHeader className="relative">
              <CardDescription className="text-rose-100">Monthly Expenses</CardDescription>
              <CardTitle className="text-3xl font-bold">
                ₹<AnimatedCounter value={48000} />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center text-rose-100">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span className="text-sm">-3.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                Expense Categories
              </CardTitle>
              <CardDescription>Breakdown of your spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                Income vs Expenses
              </CardTitle>
              <CardDescription>Monthly comparison over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: any) => [`₹${value.toLocaleString("en-IN")}`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px] bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === "income"
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <transaction.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
