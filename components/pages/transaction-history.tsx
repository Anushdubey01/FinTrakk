"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  CalendarIcon,
  ArrowUpDown,
  Coffee,
  Car,
  ShoppingBag,
  Home,
  Gamepad2,
  Wallet,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format, isWithinInterval, parseISO } from "date-fns"

const categoryIcons = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Housing: Home,
  Entertainment: Gamepad2,
  Income: Wallet,
}

const mockTransactions = [
  {
    id: 1,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    amount: -12.5,
    date: "2024-01-15T10:30:00Z",
    type: "expense",
    note: "Morning coffee with team",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 3500.0,
    date: "2024-01-15T09:00:00Z",
    type: "income",
    note: "Monthly salary",
  },
  {
    id: 3,
    description: "Uber Ride",
    category: "Transportation",
    amount: -18.75,
    date: "2024-01-14T18:45:00Z",
    type: "expense",
    note: "Ride to airport",
  },
  {
    id: 4,
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -89.99,
    date: "2024-01-14T14:20:00Z",
    type: "expense",
    note: "Office supplies",
  },
  {
    id: 5,
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "2024-01-13T12:00:00Z",
    type: "expense",
    note: "Monthly subscription",
  },
  {
    id: 6,
    description: "Rent Payment",
    category: "Housing",
    amount: -1200.0,
    date: "2024-01-01T08:00:00Z",
    type: "expense",
    note: "Monthly rent",
  },
  {
    id: 7,
    description: "Freelance Project",
    category: "Income",
    amount: 750.0,
    date: "2024-01-12T16:30:00Z",
    type: "income",
    note: "Web design project",
  },
  {
    id: 8,
    description: "Grocery Shopping",
    category: "Food & Dining",
    amount: -85.4,
    date: "2024-01-11T19:15:00Z",
    type: "expense",
    note: "Weekly groceries",
  },
  {
    id: 9,
    description: "Gas Station",
    category: "Transportation",
    amount: -45.2,
    date: "2024-01-10T07:30:00Z",
    type: "expense",
    note: "Fill up tank",
  },
  {
    id: 10,
    description: "Restaurant Dinner",
    category: "Food & Dining",
    amount: -67.8,
    date: "2024-01-09T20:00:00Z",
    type: "expense",
    note: "Dinner with friends",
  },
]

export function TransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)

  const itemsPerPage = 6

  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.note?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        filterCategory === "all" || transaction.category.toLowerCase().includes(filterCategory.toLowerCase())

      let matchesDate = true
      if (dateRange.from && dateRange.to) {
        const transactionDate = parseISO(transaction.date)
        matchesDate = isWithinInterval(transactionDate, { start: dateRange.from, end: dateRange.to })
      }

      return matchesSearch && matchesCategory && matchesDate
    })

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "amount":
          aValue = Math.abs(a.amount)
          bValue = Math.abs(b.amount)
          break
        case "category":
          aValue = a.category
          bValue = b.category
          break
        case "date":
        default:
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [searchTerm, filterCategory, sortBy, sortOrder, dateRange])

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedTransactions, currentPage])

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)

  const handleExport = async (format: "csv" | "pdf") => {
    setIsExporting(true)
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)

    // In a real app, this would trigger the actual export
    console.log(`Exporting ${filteredAndSortedTransactions.length} transactions as ${format.toUpperCase()}`)
  }

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
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
            Transaction History
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">View and manage all your financial transactions</p>
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" disabled={isExporting}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleExport("csv")}
                  disabled={isExporting}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {/* Sort */}
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-")
                  setSortBy(field)
                  setSortOrder(order as "asc" | "desc")
                }}
              >
                <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                  <SelectItem value="category-asc">Category (A-Z)</SelectItem>
                  <SelectItem value="category-desc">Category (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Transactions</span>
              <Badge variant="secondary">{filteredAndSortedTransactions.length} results</Badge>
            </CardTitle>
            <CardDescription>
              {filteredAndSortedTransactions.length === 0
                ? "No transactions found matching your criteria"
                : `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} of ${filteredAndSortedTransactions.length} transactions`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paginatedTransactions.map((transaction, index) => {
                const IconComponent = categoryIcons[transaction.category as keyof typeof categoryIcons] || Wallet

                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {format(parseISO(transaction.date), "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                        {transaction.note && (
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{transaction.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-lg ${
                          transaction.amount > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
