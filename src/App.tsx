import { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, CategoryPage, ProductPage, CartPage, GoodsPage, LoginPage, RegistrationPage } from "./pages";
import { cartActions, getIsAuth, getUserLoadStatus } from './store';
import { Header, Footer } from "src/components";
import { Layout, message } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "src/hooks/useAppDispatch";

export const App = () => {
  const isAuth = useSelector(getIsAuth);
  const prevIsAuth = useRef<boolean>(isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!prevIsAuth.current && isAuth){
      message.open({ type: "success", content: "Успешный вход" });
    }

    if(isAuth){
      dispatch(cartActions.serverRequest())
    }

    prevIsAuth.current = isAuth;
  }, [isAuth]);

  return (
    <Layout className="wrapper">
      <Header />
      <Layout className="container">
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/category/:ids" element={<CategoryPage/>}/>
            <Route path="/product/:ids" element={<ProductPage/>}></Route>
            <Route path="/cart" element={isAuth ? <CartPage/> : <Navigate to="/login"/>}/>
            <Route path="/goods" element={<GoodsPage/>}></Route>
            <Route path="/login" element={isAuth ? <Navigate to="/"/> : <LoginPage/>}></Route>
            <Route path="/registration" element={isAuth ? <Navigate to="/"/> : <RegistrationPage/>}></Route>
            <Route path="*" element={<Navigate to="/"/>}></Route>
        </Routes>
      </Layout>
      <Footer />
    </Layout>
  );
}
