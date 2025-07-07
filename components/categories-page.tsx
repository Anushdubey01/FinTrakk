"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  Coffee,
  Car,
  ShoppingBag,
  Home,
  Gamepad2,
  Wallet,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Food & Dining",
    icon: Coffee,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-600 dark:text-orange-400",
    budget: 800,
    spent: 650,
    transactions: 24,
  },
  {
    id: 2,
    name: "Transportation",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
    budget: 400,
    spent: 320,
    transactions: 12,
  },
  {
    id: 3,
    name: "Shopping",
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400",
    budget: 600,
    spent: 480,
    transactions: 18,
  },
  {
    id: 4,
    name: "Housing",
    icon: Home,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
    budget: 1500,
    spent: 1200,
    transactions: 3,
  },
  {
    id: 5,
    name: "Entertainment",
    icon: Gamepad2,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    textColor: "text-pink-600 dark:text-pink-400",
    budget: 300,
    spent: 280,
    transactions: 15,
  },
  {
    id: 6,
    name: "Income",
    icon: Wallet,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    budget: 0,
    spent: 0,
    transactions: 4,
    isIncome: true,
  },
]

export function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusBadge = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 90) return { text: "Over Budget", variant: "destructive" as const }
    if (percentage >= 75) return { text: "Near Limit", variant: "secondary" as const }
    return { text: "On Track", variant: "default" as const }
  }

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
            Categories & Budgets
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your spending categories and budget limits.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/50">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new spending category with budget limit.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" placeholder="Enter category name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-limit">Budget Limit</Label>
                <Input id="budget-limit" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">☕ Food & Dining</SelectItem>
                    <SelectItem value="car">🚗 Transportation</SelectItem>
                    <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                    <SelectItem value="home">🏠 Housing</SelectItem>
                    <SelectItem value="entertainment">🎮 Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white">
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-500" />
              Budget Overview
            </CardTitle>
            <CardDescription>Your monthly budget performance across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">$3,600</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$2,930</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">$670</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Remaining</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>81.4%</span>
              </div>
              <Progress value={81.4} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
          >
            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${category.bgColor}`}>
                      <category.icon className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.transactions} transactions</CardDescription>
                    </div>
                  </div>
                  {!category.isIncome && (
                    <Badge variant={getStatusBadge(category.spent, category.budget).variant}>
                      {getStatusBadge(category.spent, category.budget).text}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative">
                {category.isIncome ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Income</span>
                      <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">+$8,500</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12.5% from last month</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Spent</span>
                      <span className="text-lg font-semibold">${category.spent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Budget</span>
                      <span className="text-sm font-medium">${category.budget}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((category.spent / category.budget) * 100)}%</span>
                      </div>
                      <Progress value={(category.spent / category.budget) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Remaining</span>
                      <span
                        className={`font-medium ${
                          category.budget - category.spent < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        ${category.budget - category.spent}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <Button variant="outline" size="sm" className="flex-1 bg-white/50 dark:bg-slate-800/50">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {!category.isIncome && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Budget Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Budget Alerts
            </CardTitle>
            <CardDescription>Categories that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Gamepad2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Entertainment</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">93% of budget used</p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                >
                  Near Limit
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <Coffee className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Food & Dining</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">81% of budget used</p>
                  </div>
                </div>
                <Badge variant="destructive">High Usage</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
