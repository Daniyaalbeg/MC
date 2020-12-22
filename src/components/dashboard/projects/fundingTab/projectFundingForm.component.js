import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { createFunding, changeProjectItemReset } from '../../../../Actions/projectActions'

const validationSchema = Yup.object().shape({
  fundingNeeded: Yup.number()
  .required("*Amount of funding needed is required")
  .typeError("*Must be a number")
  .positive("*Must be positive"),
  fundingUsedFor: Yup.string()
  .required("*Please add what the funding will be used for."),
});

const ProjectFundingForm = ({ dispatch, loading, success, hasErrors, project, setEditing }) => {  
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(changeProjectItemReset())
      setEditing(false)
    } else {
      isMounted.current = true;
    }
  }, [success]);

  // if (success) {
  //   dispatch(changeProjectItemReset())
  //   setEditing(false)
  // }
  
  const formik = useFormik({
    initialValues: {
      fundingNeeded: project.funding ? project.funding.fundingNeeded : 0,
      fundingUsedFor: project.funding ? project.funding.fundingUsedFor : "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const funding = {
        fundingNeeded: values.fundingNeeded,
        fundingUsedFor: values.fundingUsedFor,
        project: project
      }
      dispatch(createFunding(funding))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addFundingForm">
      <div className="formGroup">
        <p className="formGroupHeader">How many funds do you need? (Rps)</p>
        <input
          disabled={(project.funding && project.funding.fundingNeeded) ? true : false}
          type="text"
          name="fundingNeeded"
          placeholder="E.g. 42"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fundingNeeded}
        />
        {formik.errors.fundingNeeded &&
          <p className="formInputError"> {formik.errors.fundingNeeded} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">What will the funding be used for?</p>
        <textarea
          autoFocus
          type="text"
          name="fundingUsedFor"
          rows="3"
          placeholder="E.g. to purchase sewing machines"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fundingUsedFor}
        />
        {formik.errors.fundingUsedFor &&
          <p className="formInputError"> {formik.errors.fundingUsedFor} </p>
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
        {loading ? null : (project.funding && project.funding.fundingNeeded) ? 'Edit' : 'Create'}
        </button>
        <button onClick={() => setEditing(false)} className="standardButtonWithoutColour mcGreenBG" type="submit" disabled={loading} style={{marginTop: '8px'}}> Back </button>
      </div>
      {hasErrors &&
        <p className="error" style={{marginTop: '8px'}}> An error occurred please try again or contact support at info@ministryofchange.org </p>
      }
    </form>
  )
}

const MapStateToProps = (state) => ({
  loading: state.projectInfo.createProjectItem.loading,
  hasErrors: state.projectInfo.createProjectItem.hasErrors,
  success: state.projectInfo.createProjectItem.success,
})

export default connect(MapStateToProps)(ProjectFundingForm)