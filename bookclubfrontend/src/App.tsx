import React, { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";



function App() {

  interface Members {
    id: number;
    name: string;
    birth_date: string;
    gender: string;
    created_at: string;
  }

  const [list, setMembers] = useState<Members[]>([]);
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [responseMessages, setResponseMessages] = useState<any[]>([])

  const fetchData = async () => {
    await fetch('http://localhost:3000/api/members')
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.log(error));
    console.log(list);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function newMember() {
    const requestData = {
      gender: gender,
      name: name,
      birth_date: birthDate
    }

    const response = await fetch('http://localhost:3000/api/members', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(requestData) })
    const responseJson = await response.json()
    if (responseJson.message) {
      setResponseMessages(responseJson.message)
    }
    else {
      setResponseMessages(["Sikeres tagfelvétel!"])
    }

    fetchData();
  }

  async function payMembership(id: any){
    const response = await fetch(`http://localhost:3000/api/members/${id}/pay`, {method: 'POST'})
    const responseJson = await response.json()
    setResponseMessages(["Sikeres fizetés!"])
    if(responseJson.status === 409){
      setResponseMessages(["Már fizetve"])
    }
    if(responseJson.status === 400){
      setResponseMessages(["Nincs ilyen felhasználó"])
    }
  }


  return (
    <div>
      <header>
        <nav style={{ display: "flex", flexDirection: "row" }} className="navbar">
          <ul className="navbar-nav">
            <li style={{ display: "flex", flexDirection: "row" }}>
              <a style={{ color: "blue", marginRight: "10px", textDecoration: "none" }} href="#submit" className="nav-link">
                uj tag felvetele
              </a>
              <a style={{ color: "blue", textDecoration: "none" }} href="https://petrik.hu" className="nav-link">
                Petrik honlap
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <h1>Petrik Konyvklub</h1>

      <div className='container'>
      {responseMessages.map(
          x =>
          <p>{x}</p>
        )}
        <div className='row'>
          {list.map((member, i) => {
            return (<div key={i} className='col-12 col-sm-6 col-lg-4' style={{
              backgroundColor: "white",
              height: "600px",
              border: "1px solid black",
              borderRadius: "10px",
              paddingTop: "20px",
              width: "400px",
              margin: "10px"
            }}>
              <h2>{member.name}</h2>
              <p>Született: {member.birth_date}</p>
              <p>Csatlakozott: {member.created_at}</p>
              <img src={member.gender === 'F' ? 'assets/female.png' : member.gender === 'M' ? 'assets/male.png' : 'assets/other.png'} width='100px' alt="" />
              <button className='btn btn-dark' onClick={()=>{payMembership(member.id)}}>Tagdíj fizetés</button>
            </div>)
          })}
        </div>
      </div>

      <center>
        <div id="newmember" className='container'>
          <label>Név: </label>
          <input type="text" onChange={(e) => { setName(e.target.value) }} />
          <br />
          <label>Születési dátum: </label>
          <input type="date" onChange={(e) => { setBirthDate(e.target.value) }} />
          <br />
          <label>Nem: </label>
          <select name="" id="" onChange={(e) => { setGender(e.target.value) }}>
            <option value="F">Nő</option>
            <option value="M">Férfi</option>
          </select>
          <br />
          <button className='btn btn-dark' onClick={newMember}>Tagfelvétel</button>
        </div>
      </center>


      <footer>keszitette Kopcsak Patrik</footer>
    </div>
  );
}

export default App;
