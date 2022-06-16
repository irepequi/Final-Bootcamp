import { useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";



export const TestForm_Confirm_risk = ({setCount, answers}) => {
  const [checkActive, setCheckActive] = useState(false);
  const [userId, setUserId] = useState();


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user_id = jwtDecode(token).user.id;
      
      setUserId(user_id);
    }
  }, []);

  const handleSubmit = () =>{
    setCount(13)

    axios

    .post(`http://localhost:4000/users/sendResult/${userId}`, answers)
    .then((res) =>{
      
    })


    .catch((error) => {
      console.log(error);
    });
  } 
  return( 
  
    <>
    <h2>Your investor profile suggests you are a risk-averse investor</h2>
    <p>Investing in venture capital is a high-risk form of investment, 
      and you could lose some or all of your initial investment.</p>
      <br/>

      <label>
        <input
          type="checkbox"
          onChange={() => {
            setCheckActive(!checkActive);
          }}
        />{" "}
        I confirm I understand that investing with Invertor is high risk and 
        I could lose some or all of my investment
      </label>

      <button
        disabled={checkActive ? false : true}
        onClick={handleSubmit}
      >
        Confirm
      </button>
     
  
    </>
  )
};
