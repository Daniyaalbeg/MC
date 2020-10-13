import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { creatingPublicProjectItem, createPublicProjectItemReset } from '../../../Actions/projectActions';
import SelectMap from '../../signup/selectMap.component';

const validationSchema = Yup.object().shape({
  description: Yup.string()
  .required("*Description of supplies is required")
  .max(150, "*Must be less than 150 charachters"),
  username: Yup.string()
  .required("*Name is required")
  .max(30, "*Name must be less than 30 characters"),
  mobile: Yup.number()
  .required("*Must be a mobile number.")
  .typeError("*Must be a number"),
  contactDetails: Yup.string()
  .max(150, "*Must be less than 150 charachters"),
  amount: Yup.number()
  .typeError("*Must be a number")
  .min(0, "*Number must be positive")
  .min(1, "*1 is the minimum number of items"),
  canDeliver: Yup.bool()
  .typeError('*Must be a bool'),
  mapClicked: Yup.bool()
  .test(
    'checkIfDeliver',
    '*Please select a location for pickup',
    function(v) {
      const ref = Yup.ref('canDeliver')
      const currentVal = this.resolve(ref)
      if (!currentVal) {
        return true
      }
      if (!currentVal && !v) {
        return false
      }
      return false
    }
  )
});

const ContributeSelectedSupply = ({ dispatch, user, loading, hasErrors, success, project, supply, setSelectedSupply, setSubmitted }) => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (success) {
      dispatch(createPublicProjectItemReset())
      setSelectedSupply(null)
      setSubmitted('SUPPLY')
    }
  }, [setSelectedSupply, success])

  useEffect(() => {
    dispatch(createPublicProjectItemReset())
  }, [])

  const formik = useFormik({
    initialValues: {
      description: "",
      username: user.username ? user.username : "",
      mobile: user.mobile ? user.mobile : "",
      contactDetails: "",
      amount: 1,
      canDeliver: false,
      mapClicked: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!formik.values.canDeliver && !formik.values.mapClicked) return
      let newPoint = null
      if (values.mapClicked) {
        newPoint = {
          type: 'Point',
          coordinates: location
        }
      } 
      const supplyAmount = {
        description: values.description,
        username: values.username,
        mobile: values.mobile,
        contactDetails: values.contactDetails,
        amount: values.amount,
        canDeliver: values.canDeliver,
        location: newPoint,
      }
      dispatch(creatingPublicProjectItem(supplyAmount, project._id, supply._id))
    }
  })
  
  return (
    <div className="callToActionSubmitSupplyContainer">
      <form onSubmit={formik.handleSubmit} className="createSupplyAmountForm">
      
        <h2 className="formHeader"> Contributing {supply.name} </h2>

        <div className="formGroup">
          <p className="formGroupHeader">Description</p>
          <textarea
            autoFocus
            type="text"
            name="description"
            rows="3"
            placeholder="E.g. 5 sewing machines, 2 of which are old but workable"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description &&
            <p className="formInputError"> {formik.errors.description} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Name</p>
          <input
            type="text"
            name="username"
            placeholder=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username &&
            <p className="formInputError"> {formik.errors.username} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Mobile</p>
          <input
            type="text"
            name="mobile"
            placeholder=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.errors.mobile &&
            <p className="formInputError"> {formik.errors.mobile} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Other contact Info e.g. (Whatsapp)</p>
          <textarea
            type="text"
            name="contactDetails"
            rows="2"
            placeholder="E.g. You can reach me on whatsapp at ... "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactDetails}
          />
          {formik.errors.contactDetails &&
            <p className="formInputError"> {formik.errors.contactDetails} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Amount</p>
          <input
            type="text"
            name="amount"
            placeholder=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.errors.amount &&
            <p className="formInputError"> {formik.errors.amount} </p>
          }
        </div>

        <div className="formGroup">
          <p className="formGroupHeader">Can you deliver?</p>
          <input
            type="checkbox"
            name="canDeliver"
            id="formCheckbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.canDeliver}
          />
          {formik.errors.canDeliver &&
            <p className="formInputError"> {formik.errors.canDeliver} </p>
          }
        </div>

        {!formik.values.canDeliver && 
          <div className="formGroup">
            <p className="formGroupHeader">Location for pickup</p>
            <SelectMap
              className="selectMap"
              callBack={(location) => {
                setLocation(location)
                formik.setFieldValue("mapClicked", true)
              }}
            />
          {formik.errors.mapClicked &&
            <p className="formInputError"> {formik.errors.mapClicked} </p>
          }
          </div>
        }

        <div className="formGroup">
        <button className="standardButtonWithoutColour mcGreenBG" type="submit" disabled={loading}>
        {
          loading ? 
          <Spinner animation="border" size="sm" /> 
          :
          null
        }
        {loading ? null : 'Submit'}
        </button>
        <button onClick={() => setSelectedSupply(null)} style={{marginTop: '8px'}} className="standardButtonWithoutColour mcGreenBG" > Back </button>
      </div>
      {hasErrors &&
        <p className="error" style={{marginTop: '8px'}}> An error occurred please try again or contact support at info@ministryofchange.org </p>
      }

      </form>
    </div>
  )
}

const MapStateToProps = (state) => ({
  user: state.userInfo.user,
  loading: state.projectInfo.mainProjectCreate.loading,
  hasErrors: state.projectInfo.mainProjectCreate.hasErrors,
  success: state.projectInfo.mainProjectCreate.success
})

export default connect(MapStateToProps)(ContributeSelectedSupply)