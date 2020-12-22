import React, { useState, useMemo, useEffect } from 'react';
import LoadingSpinner from '../../../utilities/loadingSpinner.component';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import SkillsSelection from '../../../sharedComponents/skillsSelection.component'

import { createVolunteerRequest, changeProjectItemReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  volunteersNeeded: Yup.number()
  .required("*Please type a number")
  .integer("*Only numbers allowed")
  .positive("N*Number must be above 0"),
  skills: Yup.array()
  .min(1, "*Please select at least one skill"),
  description: Yup.string()
  .required("*Description is required")
  .max(500, "*Must be less than 150 charachters"),
});

const ProjectVolunteerRequestForm = ({ project, showModal, dispatch, loading, hasErrors, success }) => {
  useEffect(() => {
    if (success) {
      dispatch(changeProjectItemReset())
      showModal(false)
    }
  }, [success, showModal])

  const formik = useFormik({
    initialValues: {
      volunteersNeeded: 0,
      description: "",
      skills: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const volunteerRequest = {
        volunteersNeeded: values.volunteersNeeded,
        description: values.description,
        skills: values.skills,
        project: project
      }
      dispatch(createVolunteerRequest(volunteerRequest))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addUpdateForm">

      <h2 className="formHeader"> Create Volunteer Request </h2>

      <div className="formGroup">
        <p className="formGroupHeader">How many volunteers do you need?</p>
        <input
          type="number"
          name="volunteersNeeded"
          placeholder="0"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.volunteersNeeded}
        />
        {formik.errors.volunteersNeeded &&
          <p className="formInputError"> {formik.errors.volunteersNeeded} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">What do you need volunteers to do?</p>
        <textarea
          type="text"
          name="description"
          rows="3"
          placeholder="E.g. To help with coordination"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description &&
          <p className="formInputError"> {formik.errors.description} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">What kind of volunteers do you need? <span className="red">*</span> </p>
        <SkillsSelection selectedSkills={formik.values.skills} setFieldValue={formik.setFieldValue} />
        {formik.errors.skills && (
          <p className="formInputError"> {formik.errors.skills} </p>
        )}
      </div>

      <div className="formGroup">
        <button className="standardButtonWithoutColour mcGreenBG" type="submit" disabled={loading}>
        {
          loading ? 
          <LoadingSpinner size="1x" style={{minHeight: "unset"}} /> 
          :
          null
        }
        {loading ? null : 'Add'}
        </button>
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

export default connect(MapStateToProps)(ProjectVolunteerRequestForm)

