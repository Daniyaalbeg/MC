import React, { useState, useMemo, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import Dropzone, { useDropzone } from 'react-dropzone';
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from '../../../utilities/dropzoneStyles';
import Thumb from '../../../utilities/thumb.component';

import { createUpdate, changeProjectItemReset } from '../../../../Actions/projectActions';

const validationSchema = Yup.object().shape({
  title: Yup.string()
  .required("*Title of update is required")
  .max(50, "*Title must be less than 50 characters"),
  description: Yup.string()
  .required("*Description is required")
  .max(150, "*Must be less than 150 charachters"),
  date: Yup.date()
  .required("*Date of update is required.")
});

const AddUpdateForm = ({ project, showModal, dispatch, loading, hasErrors, success }) => {
  const [rejectedFilesState, setRejectedFilesState] = useState([]);
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

  useEffect(() => {
    if (success) {
      dispatch(changeProjectItemReset())
      showModal(false)
    }
  }, [success, showModal])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const update = {
        title: values.title,
        description: values.description,
        date: values.date,
        images: values.images,
        project: project
      }
      dispatch(createUpdate(update))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="addUpdateForm">

      <h2 className="formHeader"> Create New Update </h2>

      <div className="formGroup">
        <p className="formGroupHeader">Title</p>
        <input
          autoFocus
          type="text"
          name="title"
          placeholder="E.g. First project update!"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.errors.title &&
          <p className="formInputError"> {formik.errors.title} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader">Description</p>
        <textarea
          type="text"
          name="description"
          rows="2"
          placeholder="E.g. To Inform people about my progress"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description &&
          <p className="formInputError"> {formik.errors.description} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader"> Date of this update </p>
        <DatePicker
            selected={formik.values.date}
            onChange={(date) => {
              formik.setFieldValue('date', date);
            }}
            name="date"
            // className="datePicker"
            minDate={new Date()}
          />
        {formik.errors.date &&
          <p className="formInputError"> {formik.errors.date} </p>
        }
      </div>

      <div className="formGroup">
        <p className="formGroupHeader"> Images (Max 3 images, each should be less than 1MB) </p>
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
              formik.setFieldValue('images', acceptedFiles);
          }}>
            {({getRootProps, getInputProps}) => (
              <>
              <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop images here, or click to select images</p>
                <div className="thumbnailRow"> 
                  {
                    formik.values.images.map((file) => {
                      return <Thumb file={file} key={file.name} />
                    })
                  }
                </div>
              </div>
              {rejectedFilesState.length === 0 ? null : <p className="redError"> Some files were rejected. make sure they are not more than 1mb. </p>}
              </>
          )}
          </Dropzone>
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

export default connect(MapStateToProps)(AddUpdateForm)