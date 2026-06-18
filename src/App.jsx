import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { RequireAuth } from '@/components/index.js'
import { Login, Main, SignUp, ProductList, ProductListClosed, ForgotPassword } from './pages'
import { useEffect } from 'react';
import { AnimationLayout } from './components/AnimationLayout/AnimationLayout';
import { TermsConditions } from '@/pages/index.js';
import rutas from './data/rutas';

function App() {
  const navigate = useNavigate();

  useEffect(()=>{
    const fnBackButton = (e) => {
      const hash = window.location.hash;
      if (hash === "#/" || hash === "#" || hash == "#/login"){
        window.navigator.app.exitApp();
        return false;
      }

      navigate(-1);
    };
    
    document.addEventListener('backbutton', fnBackButton, false);
    window.addEventListener('native.keyboardshow', function () {
      if (window.cordova){
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
    });
    return ()=>{
      document.removeEventListener("backbutton", fnBackButton, false);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route element={<AnimationLayout />}>
          {/* Public */}
          <Route path={rutas.LOGIN} element={<Login />} />
          <Route path={rutas.TERMS_CONDITIONS} element={<TermsConditions />} />
          <Route path={rutas.SIGNUP} element={<SignUp />} />
          <Route path={rutas.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* Private */}
          <Route element = {<RequireAuth/>}>
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
