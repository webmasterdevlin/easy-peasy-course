import React, { useState } from "react";
import { Formik } from "formik";
import { Hero } from "../features/heroes/heroTypes";

type Props = {
  text: string;
  obj: Hero;
  handleSubmit: (obj: Hero) => Promise<void>;
};

const FormSubmission = ({ text, obj, handleSubmit }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="card my-3" style={{ width: "auto" }}>
      <Formik
        enableReinitialize
        initialValues={obj}
        validationSchema={null}
        onSubmit={async (values, formikHelpers) => {
          try {
            await handleSubmit(values);
            setSubmitted(true);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {(formikProps) => (
          <form
            className="card-header"
            style={{ minWidth: "460px" }}
            onSubmit={formikProps.handleSubmit}
          >
            <div className="d-flex flex-column">
              <section className="form-group mb-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  placeholder="📛"
                  name="firstName"
                  id="firstName"
                  required
                  type="text"
                  value={formikProps.values.firstName}
                  onChange={formikProps.handleChange("firstName")}
                  className="form-control"
                />
              </section>
              <section className="form-group mb-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  placeholder="📛"
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={formikProps.values.lastName}
                  onChange={formikProps.handleChange("lastName")}
                  className="form-control"
                />
              </section>
              <section className="form-group mb-2">
                <label htmlFor="house">House</label>
                <input
                  placeholder="🏠"
                  name="house"
                  id="house"
                  type="text"
                  value={formikProps.values.house}
                  onChange={formikProps.handleChange("house")}
                  className="form-control"
                />
              </section>
              <section className="form-group mb-2">
                <label htmlFor="knownAs">Known as</label>
                <input
                  placeholder="👀"
                  name="knownAs"
                  id="knownAs"
                  type="text"
                  value={formikProps.values.knownAs}
                  onChange={formikProps.handleChange("knownAs")}
                  className="form-control"
                />
              </section>
            </div>
            <button
              type="submit"
              className="btn btn-success my-3"
              disabled={submitted}
            >
              <span className="fas fa-save me-2" />
              {text}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormSubmission;
