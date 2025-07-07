"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, Coffee, Car, ShoppingBag, Home, Gamepad2, Wallet, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  {
    id: "food",
    name: "Food & Dining",
    icon: Coffee,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    id: "transport",
    name: "Transportation",
    icon: Car,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    id: "housing",
    name: "Housing",
    icon: Home,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Gamepad2,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    id: "income",
    name: "Income",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
]

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [description, setDescription] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form and close modal after success animation
    setTimeout(() => {
      setIsSuccess(false)
      setAmount("")
      setCategory("")
      setDescription("")
      setNote("")
      setDate(new Date())
      onClose()
    }, 1500)
  }

  const selectedCategory = categories.find((cat) => cat.id === category)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-white/20 dark:border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
            Add Transaction
          </DialogTitle>
          <DialogDescription>Record a new income or expense transaction</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
              >
                Transaction Added!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-600 dark:text-slate-400 text-center"
              >
                Your transaction has been successfully recorded.
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Transaction Type */}
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={type === "expense" ? "default" : "outline"}
                    onClick={() => setType("expense")}
                    className={type === "expense" ? "bg-gradient-to-r from-rose-500 to-red-500 text-white" : ""}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Expense
                  </Button>
                  <Button
                    type="button"
                    variant={type === "income" ? "default" : "outline"}
                    onClick={() => setType("income")}
                    className={type === "income" ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" : ""}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Income
                  </Button>
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-lg font-semibold bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories
                    .filter((cat) => (type === "income" ? cat.id === "income" : cat.id !== "income"))
                    .map((cat) => (
                      <Button
                        key={cat.id}
                        type="button"
                        variant="outline"
                        onClick={() => setCategory(cat.id)}
                        className={`justify-start h-auto p-3 ${
                          category === cat.id
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                            : "bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg mr-3 ${cat.color}`}>
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{cat.name}</span>
                      </Button>
                    ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter transaction description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add any additional notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !amount || !category || !description}
                className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-medium py-2.5"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                ) : null}
                {isSubmitting ? "Adding Transaction..." : "Add Transaction"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
