import { type AuthBindings, Authenticated, GitHubBanner, Refine } from "@refinedev/core"
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"

import { ErrorComponent, RefineSnackbarProvider, ThemedLayoutV2, useNotificationProvider } from "@refinedev/mui"

import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router"
import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import { Header } from "./components/header"
import { ColorModeContextProvider } from "./contexts/color-mode"
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts"
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories"
import Login from "./pages/login"
import { dataProvider } from "./utils/dataProvider"
import { axiosInstance } from "./utils/axiosInstance"
import "./app.css"

function App() {
  const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        })

        const { token, ...user } = response.data

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        return {
          success: true,
          redirectTo: "/",
        }
      } catch (error) {
        return {
          success: false,
          error: new Error("Invalid credentials"),
        }
      }
    },
    logout: async () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        success: true,
        redirectTo: "/login",
      }
    },
    onError: async (error) => {
      console.error(error)
      return { error }
    },
    check: async () => {
      const token = localStorage.getItem("token")

      if (token) {
        return {
          authenticated: true,
        }
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user")
      if (user) {
        return JSON.parse(user)
      }

      return null
    },
  }

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider()}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "blog-posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Blog Posts",
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Categories",
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "wXzJpH-lq5SVm-Zw3h7H",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<NavigateToResource resource="blog-posts" />} />
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
