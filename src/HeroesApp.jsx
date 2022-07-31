import { AuthProvider } from './auth';
import { AppRouter } from './router';

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
