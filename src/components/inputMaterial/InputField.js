import React, { useState, useEffect } from "react";
import useInput from "./useInput";

function InputField() {
  const { value:name, bind:bindName,reset:resetName } = useInput("");
  const { value:price, bind:bindPrice,reset:resetPrice } = useInput("");



  const handleSubmit=(e, state)=>{
    e.preventDefault();
    console.log(state);
    resetName();
    resetPrice();


    const postSinglePart = async (name, price) => {
      try {
        const res = await fetch(`http://localhost:8080/materials/singlepart`, {
          crossDomain: true,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({description: `${name}`})
        });

        const data = await res.json();

        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    postSinglePart();

  }


  return (
    <div>
      <form className="input" onSubmit={e=>handleSubmit(e,{name})}>
        <label>Name</label>
        <input type="text" {...bindName}/>
        <label>Price</label>
        <input type="number" {...bindPrice}/>
        <input type="submit" />
      </form>
    </div>
  );
}

export default InputField;
