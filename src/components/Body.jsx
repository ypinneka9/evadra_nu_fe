import React, { useState, useEffect } from "react";
import "./Body.css";
import TextField from "@mui/material/TextField";
import ComplexButton from "./ComplexButton";
import DeleteIcon from "@mui/icons-material/Delete";

const remoteUrl =
  "https://peaceful-meadow-33167-213d6a56c227.herokuapp.com/persons";
// const localUrl = "http://localhost:8080/persons";

export const Body = () => {
  const [id, setId] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const { data, isPending, error } = useFetch(remoteUrl, reloadCount);
  const cb = () => {
    setReloadCount(reloadCount + 1);
  };

  return (
    <div className="m-block">
      <Input id={id} cb={cb} />
      <div>
        <Items data={data} setId={setId} cb={cb} />
      </div>
    </div>
  );
};

const Input = ({ id, cb }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("");
  const [_, setError] = useState(false);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  const addToWaitlist = () => {
    console.log("Added to waitlist", id);
    if (!name || !phone || !people) {
      setError(true);
      setTriggerSubmit(true);
      return;
    }
    const jsonData = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      people: people,
    };
    fetch(remoteUrl, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
    });
    setName("");
    setEmail("");
    setPhone("");
    setPeople("");
    setTriggerSubmit(false);
    setTimeout(() => {
      cb();
    }, 2000);
  };

  return (
    <div className="input-block">
      <span className="heading-body">Ready to be in the waitlist ?</span>
      <div className="input">
        <TextField
          id="name"
          required
          label="Name"
          error={name.length === 0 && triggerSubmit}
          variant="standard"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          variant="standard"
        />
        <TextField
          id="phone"
          required
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          error={phone.length === 0 && triggerSubmit}
          label="Phone Number"
          variant="standard"
        />
        <TextField
          id="people"
          type="number"
          value={people}
          onChange={(event) => {
            setPeople(event.target.value);
          }}
          error={people.length === 0 && triggerSubmit}
          required
          label="People"
          variant="standard"
        />
      </div>
      <ComplexButton onClick={() => addToWaitlist()} />
    </div>
  );
};

const Items = ({ data, setId, cb }) => {
  return (
    data &&
    data.map((item, index) => {
      if (index === data.length - 1) setId(index + 2);
      return (
        <div className="table">
          <Item
            index={index}
            name={item.name}
            email={item.email}
            phone={item.phone}
            people={item.people}
            cb={cb}
          />
        </div>
      );
    })
  );
};

const deleteEl = (id) => {
  fetch(remoteUrl + "/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
};

const Item = ({ index, name, email, phone, people, cb }) => {
  return (
    <>
      <div>{index + 1}</div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{people}</div>
      <div>
        <DeleteIcon
          onClick={() => {
            deleteEl(index);
            cb();
          }}
        />
      </div>
    </>
  );
};

export const useFetch = (url, reloadCount) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, reloadCount]);
  return { data, isPending, error };
};
