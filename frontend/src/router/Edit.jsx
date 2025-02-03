import { useState, useContext, useEffect } from "react";

import { UserContext } from "../context/userContext";

import { configFetch } from "../axios/config";

import { useNavigate, useParams } from "react-router-dom";

import useToast from "../hooks/useToast";

import Loader from "../components/Loader";

import "./Edit.css";

const Edit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, setData } = useContext(UserContext);

  const [image, setImage] = useState(null);

  const [expense, setExpense] = useState({});

  const showToast = useToast();

  useEffect(() => {
    const getExpense = async () => {
      try {
        const res = await configFetch.get(`/${user._id}/expense/${id}`);

        setExpense(res.data.expense);
      } catch (error) {
        console.log(error);
      }
    };

    getExpense();
  }, [user._id, id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) formData.append("image", image);

    formData.append("type", expense.type);

    formData.append("title", expense.title);

    formData.append("value", expense.value);

    formData.append("date", expense.date);

    try {
      const res = await configFetch.patch(
        `/${user._id}/update/${expense._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    <div className="edit-container">
      {!expense ? (
        <Loader />
      ) : (
        <>
          <h1>Edite sua despesa e tenha mais controle financeiro</h1>
          <form onSubmit={handleEdit}>
            <label>
              <p>
                Tipo da despesa: <span>*</span>
              </p>
              <input
                type="text"
                placeholder="Ex: Alimentação, Transporte, Lazer..."
                onChange={handleChange}
                value={expense.type || ""}
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
                onChange={handleChange}
                value={expense.title || ""}
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
                onChange={handleChange}
                value={expense.value || ""}
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
                onChange={handleChange}
                value={expense.date || ""}
                name="date"
              />
            </label>

            <label className="file">
              <p>Boleto (opcional):</p>
              <input type="file" name="image" onChange={handleChange} />
            </label>

            <input type="submit" value={"Editar"} />
          </form>
        </>
      )}
    </div>
  );
};

export default Edit;
