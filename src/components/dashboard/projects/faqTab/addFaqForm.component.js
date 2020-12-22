import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { createFaq, changeProjectItemReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  question: Yup.string()
  .required("*Question is required")
  .max(150, "*Question must be less than 150 characters"),
  answer: Yup.string()
  .required("*Answer is required")
  .max(150, "*Answer must be less than 150 characters"),
});

const AddFaqForm = ({ project, showModal, dispatch, loading, hasErrors, success }) => {

  useEffect(() => {
    if (success) {
      dispatch(changeProjectItemReset())
      showModal(false)
    }
  }, [showModal, success])

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const faq = {
        answer: values.answer,
        question: values.question,
        project: project
      }
      dispatch(createFaq(faq))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addFaqForm">

      <h2 className="formHeader"> Add FAQ </h2>

      <div className="formGroup">
        <p className="formGroupHeader">Question</p>
        <textarea
          autoFocus
          type="text"
          name="question"
          rows="2"
          placeholder="E.g. Why do we need Sewing Machine"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.question}
        />
        {formik.errors.question &&
          <p className="formInputError"> {formik.errors.question} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">Answer</p>
        <textarea
          type="text"
          name="answer"
          rows="2"
          placeholder="E.g. To sew and mend clothes"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.answer}
        />
        {formik.errors.answer &&
          <p className="formInputError"> {formik.errors.answer} </p>
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

export default connect(MapStateToProps)(AddFaqForm)