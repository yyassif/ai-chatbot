import Link from 'next/link'

import { IconNextChat } from '@/components/ui/icons'
import { Fragment } from 'react'

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="relative grid h-[calc(100vh-3rem)] grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
          <Link
            href="/"
            className="absolute left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight"
          >
            <IconNextChat className="mr-2 size-6" />
            <span>NextChat</span>
          </Link>
        </div>
        <div className="container relative flex size-full flex-col items-center justify-center lg:max-w-none lg:px-0">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Access your an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to access your account
                </p>
              </div>
              <div className="grid gap-6">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-none">
        <div className="container flex h-12 flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-4 md:gap-2 md:px-0">
            <IconNextChat />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{' '}
              <a
                href="https://twitter.com/yassineyassif"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                @yyassif
              </a>
              . Open source for{' '}
              <a
                href="https://github.com/yyassif/ai-chatbot"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                everyone.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
