/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as DashboardWalletImport } from './routes/dashboard/wallet'
import { Route as DashboardSettingsImport } from './routes/dashboard/settings'
import { Route as DashboardRequestsImport } from './routes/dashboard/requests'
import { Route as DashboardPurchasesImport } from './routes/dashboard/purchases'
import { Route as DashboardPeersImport } from './routes/dashboard/peers'
import { Route as DashboardNodesImport } from './routes/dashboard/nodes'
import { Route as DashboardLogsImport } from './routes/dashboard/logs'
import { Route as DashboardHelpImport } from './routes/dashboard/help'
import { Route as DashboardFilesImport } from './routes/dashboard/files'
import { Route as DashboardFavoritesImport } from './routes/dashboard/favorites'
import { Route as DashboardDisclaimerImport } from './routes/dashboard/disclaimer'
import { Route as DashboardDeviceImport } from './routes/dashboard/device'
import { Route as DashboardAvailabilitiesImport } from './routes/dashboard/availabilities'
import { Route as DashboardAnalyticsImport } from './routes/dashboard/analytics'
import { Route as DashboardAboutImport } from './routes/dashboard/about'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardWalletRoute = DashboardWalletImport.update({
  id: '/wallet',
  path: '/wallet',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSettingsRoute = DashboardSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardRequestsRoute = DashboardRequestsImport.update({
  id: '/requests',
  path: '/requests',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardPurchasesRoute = DashboardPurchasesImport.update({
  id: '/purchases',
  path: '/purchases',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardPeersRoute = DashboardPeersImport.update({
  id: '/peers',
  path: '/peers',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardNodesRoute = DashboardNodesImport.update({
  id: '/nodes',
  path: '/nodes',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardLogsRoute = DashboardLogsImport.update({
  id: '/logs',
  path: '/logs',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardHelpRoute = DashboardHelpImport.update({
  id: '/help',
  path: '/help',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardFilesRoute = DashboardFilesImport.update({
  id: '/files',
  path: '/files',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardFavoritesRoute = DashboardFavoritesImport.update({
  id: '/favorites',
  path: '/favorites',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardDisclaimerRoute = DashboardDisclaimerImport.update({
  id: '/disclaimer',
  path: '/disclaimer',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardDeviceRoute = DashboardDeviceImport.update({
  id: '/device',
  path: '/device',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAvailabilitiesRoute = DashboardAvailabilitiesImport.update({
  id: '/availabilities',
  path: '/availabilities',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAnalyticsRoute = DashboardAnalyticsImport.update({
  id: '/analytics',
  path: '/analytics',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAboutRoute = DashboardAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/about': {
      id: '/dashboard/about'
      path: '/about'
      fullPath: '/dashboard/about'
      preLoaderRoute: typeof DashboardAboutImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/analytics': {
      id: '/dashboard/analytics'
      path: '/analytics'
      fullPath: '/dashboard/analytics'
      preLoaderRoute: typeof DashboardAnalyticsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/availabilities': {
      id: '/dashboard/availabilities'
      path: '/availabilities'
      fullPath: '/dashboard/availabilities'
      preLoaderRoute: typeof DashboardAvailabilitiesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/device': {
      id: '/dashboard/device'
      path: '/device'
      fullPath: '/dashboard/device'
      preLoaderRoute: typeof DashboardDeviceImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/disclaimer': {
      id: '/dashboard/disclaimer'
      path: '/disclaimer'
      fullPath: '/dashboard/disclaimer'
      preLoaderRoute: typeof DashboardDisclaimerImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/favorites': {
      id: '/dashboard/favorites'
      path: '/favorites'
      fullPath: '/dashboard/favorites'
      preLoaderRoute: typeof DashboardFavoritesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/files': {
      id: '/dashboard/files'
      path: '/files'
      fullPath: '/dashboard/files'
      preLoaderRoute: typeof DashboardFilesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/help': {
      id: '/dashboard/help'
      path: '/help'
      fullPath: '/dashboard/help'
      preLoaderRoute: typeof DashboardHelpImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/logs': {
      id: '/dashboard/logs'
      path: '/logs'
      fullPath: '/dashboard/logs'
      preLoaderRoute: typeof DashboardLogsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/nodes': {
      id: '/dashboard/nodes'
      path: '/nodes'
      fullPath: '/dashboard/nodes'
      preLoaderRoute: typeof DashboardNodesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/peers': {
      id: '/dashboard/peers'
      path: '/peers'
      fullPath: '/dashboard/peers'
      preLoaderRoute: typeof DashboardPeersImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/purchases': {
      id: '/dashboard/purchases'
      path: '/purchases'
      fullPath: '/dashboard/purchases'
      preLoaderRoute: typeof DashboardPurchasesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/requests': {
      id: '/dashboard/requests'
      path: '/requests'
      fullPath: '/dashboard/requests'
      preLoaderRoute: typeof DashboardRequestsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/settings': {
      id: '/dashboard/settings'
      path: '/settings'
      fullPath: '/dashboard/settings'
      preLoaderRoute: typeof DashboardSettingsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/wallet': {
      id: '/dashboard/wallet'
      path: '/wallet'
      fullPath: '/dashboard/wallet'
      preLoaderRoute: typeof DashboardWalletImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardAboutRoute: typeof DashboardAboutRoute
  DashboardAnalyticsRoute: typeof DashboardAnalyticsRoute
  DashboardAvailabilitiesRoute: typeof DashboardAvailabilitiesRoute
  DashboardDeviceRoute: typeof DashboardDeviceRoute
  DashboardDisclaimerRoute: typeof DashboardDisclaimerRoute
  DashboardFavoritesRoute: typeof DashboardFavoritesRoute
  DashboardFilesRoute: typeof DashboardFilesRoute
  DashboardHelpRoute: typeof DashboardHelpRoute
  DashboardLogsRoute: typeof DashboardLogsRoute
  DashboardNodesRoute: typeof DashboardNodesRoute
  DashboardPeersRoute: typeof DashboardPeersRoute
  DashboardPurchasesRoute: typeof DashboardPurchasesRoute
  DashboardRequestsRoute: typeof DashboardRequestsRoute
  DashboardSettingsRoute: typeof DashboardSettingsRoute
  DashboardWalletRoute: typeof DashboardWalletRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAboutRoute: DashboardAboutRoute,
  DashboardAnalyticsRoute: DashboardAnalyticsRoute,
  DashboardAvailabilitiesRoute: DashboardAvailabilitiesRoute,
  DashboardDeviceRoute: DashboardDeviceRoute,
  DashboardDisclaimerRoute: DashboardDisclaimerRoute,
  DashboardFavoritesRoute: DashboardFavoritesRoute,
  DashboardFilesRoute: DashboardFilesRoute,
  DashboardHelpRoute: DashboardHelpRoute,
  DashboardLogsRoute: DashboardLogsRoute,
  DashboardNodesRoute: DashboardNodesRoute,
  DashboardPeersRoute: DashboardPeersRoute,
  DashboardPurchasesRoute: DashboardPurchasesRoute,
  DashboardRequestsRoute: DashboardRequestsRoute,
  DashboardSettingsRoute: DashboardSettingsRoute,
  DashboardWalletRoute: DashboardWalletRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/about': typeof DashboardAboutRoute
  '/dashboard/analytics': typeof DashboardAnalyticsRoute
  '/dashboard/availabilities': typeof DashboardAvailabilitiesRoute
  '/dashboard/device': typeof DashboardDeviceRoute
  '/dashboard/disclaimer': typeof DashboardDisclaimerRoute
  '/dashboard/favorites': typeof DashboardFavoritesRoute
  '/dashboard/files': typeof DashboardFilesRoute
  '/dashboard/help': typeof DashboardHelpRoute
  '/dashboard/logs': typeof DashboardLogsRoute
  '/dashboard/nodes': typeof DashboardNodesRoute
  '/dashboard/peers': typeof DashboardPeersRoute
  '/dashboard/purchases': typeof DashboardPurchasesRoute
  '/dashboard/requests': typeof DashboardRequestsRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/wallet': typeof DashboardWalletRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard/about': typeof DashboardAboutRoute
  '/dashboard/analytics': typeof DashboardAnalyticsRoute
  '/dashboard/availabilities': typeof DashboardAvailabilitiesRoute
  '/dashboard/device': typeof DashboardDeviceRoute
  '/dashboard/disclaimer': typeof DashboardDisclaimerRoute
  '/dashboard/favorites': typeof DashboardFavoritesRoute
  '/dashboard/files': typeof DashboardFilesRoute
  '/dashboard/help': typeof DashboardHelpRoute
  '/dashboard/logs': typeof DashboardLogsRoute
  '/dashboard/nodes': typeof DashboardNodesRoute
  '/dashboard/peers': typeof DashboardPeersRoute
  '/dashboard/purchases': typeof DashboardPurchasesRoute
  '/dashboard/requests': typeof DashboardRequestsRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/wallet': typeof DashboardWalletRoute
  '/dashboard': typeof DashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/about': typeof DashboardAboutRoute
  '/dashboard/analytics': typeof DashboardAnalyticsRoute
  '/dashboard/availabilities': typeof DashboardAvailabilitiesRoute
  '/dashboard/device': typeof DashboardDeviceRoute
  '/dashboard/disclaimer': typeof DashboardDisclaimerRoute
  '/dashboard/favorites': typeof DashboardFavoritesRoute
  '/dashboard/files': typeof DashboardFilesRoute
  '/dashboard/help': typeof DashboardHelpRoute
  '/dashboard/logs': typeof DashboardLogsRoute
  '/dashboard/nodes': typeof DashboardNodesRoute
  '/dashboard/peers': typeof DashboardPeersRoute
  '/dashboard/purchases': typeof DashboardPurchasesRoute
  '/dashboard/requests': typeof DashboardRequestsRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/wallet': typeof DashboardWalletRoute
  '/dashboard/': typeof DashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
  | '/'
  | '/dashboard'
  | '/dashboard/about'
  | '/dashboard/analytics'
  | '/dashboard/availabilities'
  | '/dashboard/device'
  | '/dashboard/disclaimer'
  | '/dashboard/favorites'
  | '/dashboard/files'
  | '/dashboard/help'
  | '/dashboard/logs'
  | '/dashboard/nodes'
  | '/dashboard/peers'
  | '/dashboard/purchases'
  | '/dashboard/requests'
  | '/dashboard/settings'
  | '/dashboard/wallet'
  | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to:
  | '/'
  | '/dashboard/about'
  | '/dashboard/analytics'
  | '/dashboard/availabilities'
  | '/dashboard/device'
  | '/dashboard/disclaimer'
  | '/dashboard/favorites'
  | '/dashboard/files'
  | '/dashboard/help'
  | '/dashboard/logs'
  | '/dashboard/nodes'
  | '/dashboard/peers'
  | '/dashboard/purchases'
  | '/dashboard/requests'
  | '/dashboard/settings'
  | '/dashboard/wallet'
  | '/dashboard'
  id:
  | '__root__'
  | '/'
  | '/dashboard'
  | '/dashboard/about'
  | '/dashboard/analytics'
  | '/dashboard/availabilities'
  | '/dashboard/device'
  | '/dashboard/disclaimer'
  | '/dashboard/favorites'
  | '/dashboard/files'
  | '/dashboard/help'
  | '/dashboard/logs'
  | '/dashboard/nodes'
  | '/dashboard/peers'
  | '/dashboard/purchases'
  | '/dashboard/requests'
  | '/dashboard/settings'
  | '/dashboard/wallet'
  | '/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/about",
        "/dashboard/analytics",
        "/dashboard/availabilities",
        "/dashboard/device",
        "/dashboard/disclaimer",
        "/dashboard/favorites",
        "/dashboard/files",
        "/dashboard/help",
        "/dashboard/logs",
        "/dashboard/nodes",
        "/dashboard/peers",
        "/dashboard/purchases",
        "/dashboard/requests",
        "/dashboard/settings",
        "/dashboard/wallet",
        "/dashboard/"
      ]
    },
    "/dashboard/about": {
      "filePath": "dashboard/about.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/analytics": {
      "filePath": "dashboard/analytics.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/availabilities": {
      "filePath": "dashboard/availabilities.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/device": {
      "filePath": "dashboard/device.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/disclaimer": {
      "filePath": "dashboard/disclaimer.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/favorites": {
      "filePath": "dashboard/favorites.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/files": {
      "filePath": "dashboard/files.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/help": {
      "filePath": "dashboard/help.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/logs": {
      "filePath": "dashboard/logs.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/nodes": {
      "filePath": "dashboard/nodes.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/peers": {
      "filePath": "dashboard/peers.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/purchases": {
      "filePath": "dashboard/purchases.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/requests": {
      "filePath": "dashboard/requests.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings": {
      "filePath": "dashboard/settings.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/wallet": {
      "filePath": "dashboard/wallet.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
