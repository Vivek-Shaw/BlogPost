import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  console.log("page", isPageLoading);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div
      className="min-h-screen flex flex-wrap 
  content-between bg-sky-100"
    >
      <div className="w-full block">
        <Header />
        {isPageLoading ? (
          <Loading />
        ) : (
          <section className="align-element py-20">
            <Outlet />
          </section>
        )}
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
