import React, { useState } from "react";
import axios from "axios";

function NumerologyForm() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState("");
  const [myNumber, setMyNumber] = useState("Nr:");
  const [result, setResult] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://the-numerology-api.p.rapidapi.com/personality_number";
      const params = {
        first_name: firstName,
        middle_name: middleName ? middleName : " ",
        last_name: lastName,
      };
      const headers = {
        "X-RapidAPI-Key": "02f6a7a332msh92b0feca5aeeb9ep170aa0jsn4657182d3a9b",
        "X-RapidAPI-Host": "the-numerology-api.p.rapidapi.com",
        "content-type": "application / json",
      };

      const response = await axios.get(url, {
        params: params,
        headers: headers,
      });

      setMyNumber(
        "Nr:" + " " + JSON.stringify(response.data.personality_number)
      );
      setResult(response.data.summary);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const inputStyle = {
    margin: 10,
    height: 40,
    width: 300,
    background: "none",
    border: "none",
    borderBottom: "1px solid #6536c9",
    color: "white",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        placeholder="First name"
        style={inputStyle}
      />

      <input
        type="text"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        placeholder="Middle name"
        style={inputStyle}
      />

      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        placeholder="Last name"
        style={inputStyle}
      />

      <button
        type="submit"
        style={{
          width: 300,
          margin: 20,
          height: 50,
          borderRadius: 5,
          backgroundColor: "#6536c9",
          color: "white",
        }}
      >
        Free numerology reading
      </button>
      {/* <div>
        <textarea
          value={myNumber}
          readOnly
          style={{ width: 80, height: 20 }}
          s
        />
      </div> */}
      <div>
        <textarea
          value={result}
          readOnly
          style={{
            width: 400,
            height: 200,
            height: 200,
            fontSize: 14,
            fontFamily: "sans-serif",
          }}
        />
      </div>
    </form>
  );
}

export default NumerologyForm;
