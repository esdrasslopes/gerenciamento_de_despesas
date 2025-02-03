import { useState, useEffect, useContext } from "react";

import Password from "../components/Password";

import useToast from "../hooks/useToast";

import { configFetch } from "../axios/config";

import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [data, setData] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const showToast = useToast();

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await configFetch.get("/");

        const users = res.data.users;

        setData(users);
      } catch (error) {
        console.log(error);
      }
    };

    getAll();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Preencha todos os campos", "error");
      return;
    }

    const user = { email, password };

    const userLogin = data.find(
      (userDb) =>
        userDb.email === user.email && userDb.password === user.password
    );

    if (userLogin) {
      showToast("Usuário encontrado com sucesso");
      setUser(userLogin);
      return;
    }

    showToast("Dados incorretos ou usuário inexistente", "error");
  };

  useEffect(() => {
    if (user?._id) {
      navigate(`/expenses/${user._id}`);
    }
  }, [user]);

  return (
    <div className="singin-container">
      <h1>Entre e gerencie suas finanças com facilidade.</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>
            Seu email: <span className="mandatory">*</span>
          </p>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <Password
          text="Sua senha"
          password={password}
          setPassword={setPassword}
        />
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
};

export default Login;
