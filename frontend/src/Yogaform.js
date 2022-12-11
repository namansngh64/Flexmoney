import React, { useState } from "react";

const Yogaform = () => {
  const [values, setValues] = useState({
    name: "",
    age: "",
    email: "",
    slot: "",
    loading: false,
    success: false
  });
  const { name, email, age, slot, loading, success } = values;
  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };
  const completePayment = (values) => {
    return fetch("https://flexmoney-2x0t.onrender.com/api/makePayment", {
      //can add this in .env file
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !slot || !age) {
      document.getElementById("successdiv").style.display = "none";
      document.getElementById("errordiv").innerHTML = "Enter Valid Values!";
      document.getElementById("errordiv").style.display = "block";
      return;
    }
    completePayment({ name, email, age, slot })
      .then((res) => {
        if (res.error) {
          document.getElementById("successdiv").style.display = "none";
          document.getElementById("errordiv").innerHTML = res.error.msg;
          document.getElementById("errordiv").style.display = "block";
          return;
        }
        document.getElementById("errordiv").style.display = "none";
        document.getElementById("successdiv").innerHTML =
          "Success! Confirmation mail sent!";
        document.getElementById("successdiv").style.display = "block";
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className="row border border-dark rounded-3"
        style={{ width: "55%", margin: "auto", marginTop: "12%" }}
      >
        <h1 className="d-flex justify-content-center">
          Registration Form for Yoga Class
        </h1>

        <form>
          <div
            className="row p-2 mb-2 text-center text-white"
            id="errordiv"
            style={{ backgroundColor: "red", display: "none" }}
          ></div>
          <div
            className="row p-2 mb-2 text-center text-white"
            id="successdiv"
            style={{ backgroundColor: "green", display: "none" }}
          ></div>
          <div className="row mb-3">
            <label htmlFor="Name" className="col-sm-2 col-form-label">
              Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Age" className="col-sm-2 col-form-label">
              Age:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Age"
                value={age}
                onChange={handleChange("age")}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-form-label col-sm-2">Select Slot:</div>
            <div className="col-sm-10" onChange={handleChange("slot")}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="6-7 AM"
                />
                <label className="form-check-label" htmlFor="gridRadios1">
                  6-7 AM
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="7-8 AM"
                />
                <label className="form-check-label" htmlFor="gridRadios2">
                  7-8 AM
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                  value="8-9 AM"
                />
                <label className="form-check-label" htmlFor="gridRadios3">
                  8-9 AM
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios4"
                  value="5-6 PM"
                />
                <label className="form-check-label" htmlFor="gridRadios4">
                  5-6 PM
                </label>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-primary mb-2">
            Pay ₹500
          </button>
          <div className="row h6 small">
            *For Current Month: ({new Date().getMonth()}/
            {new Date().getFullYear()})
          </div>
        </form>
      </div>
    </>
  );
};

export default Yogaform;
