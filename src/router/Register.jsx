import { useState, useEffect, useContext } from "react";

import { configFetch } from "../axios/config";

import useToast from "../hooks/useToast";

import Password from "../components/Password";

import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const showToast = useToast();

  const { user: userRegisted, setUser } = useContext(UserContext);

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

  const handleRegister = async (user) => {
    try {
      const res = await configFetch.post("/", user);

      if (res) {
        setUser(res.data.newUser);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("Preencha todos os campos", "error");
      return;
    }

    const user = { name, email, password };

    const userExists = data.find((userDb) => userDb.email === user.email);

    if (userExists) {
      showToast("Já existe algum usuário cadastrado com este email", "error");
      return;
    }

    const userRegister = await handleRegister(user);

    if (userRegister) {
      showToast("Usuário cadastrado com sucesso");
      console.log(userRegisted);
    }
  };

  useEffect(() => {
    if (userRegisted?._id) {
      navigate(`/expenses/${userRegisted._id}`);
    }
  }, [userRegisted]);

  return (
    <div className="register-container">
      <h1>
        Crie sua conta e dê o primeiro passo em direção a uma conta
        personalizada e experiência exclusiva!
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>
            Seu nome: <span className="mandatory">*</span>
          </p>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>
            Seu email: <span className="mandatory">*</span>
          </p>
          <input
            type="email"
            placeholder="Seu email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <Password
          text="Sua senha"
          password={password}
          setPassword={setPassword}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
