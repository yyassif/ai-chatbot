'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/supabase/sign-out'
import { User } from '@supabase/supabase-js'

export interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="size-8 transition-opacity rounded-full bg-gradient-to-r from-green-300 to-purple-400 select-none ring-1 hover:opacity-80"></div>

            <span className="ml-2">
              {user?.email?.slice(0, 2).toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">
              {user?.email?.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-xs text-zinc-500">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem asChild>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full text-xs"
            >
              Vercel Homepage
              <IconExternalLink className="size-3 ml-auto" />
            </a>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => signOut()} className="text-xs">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
