// CSS
import styles from "./Inscrição.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Inscrição = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [vaga, setVaga] = useState(0);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const userCollectionRef = collection(db, "users");

  const totalVagas = 10;

  const vagasOcupadas = users.map((user) => user.vaga); // Array das vagas ocupadas
  const todasVagas = Array.from({ length: totalVagas }, (_, i) => i + 1); // Cria um array com o total vagas
  const vagasDisponiveis = todasVagas.filter(
    (vaga) => !vagasOcupadas.includes(vaga)
  );

  const salvarUser = async () => {
    if (vagasDisponiveis.length <= 0) {
      console.log("Acabou as vagas");
      setErrorMessage("Infelizmente, as vagas se esgotaram.");
    } else {
      // Tem vaga
      const user = await addDoc(userCollectionRef, {
        name,
        email,
        vaga: vagasDisponiveis[0],
      });
      console.log("Usuário adicionado com ID: ", user.id); // Exibe o ID no console ao criar o usuário
      setMessage("Ingresso gerado. Código de identificação: ", user.id);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    getUsers();
  }, [userCollectionRef]);

  // Função de navegação
  const navigate = useNavigate();

  return (
    <div className={styles.cadastro}>
      <h2>Preencha seus Dados</h2>
      <div>
        <div>
          <h3>Nome: </h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome Completo"
          />
        </div>
        <div>
          <h3>E-mail: </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="E-mail"
          />
        </div>

        <div className={styles.button_container}>
          <button onClick={salvarUser}>Criar Inscrição</button>
          {/* Função para voltar para Home */}
          <button onClick={() => navigate("/")}>Voltar</button>
        </div>
        {/* Condicionalmente exibe a mensagem se houver algum erro */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {/* Condicionalmente exibe a mensagem de confirmação */}
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Inscrição;
