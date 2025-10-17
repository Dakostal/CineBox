import { createRootRoute, createRoute, createRouter, redirect, RouterProvider } from "@tanstack/react-router"
import { MediaLibrary } from "../components/mediaLibrary/MediaLibrary"
import { Authorization } from "../components/authorization/Authorization"

const rootRoute = createRootRoute()

const MediaRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: MediaLibrary,
    beforeLoad: () => {
        if(!localStorage.getItem('userData')) {
            throw redirect({to: '/auth'})
        }
    }
})

const AuthRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: Authorization,
    beforeLoad: () => {
        if(!localStorage.getItem('userData')) {
            throw redirect({to: '/'})
        }
    }   
})

const routeTree = rootRoute.addChildren([MediaRoute, AuthRoute])

export const router = createRouter({ routeTree })

export const AppRouter = () => {
    return <RouterProvider router={router} />
} 