import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const HomeSearch = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <div className="w-100" style={{ position: "relative" }}>
        <img
          src="https://sybridmd.com/wp-content/uploads/2019/12/Joros_PatientExp-824x320.jpg"
          alt="doctor and patient"
          className="w-100"
          style={{ objectFit: "cover" }}
        />
        <div className="homePageSearch">
          <p>
            Easiest way to <br /> meet your doctor
          </p>
          <InputGroup className="mb-md-5">
            <FormControl
              placeholder="Search doctor by name or specialization"
              aria-label="Search doctor by name or specialization"
              aria-describedby="basic-addon2"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
            <InputGroup.Append>
              <Button
                variant="light"
                onClick={() =>
                  dispatch({ type: "SET_SEARCH_TEXT", payload: searchText })
                }
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
