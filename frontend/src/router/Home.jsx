import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="content">
        <h1>
          Organize suas <span className="highlight">finanças</span>, acompanhe
          seus <span className="highlight">gastos</span> e tenha mais{""}
          <span className="highlight">controle</span> sobre seu dinheiro!
        </h1>
        <p>
          Gerencie seus gastos, planeje seu orçamento e tenha mais controle
          financeiro!
        </p>

        <div className="actions">
          <Link to={"/register"} className="start">
            Começe agora
          </Link>
          <Link to={"/ourTeam"} className="know-us">
            Conheça nosso time
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
