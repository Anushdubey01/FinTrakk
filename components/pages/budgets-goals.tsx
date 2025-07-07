"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Target,
  Edit,
  Trash2,
  Coffee,
  Car,
  ShoppingBag,
  Home,
  Gamepad2,
  PiggyBank,
  Calendar,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/components/providers/toast-provider"

const categoryIcons = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Housing: Home,
  Entertainment: Gamepad2,
}

const mockBudgets = [
  {
    id: 1,
    category: "Food & Dining",
    icon: Coffee,
    budget: 800,
    spent: 650,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: 2,
    category: "Transportation",
    icon: Car,
    budget: 400,
    spent: 320,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 3,
    category: "Shopping",
    icon: ShoppingBag,
    budget: 600,
    spent: 480,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 4,
    category: "Housing",
    icon: Home,
    budget: 1500,
    spent: 1200,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: 5,
    category: "Entertainment",
    icon: Gamepad2,
    budget: 300,
    spent: 280,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    textColor: "text-pink-600 dark:text-pink-400",
  },
]

const mockGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build an emergency fund for unexpected expenses",
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: "2024-12-31",
    category: "Savings",
    color: "from-emerald-500 to-green-500",
  },
  {
    id: 2,
    title: "Vacation to Europe",
    description: "Save for a 2-week trip to Europe",
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: "2024-08-15",
    category: "Travel",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "New Laptop",
    description: "Save for a new MacBook Pro",
    targetAmount: 2500,
    currentAmount: 1200,
    deadline: "2024-06-30",
    category: "Technology",
    color: "from-purple-500 to-violet-500",
  },
]

export function BudgetsGoalsPage() {
  const [budgets, setBudgets] = useState(mockBudgets)
  const [goals, setGoals] = useState(mockGoals)
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<any>(null)
  const [editingGoal, setEditingGoal] = useState<any>(null)
  const { showToast } = useToast()

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusBadge = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return { text: "Over Budget", variant: "destructive" as const }
    if (percentage >= 90) return { text: "Near Limit", variant: "secondary" as const }
    if (percentage >= 75) return { text: "On Track", variant: "secondary" as const }
    return { text: "Good", variant: "default" as const }
  }

  const handleSaveBudget = (budgetData: any) => {
    if (editingBudget) {
      setBudgets((prev) => prev.map((b) => (b.id === editingBudget.id ? { ...b, ...budgetData } : b)))
      showToast("Budget updated successfully!", "success")
    } else {
      const newBudget = {
        id: Date.now(),
        ...budgetData,
        spent: 0,
        icon: categoryIcons[budgetData.category as keyof typeof categoryIcons] || ShoppingBag,
        color: "from-slate-500 to-slate-600",
        bgColor: "bg-slate-100 dark:bg-slate-900/30",
        textColor: "text-slate-600 dark:text-slate-400",
      }
      setBudgets((prev) => [...prev, newBudget])
      showToast("Budget created successfully!", "success")
    }
    setIsBudgetModalOpen(false)
    setEditingBudget(null)
  }

  const handleSaveGoal = (goalData: any) => {
    if (editingGoal) {
      setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? { ...g, ...goalData } : g)))
      showToast("Goal updated successfully!", "success")
    } else {
      const newGoal = {
        id: Date.now(),
        ...goalData,
        currentAmount: 0,
        color: "from-indigo-500 to-purple-500",
      }
      setGoals((prev) => [...prev, newGoal])
      showToast("Goal created successfully!", "success")
    }
    setIsGoalModalOpen(false)
    setEditingGoal(null)
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)

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
            Budgets & Goals
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your spending limits and financial objectives
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isBudgetModalOpen} onOpenChange={setIsBudgetModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setEditingBudget(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Budget
              </Button>
            </DialogTrigger>
            <BudgetModal
              budget={editingBudget}
              onSave={handleSaveBudget}
              onClose={() => {
                setIsBudgetModalOpen(false)
                setEditingBudget(null)
              }}
            />
          </Dialog>

          <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white"
                onClick={() => setEditingGoal(null)}
              >
                <Target className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <GoalModal
              goal={editingGoal}
              onSave={handleSaveGoal}
              onClose={() => {
                setIsGoalModalOpen(false)
                setEditingGoal(null)
              }}
            />
          </Dialog>
        </div>
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
            <CardDescription>Your monthly budget performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">${totalBudget.toLocaleString()}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">${totalSpent.toLocaleString()}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${(totalBudget - totalSpent).toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Remaining</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
              </div>
              <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
          >
            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${budget.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${budget.bgColor}`}>
                      <budget.icon className={`w-6 h-6 ${budget.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>
                        ${budget.spent} of ${budget.budget}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusBadge(budget.spent, budget.budget).variant}>
                    {getStatusBadge(budget.spent, budget.budget).text}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((budget.spent / budget.budget) * 100)}%</span>
                  </div>
                  <Progress value={(budget.spent / budget.budget) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Remaining</span>
                  <span
                    className={`font-medium ${
                      budget.budget - budget.spent < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    ${Math.abs(budget.budget - budget.spent)}
                  </span>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setEditingBudget(budget)
                      setIsBudgetModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                    onClick={() => {
                      setBudgets((prev) => prev.filter((b) => b.id !== budget.id))
                      showToast("Budget deleted", "success")
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Financial Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-violet-500" />
              Financial Goals
            </CardTitle>
            <CardDescription>Track your progress towards financial objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 p-6 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-10`} />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {goal.category}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingGoal(goal)
                            setIsGoalModalOpen(true)
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setGoals((prev) => prev.filter((g) => g.id !== goal.id))
                            showToast("Goal deleted", "success")
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{goal.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{goal.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                      </div>
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Saved</span>
                        <span className="font-medium">${goal.currentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Target</span>
                        <span className="font-medium">${goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Deadline</span>
                        <span className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
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

// Budget Modal Component
function BudgetModal({ budget, onSave, onClose }: { budget: any; onSave: (data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    category: budget?.category || "",
    budget: budget?.budget || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      category: formData.category,
      budget: Number.parseFloat(formData.budget),
    })
  }

  return (
    <DialogContent className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/50">
      <DialogHeader>
        <DialogTitle>{budget ? "Edit Budget" : "Add New Budget"}</DialogTitle>
        <DialogDescription>
          {budget ? "Update your budget limit" : "Set a spending limit for a category"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food & Dining">Food & Dining</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="budget"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.budget}
              onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white"
            disabled={!formData.category || !formData.budget}
          >
            {budget ? "Update Budget" : "Create Budget"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

// Goal Modal Component
function GoalModal({ goal, onSave, onClose }: { goal: any; onSave: (data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: goal?.title || "",
    description: goal?.description || "",
    targetAmount: goal?.targetAmount || "",
    deadline: goal?.deadline || "",
    category: goal?.category || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title: formData.title,
      description: formData.description,
      targetAmount: Number.parseFloat(formData.targetAmount),
      deadline: formData.deadline,
      category: formData.category,
    })
  }

  return (
    <DialogContent className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/50">
      <DialogHeader>
        <DialogTitle>{goal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
        <DialogDescription>{goal ? "Update your financial goal" : "Set a new financial objective"}</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Goal Title</Label>
          <Input
            id="title"
            placeholder="e.g., Emergency Fund"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your goal..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.targetAmount}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAmount: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goalCategory">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Savings">Savings</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Investment">Investment</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white"
            disabled={!formData.title || !formData.targetAmount || !formData.deadline}
          >
            {goal ? "Update Goal" : "Create Goal"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
