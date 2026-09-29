import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { IS_PORTFOLIO_DEMO } from '@/config/demoMode'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/config/routes'

export const RequireAuth = () => {
  const { isAuth, isLoading } = useAuth()
  const location = useLocation()

  if (IS_PORTFOLIO_DEMO && location.pathname === ROUTES.GAME) {
    return <Outlet />
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}
