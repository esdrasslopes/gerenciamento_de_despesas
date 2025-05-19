import { useState, useEffect, useContext } from "react";

import { configFetch } from "../axios/config";

import { useParams, useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

import Loader from "../components/Loader";

import "./Expenses.css";

const Expenses = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [data, setData] = useState();

  useEffect(() => {
    if (!user._id) {
      navigate("/");
      return;
    }

    const getUser = async () => {
      try {
        const user = await configFetch.get(`/${id}`);
        setData(user.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [id, user._id, navigate]);

  const handlePaid = async (e, expenseId) => {
    try {
      const paid = e.target.checked;

      const res = await configFetch.patch(`/${id}/paid/${expenseId}`, {
        paid,
      });

      setData((prev) => ({
        ...prev,
        expenses: prev.expenses.map((expense) =>
          expense._id === expenseId
            ? { ...expense, paid: res.data.expense.paid }
            : expense
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="expenses-container">
      {!data ? (
        <Loader />
      ) : (
        <>
          <h1>Suas despesas</h1>

          <div className="expense-header">
            <p className="date">Data</p>
            <p>Nome</p>
            <p>Tipo</p>
            <p>Valor</p>
            <p>Boleto</p>
            <p>Pago</p>
          </div>

          <div className="expenses-list">
            {data &&
              data.expenses.map((expense) => (
                <div
                  className={`expense-item  ${expense.paid ? "paid" : ""}`}
                  key={expense._id}
                >
                  <div className="date">{expense.date}</div>
                  <div>{expense.title}</div>
                  <div>{expense.type}</div>
                  <div>{expense.value}</div>
                  {expense.src ? (
                    <div>
                      <img
                        src={`http://localhost:3000/${expense.src}`}
                        alt={expense.title}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>Não há boleto</p>
                    </div>
                  )}
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => handlePaid(e, expense._id)}
                      checked={expense.paid || false}
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Expenses;
