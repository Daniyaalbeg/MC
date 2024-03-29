import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Form, Spinner, Card } from 'react-bootstrap';
import { Formik, Field, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import Dropzone, { useDropzone } from 'react-dropzone';

import CheckboxGroup, { Checkbox } from '../utilities/Checkboxs.component';
import Thumb from '../utilities/thumb.component';
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from '../utilities/dropzoneStyles';
import { createGroup, resettingCreateGroup } from '../../Actions/groupActions';


const validationSchema = Yup.object().shape({
  groupName: Yup.string()
  .required("*Group name is required")
  .min(1, "*Event name must be longer than 1 charachter")
  .max(30, "*Event name must be less than 30 charachters")
  .matches(/^[a-zA-Z0-9_ ]*$/, "*Event name must only contain letters or numbers"),
  groupDescription: Yup.string()
  .required("*Group description is required")
  .min(1, "*Group description must be longer than 1 charachter")
  .max(600, "*Group description must be less than 600 charachters"),
  groupWhatsappLink: Yup.string()
  .when('privateGroup', {
    is: false,
    then: Yup.string().required("*Whatsapp link is required")
  })
  .url("*Please enter a valid whatsapp URL e.g. https://chat.whatsapp.com/HJa67a34sdGr2rYR"),
  groupAdmin: Yup.string()
  .required("*Admin name is required")
  .min(1, "*Admin name must be longer than 1 charachter")
  .max(100, "*Admin name must be less than 100 charachters"),
  groupAdminContact: Yup.string()
  .required("*Admin Whatsapp number is required")
  .min(1, "*Admin Whatsapp number must be longer than 1 charachter")
  .max(20, "*Admin Whatsapp number must be less than 20 charachters"),
  affiliatedOrg: Yup.array()
  .max(1, "*Can only be affilated with one organisation"),
  agreedToTerms: Yup.bool()
  .oneOf([true], "*Must accept terms and conditions"),
});

const CreateGroup = ({ dispatch, auth, loading, hasErrors, success, props, orgs, userInfoFetched }) => {
  const [imageNumberError, setImageNumberError] = useState(false)
  const [rejectedFilesState, setRejectedFilesState] = useState([])
  const {
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg, image/gif',
    maxSize: 2000000,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  if (!auth || !userInfoFetched) return <Redirect push to="/dashboard" />
  if (success) {
    dispatch(resettingCreateGroup())
    return <Redirect push to="/dashboard" />
  } 

  return (
    <Card bg="light" text="dark" className="oldForm">
      <Card.Header> Create Group </Card.Header>

      <Formik
        initialValues={{
          groupName: "",
          groupImage: "",
          groupDescription: "",
          groupWhatsappLink: "",
          groupAdmin: "",
          groupAdminContact: "",
          groupType: [],
          affiliatedOrg: [],
          privateGroup: true,
          agreedToTerms: false,
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          const group = {
            groupName: values.groupName,
            image: values.groupImage,
            groupDescription: values.groupDescription,
            groupType: values.groupType,
            groupAdmin: values.groupAdmin,
            groupAdminContact: values.groupAdminContact,
            groupWhatsappLink: values.groupWhatsappLink,
            affiliatedOrg: values.affiliatedOrg ? values.affiliatedOrg[0] : null,
            privateGroup: values.privateGroup
          }
          dispatch(createGroup(group))
          // alert(JSON.stringify(group))
        }}
      >
      {({values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched, }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Card.Body>
        {/* <Card.Title>  </Card.Title> */}
        <Form.Group controlId="formBasicName">
          <Form.Label> Group Name <span className="red">*</span></Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter group name"
            name="groupName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.groupName}
            isValid={touched.groupName && !errors.groupName}
            isInvalid={errors.groupName}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.groupName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label> Group Description <span className="red">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter group description"
            name="groupDescription"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.groupDescription}
            isValid={touched.groupDescription && !errors.groupDescription}
            isInvalid={errors.groupDescription}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.groupDescription}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label> Group image (Under 1mb, file must have extension of either .jpg, .jpeg or .png) </Form.Label>
          <Dropzone 
            accept = 'image/jpeg, image/png, image/jpg, image/gif'
            maxSize = {11000000}
            onDropRejected={(rejectedFiles) => {
              console.log('rejected')
              setRejectedFilesState(rejectedFiles)
            }}
            onDrop={(acceptedFiles, rejectedFiles) => {
              if (rejectedFiles.length === 0) {
                setRejectedFilesState([])
              }
              if (acceptedFiles.length > 1) {
                setImageNumberError(true)
              } else {
                setImageNumberError(false)
                setFieldValue('groupImage', acceptedFiles[0]);
              }
          }}>
            {({getRootProps, getInputProps}) => (
              <>
              <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag your image here, or click to select a image</p>
                <div className="rowThumb">
                  { values.groupImage &&
                      <Thumb file={values.groupImage} key={values.groupImage.name} />
                  }
                </div>
              </div>
              {rejectedFilesState.length === 0 ? null : <p className="redStandardError"> Your file was rejected. Make sure they are not more than 1mb. </p>}
              {imageNumberError ? <p className="redStandardError"> Only 1 image is allowed. </p> : null}
              </>
          )}
          </Dropzone>
          <p className="redStandardError"> {errors.imageFile} </p>
        </Form.Group>

        <Form.Group controlId="formBasicGroupWhatsappLink">
          <Form.Label>Group Whatsapp Invite Link <span className="red">*</span></Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter whatsapp invite link"
            name="groupWhatsappLink"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.groupWhatsappLink}
            isValid={touched.groupWhatsappLink && !errors.groupWhatsappLink}
            isInvalid={errors.groupWhatsappLink}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.groupWhatsappLink}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicAdminName">
          <Form.Label>Group Admin Name <span className="red">*</span></Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter admin name"
            name="groupAdmin"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.groupAdmin}
            isValid={touched.groupAdmin && !errors.groupAdmin}
            isInvalid={errors.groupAdmin}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.groupAdmin}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicGroupAdminContact">
          <Form.Label>Group Admin Whatsapp Number <span className="red">*</span></Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter admin whatsapp number"
            name="groupAdminContact"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.groupAdminContact}
            isValid={touched.groupAdminContact && !errors.groupAdminContact}
            isInvalid={errors.groupAdminContact}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.groupAdminContact}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label> Category </Form.Label>
          <CheckboxGroup
            id="groupType"
            value={values.groupType}
            error={errors.groupType}
            touched={touched.groupType}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          >
            <Field
              component={Checkbox}
              name="groupType"
              id="animalWelfare"
              label="Animal Welfare"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="artsAndCulture"
              label="Arts and Culture"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="clothing"
              label="Clothing"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="communityDevelopment"
              label="Community Development"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="disability"
              label="Disability"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="disaster"
              label="Disaster"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="education"
              label="Education"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="primary"
              label=" - Primary"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="secondary"
              label=" - Secondary"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="higher"
              label=" - Higher"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="energy"
              label="Energy"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="environment"
              label="Environment"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="forest"
              label=" - Forest"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="water"
              label=" - Water"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="equality"
              label="Equality"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="food"
              label="Food"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="agriculture"
              label=" - Agriculture"
            />
            <Field
              component={Checkbox}
              name="areaOfWork"
              id="livestock"
              label=" - Livestock"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="fisheries"
              label=" - Fisheries"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="gender"
              label="Gender"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="health"
              label="Health"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="motherAndChildHealth"
              label=" - Mother and Child Health"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="humanRights"
              label="Human Rights"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="infrastructure"
              label="Infrastructure"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="it"
              label="IT"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="justice"
              label="Justice"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="livelihood"
              label="Livelihood"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="money"
              label="Money"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="peace"
              label="Peace"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="ppe"
              label="Protection Equipment"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="povertyAlleviation"
              label="Poverty Alleviation"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="recycling"
              label="Recycling"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="sanitation"
              label="Sanitation"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="sports"
              label="Sports"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="terrorism"
              label="Terrorism"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="virus"
              label="Virus"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="waste"
              label="Waste"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="youth"
              label="Youth"
            />
            <Field
              component={Checkbox}
              name="groupType"
              id="other"
              label="Other"
            />
          </CheckboxGroup>
        </Form.Group>

        {orgs &&
          <Form.Group>
          <Form.Label> Affiliated Organisation </Form.Label>
          <Form.Text> Is your group affilated with one of your organisations? </Form.Text>
            <CheckboxGroup
              id="affiliatedOrg"
              value={values.affiliatedOrg}
              error={errors.affiliatedOrg}
              touched={touched.affiliatedOrg}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            >
              {
                orgs.map((org) => {
                  return (
                    <Field
                      key={org._id}
                      component={Checkbox}
                      name="affilatedOrg"
                      id={org._id}
                      label={org.name}
                    />
                  )
                })
              }
            </CheckboxGroup>
          </Form.Group>
        }

        <Form.Group>
          <Field
            component={Checkbox}
            name="privateGroup"
            id="privateGroup"
            label={<p className="agreedTo"> Is this a private Group? (Invite link is hidden) </p>}
            isValid={touched.privateGroup && !errors.privateGroup}
            isInvalid={errors.privateGroup}
          />
        </Form.Group>

        <Form.Group>
          <Field
            component={Checkbox}
            name="agreedToTerms"
            id="agreedToTerms"
            label={<p className="agreedTo"> Agreed to <Link to="/termsandconditions" target="_blank" > Terms & Conditions </Link></p>}
            isValid={touched.agreedToTerms && !errors.agreedToTerms}
            isInvalid={errors.agreedToTerms}
          />
        </Form.Group>

        <div className="formButtons">
          <button className="standardButton" type="submit" disabled={loading}>
            {
              loading ? 
              <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
              :
              null
            }
            {loading ? 'Creating Group' : 'Create Group'}
          </button>

          <button className="standardButton redVersion" style={{marginLeft: "8px"}} onClick={() => {
            props.history.goBack()
          }} disabled={loading}>
            Cancel
          </button>
        </div>

        {hasErrors &&
          <>
            <br />
            <p className="redError"> An error has occured please try again later or email support.</p>
          </>
        }

        <Form.Text className="text-muted">
          Note: Once we have verified your group only then will it become visible on the page.
        </Form.Text>

        </Card.Body>
      </Form>
      )}
      </Formik>
    </Card>
  )
}

const MapStateToProps = (state, ownProps) => ({
  auth: state.auth.auth,
  loading: state.groupInfo.createGroup.loading,
  hasErrors: state.groupInfo.createGroup.hasErrors,
  success: state.groupInfo.createGroup.success,
  orgs: state.userInfo.user.createdOrganisations,
  userInfoFetched: state.userInfo.fetched,
  props: ownProps
})

export default connect(MapStateToProps)(CreateGroup)