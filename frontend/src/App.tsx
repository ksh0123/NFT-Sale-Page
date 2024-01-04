import { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Home from "./pages/home";
import My from "./pages/my";
import Sale from "./pages/sale";
import Layout from "./components/Layout";
import Detail from "./pages/detail";
import Loading from "./components/Loading";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateAsyncOperation = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoading(false);
    };

    simulateAsyncOperation();
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my" element={<My />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/detail/:tokenId" element={<Detail />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
