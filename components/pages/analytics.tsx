"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
  BarChart,
  Bar,
  Area,
  AreaChart,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChartIcon,
  Calendar,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const expenseData = [
  { name: "Food & Dining", value: 35, amount: 42000, color: "#8B5CF6" },
  { name: "Transportation", value: 25, amount: 28500, color: "#06B6D4" },
  { name: "Shopping", value: 20, amount: 22800, color: "#10B981" },
  { name: "Entertainment", value: 12, amount: 13680, color: "#F59E0B" },
  { name: "Others", value: 8, amount: 9120, color: "#EF4444" },
]

const monthlyData = [
  { month: "Jan", income: 85000, expenses: 62000, savings: 23000 },
  { month: "Feb", income: 78000, expenses: 58000, savings: 20000 },
  { month: "Mar", income: 92000, expenses: 68000, savings: 24000 },
  { month: "Apr", income: 88000, expenses: 64000, savings: 24000 },
  { month: "May", income: 90000, expenses: 66000, savings: 24000 },
  { month: "Jun", income: 95000, expenses: 70000, savings: 25000 },
]

const weeklySpendingData = [
  { week: "Week 1", amount: 15200 },
  { week: "Week 2", amount: 12800 },
  { week: "Week 3", amount: 18500 },
  { week: "Week 4", amount: 14200 },
]

const categoryTrendData = [
  { month: "Jan", food: 11200, transport: 6300, shopping: 5200, entertainment: 3150 },
  { month: "Feb", food: 9800, transport: 5600, shopping: 7000, entertainment: 3850 },
  { month: "Mar", food: 12250, transport: 6650, shopping: 6300, entertainment: 3325 },
  { month: "Apr", food: 10850, transport: 5950, shopping: 7700, entertainment: 4200 },
  { month: "May", food: 11900, transport: 7000, shopping: 5600, entertainment: 3500 },
  { month: "Jun", food: 12600, transport: 7350, shopping: 6650, entertainment: 4550 },
]

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0)
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.savings, 0)
  const avgMonthlySpending = totalExpenses / monthlyData.length

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value?.toLocaleString("en-IN")}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Detailed insights into your financial patterns</p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Income</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{totalIncome.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-emerald-600 mr-1" />
                <span className="text-emerald-600">+12.5%</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    ₹{totalExpenses.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-red-600">-3.2%</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Savings</p>
                  <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    ₹{totalSavings.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <Target className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpRight className="w-4 h-4 text-violet-600 mr-1" />
                <span className="text-violet-600">+8.7%</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Avg Monthly</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ₹{Math.round(avgMonthlySpending).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <DollarSign className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-slate-600 dark:text-slate-400">Monthly spending average</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-violet-500" />
                Expense Breakdown
              </CardTitle>
              <CardDescription>Distribution of spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {expenseData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Income vs Expenses Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-500" />
                Income vs Expenses
              </CardTitle>
              <CardDescription>Monthly financial flow comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.6}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle>Weekly Spending Pattern</CardTitle>
              <CardDescription>Average spending by week of the month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklySpendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle>Category Trends</CardTitle>
              <CardDescription>Spending trends by category over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={categoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="food"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                    name="Food & Dining"
                  />
                  <Line
                    type="monotone"
                    dataKey="transport"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                    name="Transportation"
                  />
                  <Line
                    type="monotone"
                    dataKey="shopping"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    name="Shopping"
                  />
                  <Line
                    type="monotone"
                    dataKey="entertainment"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                    name="Entertainment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>AI-powered analysis of your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-emerald-800 dark:text-emerald-200">Positive Trend</span>
                </div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Your savings rate has improved by 15% compared to last quarter.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">Budget Alert</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  You're spending 23% more on dining out this month.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Recommendation</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Consider setting up automatic transfers to boost your emergency fund.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
