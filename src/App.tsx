import { AppRoutes } from './routes/AppRoutes';
import { StatusBarProvider } from './context/StatusBarContext';

function App() {
  return (
    <StatusBarProvider>
      <AppRoutes />
    </StatusBarProvider>
  );
}

export default App;