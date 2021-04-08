import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDoctorsAndClinics } from "../api/usersApi";
import SingleSearchResult from "../components/SingleSearchResult";

const Results = () => {
  const searchText = useSelector((state) => state.searchText);
  const [doctorsAndHopsitals, setDoctorsAndHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchText);

  const getDoctorsHospitals = async (keyword) => {
    try {
      const query = `?name=${keyword}`;

      const response = await getDoctorsAndClinics(query);

      if (response.statusText === "OK") {
        setDoctorsAndHospitals(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDoctorsHospitals(searchQuery);
  }, []);

  return (
    <div className="mt-5">
      <InputGroup className="mb-md-5">
        <FormControl
          placeholder="Search doctor by name or specialization"
          aria-label="Search doctor by name or specialization"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <InputGroup.Append>
          <Button
            variant="light"
            onClick={() => getDoctorsHospitals(searchQuery)}
          >
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Row>
        <Col xs={12}>
          <h4 className="border-bottom border-secondary pb-3">
            {doctorsAndHopsitals.length === 0
              ? "No search results were found"
              : `Found ${doctorsAndHopsitals.length} search
            ${doctorsAndHopsitals.length === 1 ? " result" : " results"}`}
          </h4>
        </Col>

        {doctorsAndHopsitals.map((docOrhosp, index) => (
          <Col md="6" key={`${docOrhosp._id}index${index + 2132}`}>
            <SingleSearchResult docOrhosp={docOrhosp} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Results;
