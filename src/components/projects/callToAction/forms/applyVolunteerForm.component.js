import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { creatingPublicProjectVolunteerRequest, createPublicProjectItemReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  description: Yup.string()
  .required("*Description of supplies is required")
  .max(300, "*Must be less than 300 charachters"),
  motivation: Yup.string()
  .required("*Motivation is required")
  .max(300, "*Motivation must be less than 300 characters"),
  previousExperience: Yup.string()
  .max(300, "*Previous Experience must be less than 300 characters"),
  availability: Yup.string()
  .required("*Availability is required")
  .max(300, "*Availability must be less than 300 characters"),
  additionalInformation: Yup.string()
  .max(300, "*Must be less than 300 characters"),
});

const ApplyVolunteerForm = ({ dispatch, loading, hasErrors, success, project, setSubmitted }) => {
  useEffect(() => {
    if (success) {
      dispatch(createPublicProjectItemReset())
      setSubmitted('VOLUNTEER')
    }
  }, [success])

  useEffect(() => {
    dispatch(createPublicProjectItemReset())
  }, [])

  const formik = useFormik({
    initialValues: {
      description: "",
      motivation: "",
      previousExperience: "",
      availability: "",
      additionalInformation: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data = {
        description: values.description,
        motivation: values.motivation,
        previousExperience: values.previousExperience,
        availability: values.availability,
        additionalInformation: values.additionalInformation,
      }
      dispatch(creatingPublicProjectVolunteerRequest(data, project._id))
    }
  })
  
  return (
    <div className="callToActionSubmitSupplyContainer">
      <form onSubmit={formik.handleSubmit} className="createSupplyAmountForm">
      
        <h2 className="formHeader"> Volunteer Request </h2>

        <div className="formGroup">
          <p className="formGroupHeader">What would you like to do as a volunteer?</p>
          <textarea
            autoFocus
            type="text"
            name="description"
            rows="3"
            placeholder="E.g. I love what your organisation is doing!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description &&
            <p className="formInputError"> {formik.errors.description} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">What is your motivation for volunteering with us?</p>
          <textarea
            autoFocus
            type="text"
            name="motivation"
            rows="3"
            placeholder="E.g. I love what your organisation is doing!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.motivation}
          />
          {formik.errors.motivation &&
            <p className="formInputError"> {formik.errors.motivation} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Do you have any previous experience?</p>
          <textarea
            autoFocus
            type="text"
            name="previousExperience"
            rows="3"
            placeholder="E.g. I love what your organisation is doing!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.previousExperience}
          />
          {formik.errors.previousExperience &&
            <p className="formInputError"> {formik.errors.previousExperience} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">What is your availability</p>
          <textarea
            autoFocus
            type="text"
            name="availability"
            rows="3"
            placeholder="E.g. I love what your organisation is doing!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.availability}
          />
          {formik.errors.availability &&
            <p className="formInputError"> {formik.errors.availability} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Any additional information?</p>
          <textarea
            autoFocus
            type="text"
            name="additionalInformation"
            rows="3"
            placeholder="E.g. I love what your organisation is doing!"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalInformation}
          />
          {formik.errors.additionalInformation &&
            <p className="formInputError"> {formik.errors.additionalInformation} </p>
          }
        </div>

        


        

        <div className="formGroup">
        <button className="standardButtonWithoutColour mcGreenBG" type="submit" disabled={loading}>
        {
          loading ? 
          <Spinner animation="border" size="sm" /> 
          :
          null
        }
        {loading ? null : 'Send'}
        </button>
      </div>
      {hasErrors &&
        <p className="error" style={{marginTop: '8px'}}> An error occurred please try again or contact support at info@ministryofchange.org </p>
      }

      </form>
    </div>
  )
}

const MapStateToProps = (state) => ({
  loading: state.projectInfo.mainProjectCreate.loading,
  hasErrors: state.projectInfo.mainProjectCreate.hasErrors,
  success: state.projectInfo.mainProjectCreate.success
})

export default connect(MapStateToProps)(ApplyVolunteerForm)