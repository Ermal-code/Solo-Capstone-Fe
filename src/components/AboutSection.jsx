import React from "react";
import { groupBy } from "../helpers/helperFuctions";
import { useSelector } from "react-redux";

const AboutSection = ({ profile }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="p-3">
      <div>
        {profile.description ? (
          <>
            <h5 className="mt-3">Bio</h5>
            <p>{profile.description}</p>
          </>
        ) : (
          user &&
          user._id === profile._id && (
            <>
              <h5 className="mt-3">Bio</h5>
              <p style={{ fontStyle: "italic" }}>
                This is where you can show a bio for yourself so others can
                see...
              </p>
            </>
          )
        )}
      </div>

      {profile.languages && profile.languages.length > 0 ? (
        <>
          <h5 className="mt-4">Spoken languages</h5>
          <div className="d-flex">
            {profile.languages.map((language, index) => (
              <p key={`${language}and${index}`} className="mr-1">
                {index === profile.languages.length - 1
                  ? `${language}`
                  : `${language},`}
              </p>
            ))}
          </div>
        </>
      ) : (
        user &&
        user._id === profile._id && (
          <>
            <h5 className="mt-4">Spoken languages</h5>
            <p style={{ fontStyle: "italic" }}>
              This is where you can show a spoken languages so others can see...
            </p>
          </>
        )
      )}

      {profile.clinicOrHospital && (
        <>
          <h5 className="mt-4">Hospital/Clinic</h5>
          <p>{profile.clinicOrHospital}</p>
        </>
      )}
      {profile.street && (
        <>
          <h5 className="mt-4">Work address</h5>
          <p>
            {profile.street}, {profile.city}, {profile.state}
          </p>
        </>
      )}
      <h5 className="mt-4">Working days and hours</h5>
      {groupBy(profile.workingHours, "day").map((day, index) => (
        <div
          key={`${day[0].day}${day[0].startHour}${index}`}
          className={`d-flex justify-content-start  mb-2 ${
            day.length > 1 ? "align-items-center" : ""
          }`}
        >
          <p className="mb-0 ">
            <strong>{day[0].day}:</strong>
          </p>
          <div>
            {day.map((hours, i) => (
              <p key={`${hours.startHour}${i}`} className="mb-0 ml-2">
                {hours.startHour} - {hours.endHour}
              </p>
            ))}
          </div>
        </div>
      ))}

      {profile.website ? (
        <>
          <h5 className="mt-4">Website</h5>
          <a href={profile.website} target="_blank">
            {profile.website}
          </a>
        </>
      ) : (
        user &&
        user._id === profile._id && (
          <>
            <h5 className="mt-4">Website</h5>
            <p style={{ fontStyle: "italic" }}>
              This is where you can show your website so others can see...
            </p>
          </>
        )
      )}
    </div>
  );
};

export default AboutSection;
