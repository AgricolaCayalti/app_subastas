import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Login, Main, SignUp, ProductList, ProductListClosed, ForgotPassword } from './pages'
import { AnimationLayout } from './components/AnimationLayout/AnimationLayout';
import { TermsConditions } from '@/pages/index.js';
import rutas from './data/rutas';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {

  return (
    <>
      <Routes>
        <Route element={<AnimationLayout />}>
          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path={rutas.LOGIN} element={<Login />} />
            <Route path={rutas.TERMS_CONDITIONS} element={<TermsConditions />} />
            <Route path={rutas.SIGNUP} element={<SignUp />} />
            <Route path={rutas.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>

          {/* Private */}
          <Route element={<PrivateRoute />}>
            <Route path={rutas.MAIN} element={<Main />} />
            <Route path={rutas.PRODUCTS} element={<ProductList />} />
            <Route path={rutas.MY_OFFERS} element={<ProductListClosed />} />
          </Route>
          { /* Catch all */}
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
