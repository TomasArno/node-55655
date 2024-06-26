import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { GlobalContext } from "./state";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import SearchForm from "./components/search-form";
import "./App.css";

function App() {
  const { fetchData, setState } = useContext(GlobalContext);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await fetchData({ url: "sessions" })

      if (data.statusCode == 200) {
        setState({ user: data.response, isLoggedIn: true })
      }
    }

    checkAuth()
  }, [])

  return (
    <>
      <header className="header">
        <SearchForm />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <Box borderTop="2px solid #ddd" component="footer">
        <Typography level="body-xs" fontWeight="bold" textAlign="center">
          © Proteo Software
        </Typography>
      </Box>
    </>
  );
}

export default App;
