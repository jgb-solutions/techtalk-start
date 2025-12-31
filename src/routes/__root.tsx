import {
  Outlet,
  createRootRoute,
  HeadContent, Scripts
} from '@tanstack/react-router'
import { LoadingBarContainer } from "react-top-loading-bar"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

import appCss from "~/tailwind.css?url"
import Header from "../components/Header"
import Footer from "../components/Footer"
import type { ReactNode } from 'react'

import { SITE_NAME } from '~/utils/constants'
import { seo } from '~/utils/seo'
import RunInProduction from '~/components/RunInProduction'
import { CloudflareAnalytics } from '~/components/CloudflareAnalytics'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: SITE_NAME,
        description: SITE_NAME
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ht" className="h-full" data-theme="cupcake">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffa30a" />
        <HeadContent />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
      </head>
      <body className="font-sans antialiased min-h-full bg-center bg-cover bg-gray-300" >
        <LoadingBarContainer>
          <Header />
        </LoadingBarContainer>

        <main className="">
          {children}
        </main>
        <Footer />

        <Scripts />
        <RunInProduction>
          <VercelAnalytics />
          <CloudflareAnalytics />
        </RunInProduction>
      </body>
    </html>
  )
} 