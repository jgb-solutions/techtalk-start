import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router'
import appCss from "~/tailwind.css?url"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Meta, Scripts } from '@tanstack/start'
import type { ReactNode } from 'react'
import React from 'react'

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
      {
        title: 'TanStack Start Starter',
      },
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
  const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
      ? () => null // Render nothing in production
      : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

  return (
    <html lang="en" className="h-full" data-theme="cupcake">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
      </head>
      <body className="font-sans antialiased min-h-full bg-center bg-cover bg-gray-300"
      // style={{ backgroundImage: "url('/assets/images/Grunged-paper-Background-1.jpg')" }}
      >
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <TanStackRouterDevtools />
      </body>
    </html>
  )
}