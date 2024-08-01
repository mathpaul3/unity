import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Main from "./pages/MainInput";
import NotFound from "./pages/NotFound";


export default function route() {
  return (
    <Routes>
        <Route path="/" element={<Main />}></Route>

        <Route path="*" element={<NotFound />}></Route>
  </Routes>
  )
}
