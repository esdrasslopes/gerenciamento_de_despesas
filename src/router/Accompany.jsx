import { useState, useContext, useEffect } from "react";

import { UserContext } from "../context/userContext";

import { configFetch } from "../axios/config";

import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader";

import "./Accompany.css";

const Accompanny = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, setData } = useContext(UserContext);

  const [image, setImage] = useState(null);

  const [expense, setExpense] = useState({});

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
  return (
    <div className="accompany-container">
      {!expense ? (
        <Loader />
      ) : (
        <div className="accompany-expense">
          <h1>{expense.type}</h1>
          <h2>{expense.title}</h2>
          <p>{expense.date}</p>
          <p>{expense.value}</p>
          {expense.src ? (
            <div className="image">
              <img
                src={`http://localhost:3000/${expense.src}`}
                alt={expense.title}
              />
            </div>
          ) : (
            <p>Não há boleto</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Accompanny;
