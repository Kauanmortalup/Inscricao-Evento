// CSS
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

// IMG
import cartaz from "../../img/cartaz.png";

const Home = () => {
  // Função para iniciar o navegação
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.card}>
        <img src={cartaz} alt="imagem do card" />

        <h4>Jornada da Tecnologia</h4>
        <p>
          Participe e descubra as inovações que estão moldando o futuro digital.
        </p>
        {/* Indo para tela de inscrição */}
        <button onClick={() => navigate("/inscrição")}>inscrever-se</button>
      </div>
    </div>
  );
};

export default Home;
