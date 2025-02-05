
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { Header } from "../pages/components";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
