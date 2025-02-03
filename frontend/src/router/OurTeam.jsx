import "./OurTeam.css";

const OurTeam = () => {
  return (
    <div className="our-team">
      <h2>
        Bem-vindo ao FintTRACK! Sua Solução Inteligente de Gerenciamento
        Financeiro!
      </h2>
      <p>
        Nossa equipe é formada por profissionais qualificados e apaixonados por
        tecnologia e por oferecer um excelente atendimento ao cliente. Estamos
        comprometidos em fornecer uma experiência de gerenciamento financeiro
        eficiente e personalizada de acordo com as suas necessidades.
      </p>
      <p>
        Com o FintTRACK, você pode gerenciar suas finanças, acompanhar seus
        gastos e ficar no controle de seus objetivos financeiros com apenas
        alguns cliques. Inovação e praticidade estão no coração do que fazemos,
        garantindo que você possa focar no que realmente importa.
      </p>
      <p>
        Para começar a aproveitar todas as funcionalidades do nosso sistema,
        faça login. Se já tem uma conta, basta entrar com suas credenciais. É
        novo por aqui? Cadastre-se hoje mesmo e descubra como gerenciar suas
        finanças pode ser fácil com o FintTRACK!
      </p>
      <p>
        Nossa equipe está sempre à disposição para apoiar você em cada etapa da
        sua jornada. Gerencie suas finanças com facilidade, gerencie com o
        FintTRACK!
      </p>
      <div className="team-achievements">
        <h3>Nossas Conquistas</h3>
        <div className="achievements-list">
          <div className="achievement-item">
            <i className="fas fa-award"></i>
            <p>
              Premiado como <strong>"Inovador FinTech do Ano"</strong> em 2023
            </p>
          </div>
          <div className="achievement-item">
            <i className="fas fa-users"></i>
            <p>
              Mais de <strong>2M de usuários</strong> confiando em nossos
              serviços globalmente
            </p>
          </div>
          <div className="achievement-item">
            <i className="fas fa-chart-line"></i>
            <p>
              Implementamos com sucesso{" "}
              <strong>100+ ferramentas financeiras</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
