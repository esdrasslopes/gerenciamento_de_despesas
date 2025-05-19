import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/userContext";

import { configFetch } from "../axios/config";

import { Link, useNavigate } from "react-router-dom";

import useToast from "../hooks/useToast";

import Loader from "../components/Loader";

import "./Adm.css";

const Adm = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const [data, setData] = useState();

  const [expensesValueToPay, setExpensesValueToPay] = useState(0);

  const [expensePaid, setExpensePaid] = useState(0);

  const showToast = useToast();

  useEffect(() => {
    if (!user._id) {
      navigate("/");
      return;
    }

    const getExpenses = async () => {
      try {
        const res = await configFetch.get(`/${user._id}/expenses`);

        setData(res.data.expenses);
      } catch (error) {
        console.log(error);
      }
    };

    getExpenses();
  }, [user._id, navigate]);

  const handleDelete = async (e, expenseId) => {
    try {
      const res = await configFetch.delete(`/${user._id}/delete/${expenseId}`);

      if (res) {
        const deletedExpense = res.data.deleted;

        const filteredExpenses = data.filter(
          (expense) => expense._id !== deletedExpense._id
        );

        setData(filteredExpenses);

        showToast("Despesa deletada com sucesso!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const total = data
        .filter((expense) => !expense.paid)
        .reduce((acc, expense) => acc + expense.value, 0);

      setExpensesValueToPay(total);
    }

    if (data) {
      const totalPaid = data
        .filter((expense) => expense.paid)
        .reduce((acc, expense) => acc + expense.value, 0);

      setExpensePaid(totalPaid);
    }
  }, [data]);

  return (
    <div className="adm-expenses">
      {!data ? (
        <Loader />
      ) : (
        <>
          <h1>Controle de edição e exclusão de despesas</h1>
          <div className="values">
            <div className="value-box">
              <h2>Valor a pagar</h2>
              <span>R$ {expensesValueToPay.toFixed(2)}</span>
            </div>
            <div className="value-box">
              <h2>Valor pago</h2>
              <span>R$ {expensePaid.toFixed(2)}</span>
            </div>
          </div>

          <div className="expenses">
            {data &&
              data.map((expense) => (
                <div className="expense" key={expense._id}>
                  <h1>{expense.type}</h1>
                  <h2>{expense.title}</h2>
                  <p>{expense.date}</p>
                  <div className="actions">
                    <Link className="btn edit-btn" to={`/edit/${expense._id}`}>
                      Editar
                    </Link>

                    <button
                      className="btn delete-btn"
                      onClick={(e) => handleDelete(e, expense._id)}
                    >
                      Deletar
                    </button>
                    <Link
                      className="btn accompany-btn"
                      to={`/accompany/${expense._id}`}
                    >
                      Acompanhar
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Adm;
