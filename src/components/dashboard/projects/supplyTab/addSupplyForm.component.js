import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { createSupply, creatingSupplyReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required("*Name of item is required")
  .max(30, "*Email must be less than 30 characters"),
  amountNeeded: Yup.number()
  .required("*Please add the amount of this item you need.")
  .typeError("*Must be a number")
  .positive("*Number must be positive"),
  amountReceived: Yup.number()
  .typeError("*Must be a number")
  .min(0, "*Number must be positive")
});

const AddSupplyForm = ({ project, setAddSupplyModal, dispatch, loading, hasErrors, success }) => {

  if (success) {
    dispatch(creatingSupplyReset())
    setAddSupplyModal(false)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      amountNeeded: 0,
      amountReceived: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const supply = {
        name: values.name, 
        amountReceived: values.amountReceived,
        amountNeeded: values.amountNeeded,
        supplyReceived: false,
        suppliedBy: []
      }
      dispatch(createSupply(supply, project))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addSupplyForm">

      <h2> Add Supply </h2>

      <div className="formGroup">
        <p className="formGroupHeader">Supply Name</p>
        <input
          type="name"
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
        <p className="formGroupHeader">Amount Needed</p>
        <input
          type="amountNeeded"
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
        <p className="formGroupHeader">Supply amount already aquired?</p>
        <input
          type="amountReceived"
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

      <div>
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
  loading: state.projectInfo.createSupply.loading,
  hasErrors: state.projectInfo.createSupply.hasErrors,
  success: state.projectInfo.createSupply.success,
})

export default connect(MapStateToProps)(AddSupplyForm)