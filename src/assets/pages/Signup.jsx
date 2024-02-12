import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bouclier from "../images/png/bouclierCaptain.png";
import bannerMarvel from "../images/wallpaper/formarvel.jpg";

const Signup = ({ setToken, setBckgroundMain }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Signup");
  }, []);

  const handleChangeEmail = (e) => {
    setAlertMessage(false);
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleChangeUsername = (e) => {
    setAlertMessage(false);
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const handleChangePassword = (e) => {
    setAlertMessage(false);
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleChangeNewsLetter = () => {
    setAlertMessage(false);
    setNewsLetter(!newsletter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("voici les infos:", { email, username, password });
    const information = {
      email,
      username,
      password,
      newsletter,
    };
    try {
      const response = await axios.post(
        `https://site--marvel-back--mn6tp6dgdm5w.code.run/signup`,
        information
      );
      if (response.data.message) {
        setAlertMessage(response.data.message);
      } else {
        setIsSignedUp(true);
      }
    } catch (error) {
      console.log("Voici l'erreur: ", error.message);
    }
  };

  const redirectToLoginPage = () => {
    return (
      <>
        <div>
          <div className="maskMarvel">
            <img src={bannerMarvel} alt="marvelBanner" />
          </div>
        </div>
        <div className="waiting">
          <p>Compte créé avec succès!</p>
          <p>
            Vous allez être automatiquement redirigé vers le formulaire de
            connexion dans quelques secondes...
          </p>
          <img src={bouclier} alt="bouclier Captain America" />

          {setTimeout(() => {
            navigate("/login");
          }, 5000)}
        </div>
      </>
    );
  };

  const displaySignUpForm = () => {
    return (
      <form className="formSignup" onSubmit={handleSubmit}>
        <label>Inscription</label>
        <label>Email</label>
        <input type="email" value={email} onChange={handleChangeEmail} />
        <label>Username</label>
        <input type="text" value={username} onChange={handleChangeUsername} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <div className="newsletter">
          <p>Rejoindre la newsletter</p>
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={newsletter}
            onChange={handleChangeNewsLetter}
          />
        </div>

        <p className="alertMessage">{alertMessage}</p>

        <button type="submit">Submit</button>
      </form>
    );
  };
  return isSignedUp ? redirectToLoginPage() : displaySignUpForm();
};

export default Signup;
