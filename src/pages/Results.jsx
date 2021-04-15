import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDoctorsAndClinics } from "../api/usersApi";
import SingleSearchResult from "../components/SingleSearchResult";
import Loader from "../components/Loader";

const Results = () => {
  const searchText = useSelector((state) => state.searchText);
  const [doctorsAndHopsitals, setDoctorsAndHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [loader, setLoader] = useState(true);

  const getDoctorsHospitals = async (keyword) => {
    try {
      const query = `?name=${keyword}`;

      const response = await getDoctorsAndClinics(query);

      if (response.statusText === "OK") {
        setDoctorsAndHospitals(response.data);
        setLoader(false);
        setSearchQuery("");
      }
    } catch (error) {
      console.log(error.response.data);
      setLoader(false);
    }
  };

  useEffect(() => {
    getDoctorsHospitals(searchQuery);
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      {loader ? (
        <div className="waitingScreen">
          <Loader height="150px" />
        </div>
      ) : (
        <div className="mt-5">
          <InputGroup className="mb-md-5 w-50">
            <FormControl
              placeholder="Search doctor by name or specialization"
              aria-label="Search doctor by name or specialization"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              className="py-4"
            />
            <InputGroup.Append>
              <button
                className="orangeButton"
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={() => getDoctorsHospitals(searchQuery)}
              >
                <i className="fas fa-search px-3 "></i>
              </button>
            </InputGroup.Append>
          </InputGroup>
          <Row>
            <Col xs={12}>
              <h4 className="border-bottom border-secondary pb-3 mt-5 mt-md-1">
                {doctorsAndHopsitals.length === 0
                  ? "No search results were found"
                  : `Found ${doctorsAndHopsitals.length} search
            ${doctorsAndHopsitals.length === 1 ? " result" : " results"}`}
              </h4>
            </Col>

            {doctorsAndHopsitals.map((docOrhosp, index) => (
              <Col lg="6" key={`${docOrhosp._id}index${index + 2132}`}>
                <SingleSearchResult docOrhosp={docOrhosp} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Results;
