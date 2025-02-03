import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <h3>Sobre o FinTrack</h3>
          <p>
            O FinTrack é a solução ideal para gerenciar suas finanças de forma
            inteligente e eficiente. Nosso objetivo é ajudá-lo a organizar seus
            gastos e alcançar estabilidade financeira com facilidade.
          </p>
        </div>
        <div className="contact">
          <h3>Entre em Contato</h3>
          <ul>
            <li>Email: suporte@FinTrack.com</li>
            <li>Telefone: +55 (11) 98765-4321</li>
            <li>Endereço: Rua das Finanças, 123 - São Paulo, SP</li>
          </ul>
        </div>
        <div className="social-media">
          <h3>Siga-nos</h3>
          <ul>
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Instagram</Link>
            </li>
            <li>
              <Link to="#">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FinTrack. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
