import React from "react";
import { groupBy } from "../helpers/helperFuctions";

const AboutSection = ({ profile }) => {
  return (
    <div className="p-3">
      <div>
        <h4 className="mt-3">Bio</h4>

        {profile.description ? (
          <p>{profile.description}</p>
        ) : (
          <p style={{ fontStyle: "italic" }}>
            This is where you can show a bio for yourself so others can see...
          </p>
        )}
      </div>
      <h5 className="mt-4">Spoken languages</h5>
      {profile.languages && profile.languages.length > 0 ? (
        <p>{profile.languages}</p>
      ) : (
        <p style={{ fontStyle: "italic" }}>
          This is where you can show a spoken languages so others can see...
        </p>
      )}

      <h5 className="mt-4">Hospital/Clinic:</h5>
      {profile.clinicOrHopsital ? (
        <p>{profile.clinicOrHopsital}</p>
      ) : (
        <p style={{ fontStyle: "italic" }}>
          This is where you can show the clinic or hospital that you work for so
          others can see...
        </p>
      )}
      <h5 className="mt-4">Working days and hours</h5>
      {groupBy(profile.workingHours, profile.workingHours[0], "day").map(
        (day, index) => (
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
                  {/* {day.length > 1
                    ? day.length - 1 === i
                      ? `${hours.startHour} - ${hours.endHour}`
                      : `${hours.startHour} - ${hours.endHour},`
                    : ` ${hours.startHour} - ${hours.endHour}`} */}
                </p>
              ))}
            </div>
          </div>
        )
      )}
      <h5 className="mt-4">Website</h5>
      {profile.website ? (
        <a href={profile.website}>{profile.website}</a>
      ) : (
        <p style={{ fontStyle: "italic" }}>
          This is where you can show your website so others can see...
        </p>
      )}
    </div>
  );
};

export default AboutSection;
