import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Login = ({ setToken, setBckgroundMain }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Login");
  }, []);

  const handleChangeEmail = (e) => {
    setAlertMessage(false);
    const newEmail = e.target.value;
    console.log(newEmail);
    setEmail(newEmail);
  };

  const handleChangePassword = (e) => {
    setAlertMessage(false);
    const newPassword = e.target.value;
    console.log(newPassword);
    setPassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const information = {
        email,
        password,
      };

      const response = await axios.post(
        "https://site--marvel-back--mn6tp6dgdm5w.code.run/login",
        information
      );

      if (response.data.token) {
        const numberOfMinut = 480;
        const delayInMinutes = new Date(
          new Date().getTime() + numberOfMinut * 60 * 1000
        );
        Cookies.set("token", response.data.token, {
          secure: true,
          expires: delayInMinutes,
        });

        setToken(response.data.token);
        navigate("/");
      } else {
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      setAlertMessage(error);
      console.log("Erreur login: ", error);
    }
  };

  return (
    <form className="formConnexion" onSubmit={handleSubmit}>
      <label>Connexion</label>
      <label>Email</label>
      <input type="email" value={email} onChange={handleChangeEmail} />

      <label>Password</label>
      <input type="password" value={password} onChange={handleChangePassword} />

      <p className="alertMessage">{alertMessage}</p>

      <Link to="/signup">Vous n'avez pas encore de compte? Inscrivez-vous</Link>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
