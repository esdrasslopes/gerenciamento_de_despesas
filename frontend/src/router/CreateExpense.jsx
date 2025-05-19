import { useState, useContext, useEffect } from "react";

import { UserContext } from "../context/userContext";

import useToast from "../hooks/useToast";

import { configFetch } from "../axios/config";

import { useNavigate } from "react-router-dom";

import "./CreateExpense.css";

const CreateExpense = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [image, setImage] = useState(null);

  const [expense, setExpense] = useState({
    type: "",
    title: "",
    value: 0,
    date: "",
  });

  const showToast = useToast();

  useEffect(() => {
    if (!user._id) {
      navigate("/");
      return;
    }
  }, [user._id, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);

    formData.append("type", expense.type);

    formData.append("title", expense.title);

    formData.append("value", expense.value);

    formData.append("date", expense.date);

    try {
      const res = await configFetch.patch(`/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res) {
        showToast(res.data.msg);

        navigate(`/expenses/${user._id}`);
      }
    } catch (error) {
      showToast(
        error.response?.data?.msg || "Erro ao registrar despesa",
        "error"
      );
    }
  };

  return (
    <div className="create-container">
      <h1>Registre sua despesa e tenha mais controle financeiro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>
            Tipo da despesa: <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Ex: Alimentação, Transporte, Lazer..."
            value={expense.type}
            onChange={handleChange}
            name="type"
          />
        </label>

        <label>
          <p>
            Título da despesa: <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Ex: Conta de luz, Mercado, Uber..."
            value={expense.title}
            onChange={handleChange}
            name="title"
          />
        </label>

        <label>
          <p>
            Valor da despesa: <span>*</span>
          </p>
          <input
            type="number"
            placeholder="Digite o valor gasto"
            value={expense.value}
            onChange={handleChange}
            name="value"
          />
        </label>

        <label>
          <p>
            Data da despesa: <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Ex: 27/01/2025"
            value={expense.date}
            onChange={handleChange}
            name="date"
          />
        </label>

        <label className="file">
          <p>Boleto (opcional):</p>
          <input type="file" name="image" onChange={handleChange} />
        </label>

        <input type="submit" value={"Criar"} />
      </form>
    </div>
  );
};

export default CreateExpense;
