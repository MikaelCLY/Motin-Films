'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, LayoutDashboard } from 'lucide-react'
import Image from 'next/image'

export default function AdminNavbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-brand-dark-2 border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/motin-logo-white.avif" 
              alt="Motin Films Logo" 
              width={100} 
              height={24} 
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 glass-teal px-3 py-1 rounded-full">
            <LayoutDashboard className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Admin</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden md:block text-xs text-white/40 truncate max-w-[200px]">
              {userEmail}
            </span>
          )}
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-brand-red transition-colors uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}
