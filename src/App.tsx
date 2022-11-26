import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState<[]>([]);
  useEffect(() => {
    const contactData = axios
      .get("http://127.0.0.1:8000/api/get-contacts")
      .then((response) => {
        setContacts(response.data.data.data);
      });
  }, []);

  const handleScroll = (event: any) => {
    const target = event?.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      console.log("bottom");
    }
  };

  const handleChange = (e: any) => {
    console.log(e.target.value)
    if(e.target.value !== '') {
      const filterData = contacts.filter((data: any) => {
        return data.name.includes(e.target.value)
      })
      console.log(filterData);
      // setContacts(filterData)
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-around mt-3">
              <div>
                <h1>All contacts</h1>
              </div>
              <div>
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
            <div className="mt-3 searchDiv">
              <input
                type="text"
                name="search_contacts"
                className="searchBox"
                placeholder="search contacts"
                onChange={debouncedResults}
              />
            </div>
            <div className="contact-div" onScroll={(e) => handleScroll(e)}>
              {contacts.map((contact, index) => {
                const { name, contact_number, tag_name } = contact;
                return (
                  <div
                    className="d-flex justify-content-around mb-2"
                    key={index}
                  >
                    <div>
                      <p className="mb-0">
                        <strong>{name}</strong>
                      </p>
                      <span>{contact_number}</span>
                    </div>
                    <div>
                      <span>{tag_name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
