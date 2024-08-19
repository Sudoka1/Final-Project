import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [registerData, setRegisterData] = useState({
    vorname: '',
    nachname: '',
    email: '',
  });
  const [registerAnswer, setRegisterAnswer] = useState('');
  const [eingeloggt, setEingeloggt] = useState(false);
  const [loginInput, setLoginInput] = useState('');

  useEffect(() => {
    const eingeloggt = localStorage.getItem('login');
    if (eingeloggt === 'true') {
      setEingeloggt(true);
    }
  }, [])

  const getAllUsers = async () => {
    const response = await fetch('http://localhost:4000/person');
    const allUsers = await response.json();
    setUsers(allUsers);
  };
  const registerChangeHandler = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const registriereUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/person', {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response.ok) {
      setRegisterAnswer('Neuen User erfolgreich erstellt');
    }
    const data = await response.json();
    console.log(data);
  };
  const loginInputHandler = (e) => {
    setLoginInput(e.target.value);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/person/login', {
      method: 'POST',
      body: JSON.stringify({ email: loginInput }),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response.ok) {
      setEingeloggt(true);
      localStorage.setItem('login', 'true');
    } else {
      const data = await response.json();
      console.log(data);
      setEingeloggt(false);
      localStorage.setItem('login', 'false');
    }
  };
  return (
    <>
      <h1>Einfache Demo zur Zusammenarbeit mit unserer API</h1>
      <h2>Hier hole ich alle Benutzerdaten</h2>
      <button onClick={getAllUsers}>Hole Daten!</button>

      <ul>
        {users.map((userObj) => (
          <li key={userObj._id}>Vorname: {userObj.vorname}</li>
        ))}
      </ul>

      <h2>Hier einen neuen User erstellen</h2>
      <form onSubmit={registriereUser}>
        <div>
          <label htmlFor="vorname">Vorname: </label>
          <input
            type="text"
            name="vorname"
            id="vorname"
            required
            onChange={registerChangeHandler}
            value={registerData.vorname}
          />
        </div>
        <div>
          <label htmlFor="nachname">Nachname: </label>
          <input
            type="text"
            name="nachname"
            id="nachname"
            onChange={registerChangeHandler}
            value={registerData.nachname}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={registerChangeHandler}
            value={registerData.email}
          />
        </div>
        <button>Abschicken</button>
      </form>
      <p>{registerAnswer}</p>
      
      <h2>Anmelden nur mit email</h2>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="eingloggen-email"
            id="einloggen-email"
            required
            onChange={loginInputHandler}
            value={loginInput}
          />
        </div>
        <button>Einloggen</button>
      </form>
      <p>
        {eingeloggt
          ? 'Du bist eingeloggt. Du darfst hier sogar geheime Sachen sehen!!!'
          : 'Du bist nicht eingeloggt'}
      </p>
    </>
  );
}

export default App;
