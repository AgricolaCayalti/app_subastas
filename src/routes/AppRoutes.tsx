import { Routes, Route } from 'react-router-dom';
import { Login, Main, SignUp, ProductList, ProductListClosed, ForgotPassword } from '@/pages'
import { TermsConditions } from '@/pages/index.js';
import rutas from '@/data/rutas';
import { PublicRoute, PrivateRoute } from '@/routes';


export const AppRoutes = () => (
  <Routes>
    <Route>
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
);