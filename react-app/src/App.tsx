import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import FailPage from "./pages/FailPage";
import Main from "./pages/Main";
import Loading from "./components/Loading";
import "./css/mvp.css";
import "./css/custom.css";
import "./css/main.css";

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
