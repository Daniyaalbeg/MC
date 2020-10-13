import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { createSupply, changeProjectItemReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Name of item is required")
  .max(30, "*Name must be less than 30 characters"),
  description: Yup.string()
  .required("*Description is required")
  .max(150, "*Must be less than 150 charachters"),
  amountNeeded: Yup.number()
  .required("*Please add the amount of this item you need.")
  .typeError("*Must be a number")
  .positive("*Number must be positive"),
  amountReceived: Yup.number()
  .typeError("*Must be a number")
  .min(0, "*Number must be positive")
  .test(
    'lessThan',
    '*Must be less than the amount needed',
    function(v) {
      const ref = Yup.ref('amountNeeded')
      const currentVal = this.resolve(ref)
      if (!currentVal) return true
      return v <= this.resolve(ref)
    }
  )
});

const AddSupplyForm = ({ project, showModal, dispatch, loading, hasErrors, success }) => {

  useEffect(() => {
    if (success) {
      dispatch(changeProjectItemReset())
      showModal(false)
    }
  }, [success, showModal])

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      amountNeeded: "",
      amountReceived: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const supply = {
        name: values.name,
        description: values.description,
        amountReceived: values.amountReceived,
        amountNeeded: values.amountNeeded,
        supplyReceived: false,
        suppliedBy: [],
        project: project
      }
      dispatch(createSupply(supply))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addSupplyForm">

      <h2 className="formHeader"> Add Items Needed </h2>

      <div className="formGroup">
        <p className="formGroupHeader">Name</p>
        <input
          autoFocus
          type="text"
          name="name"
          placeholder="E.g. Sewing Machine"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name &&
          <p className="formInputError"> {formik.errors.name} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">Description</p>
        <textarea
          type="text"
          name="description"
          rows="2"
          placeholder="E.g. To sew and mend clothes"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description &&
          <p className="formInputError"> {formik.errors.description} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">Amount Needed</p>
        <input
          type="text"
          name="amountNeeded"
          placeholder="E.g. 42"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amountNeeded}
        />
        {formik.errors.amountNeeded &&
          <p className="formInputError"> {formik.errors.amountNeeded} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">Amount already aquired?</p>
        <input
          type="text"
          name="amountReceived"
          placeholder="0"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amountReceived}
        />
        {formik.errors.amountReceived &&
          <p className="formInputError"> {formik.errors.amountReceived} </p>
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

export default connect(MapStateToProps)(AddSupplyForm)