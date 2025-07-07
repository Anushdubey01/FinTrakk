"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Plus, Grid3X3, Settings } from "lucide-react"

interface MobileNavProps {
  currentPage: string
  onPageChange: (page: string) => void
  onAddClick: () => void
}

export function MobileNav({ currentPage, onPageChange, onAddClick }: MobileNavProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "categories", label: "Categories", icon: Grid3X3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-t border-white/20 dark:border-slate-700/50 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                currentPage === item.id ? "text-violet-600 dark:text-violet-400" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}

          {/* Add Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onAddClick}
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-3 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white rounded-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs">Add</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
