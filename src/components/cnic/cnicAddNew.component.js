import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../css/cnic.css'
import { Row, Table, Spinner } from 'react-bootstrap';
import { selectCnicEvent } from '../../Actions/cnicActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-duotone-svg-icons';
import { faFileUpload, faDownload, faUpload, faPlusCircle} from '@fortawesome/pro-duotone-svg-icons';
import xlsx from 'xlsx';

import { uploadCnic, uploadFileCnic, uploadCnicReset } from '../../Actions/cnicActions';
import getRandomColour from '../utilities/randomMCColour.component'
import sampleXlsx from '../../assets/cnic_sample.xlsx';

const CnicAddNew = ({ dispatch, events, supplier, selectedCnicEvent, uploadLoading, uploadSuccess, uploadHasErrors, uploadErrorIDs }) => {
  if (selectedCnicEvent) {
    return (
      <>
        <Row className="headingCNIC">
          <h4> Choose how to add CNIC information </h4>
          <button className="standardButton" disabled={uploadLoading} onClick={() => dispatch(selectCnicEvent(null))}> Back </button>
        </Row>
        <div className="cnicAddContainer">
          <CnicAddOptions dispatch={dispatch} selectedEvent={selectedCnicEvent} uploadLoading={uploadLoading} uploadSuccess={uploadSuccess} uploadHasErrors={uploadHasErrors} uploadErrorIDs={uploadErrorIDs}/>
        </div>
      </>
    )
  } else {
    if (!supplier) {
       return (
        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="cnicExclamationIcon" /> Please create an organisation in your dashboard to add CNIC information </p>
       )
    }
    return (
      <>
        <h4> Choose a distribution to add CNIC numbers for </h4>
        <div className="cnicEventsList">
        {
          events.map((event) => {
            return (
              <div key={event._id}>
                <div className="cnicEvent">
                  <p className="cnicItemText"> {event.name} </p>
                  <button className="cnicItemButton" variant="secondary" onClick={() => {
                    dispatch(selectCnicEvent(event))
                    dispatch(uploadCnicReset())
                  }
                  }>
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" swapOpacity style={{"--fa-secondary-opacity": 0, color: getRandomColour() }} className="faSelectEventButton" />
                  </button>
                </div>
              </div>
            )
          })
        }
        </div>
      </>
    )
  }
}

const parseExcelFile = (e, setFile) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    var data = e.target.result
    let readData = xlsx.read(data, {type: 'binary'});
    const workSheetName = readData.SheetNames[0];
    const workSheet = readData.Sheets[workSheetName];

    const dataParse = xlsx.utils.sheet_to_json(workSheet, {header: 1})
    setFile(dataParse)
  }
  reader.readAsBinaryString(e.target.files[0])
}

const CNICTableHeader = (props) => {
  return (
    <thead>
      <tr>
        {
          props.data.map((element) => {
            return <td key={element}> {element} </td>
          })
        }
      </tr>
    </thead>
  )
}

const CNICTableBody = (props) => {
  const copyData = [...props.data]
  copyData.splice(0, 1)
  return (
    <tbody>
      {
        copyData.map((row) => {
          return (
            <tr key={row}>
              {
                row.map((element) => {
                  return <td key={element}> {element} </td>
                })
              }
            </tr>
          )
        })
      }
    </tbody>
  )
}

const CnicAddOptions = (props) => {
  const { dispatch, selectedEvent, uploadLoading, uploadSuccess, uploadHasErrors, uploadErrorIDs } = props

  const [fileSampleLoaded, setFileSampleLoaded] = useState(false);
  const [fileDataUploaded, setFileDataUploaded] = useState(false);
  const [fileData, setFileData] = useState(null)
  const [file, setFile] = useState(null)

  if (fileSampleLoaded) {
    return (
      <div className="cnicSampleUploadedCnicContainer">
        {fileData &&
          <Table striped bordered hover size="sm">
            <CNICTableHeader data={fileData[0]} />
            <CNICTableBody data={fileData} />
         </Table>
        }
        <button className="standardButton" disabled={uploadLoading} onClick={() => {
          dispatch(uploadCnic(selectedEvent._id, fileData))
        }}>
          {
            uploadLoading ? 
            <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
            :
            <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '8px' }} />
          }
           {uploadLoading ? "Uploading" : "Upload" }
         </button>

         <UploadedSuccessOrError uploadErrorIDs={uploadErrorIDs} uploadHasErrors={uploadHasErrors} uploadSuccess={uploadSuccess} />

         <p className="text-muted cnicNote"> Note: Please make sure all the columns in the file are filled, if any are empty type type null or empty intead of leaving them blank. </p>
      </div>
    )
  } else if (fileDataUploaded) {
    return (
      <div className="cnicUploadedContainer">
        <p> {file.name} </p>
        <button className="standardButton" disabled={uploadLoading} onClick={() => {
          dispatch(uploadFileCnic(selectedEvent._id, file))
        }}>
          {
            uploadLoading ? 
            <Spinner animation="grow" size="sm" style={{ marginRight: '8px' }} /> 
            :
            <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '8px' }} />
          }
           {uploadLoading ? "Uploading" : "Upload" }
         </button>
         {
           uploadHasErrors &&
           <p className="error"> An error occurred with the upload </p>
         }
         {
           uploadSuccess &&
           <p className="cnicSuccess cnicNote"> File was uploaded successfully and awaits review </p>
         }
      </div>
    )
  } else {
    return (
      <div className="cnicAddOptionsContainer">
        <div>
          <p> Download this sample file and copy your CNIC info according to the given columns and then upload it. </p>
          <label htmlFor="file-download" className="sampleDownload">
          <a id="file-download" href={sampleXlsx}> 
            <FontAwesomeIcon icon={faDownload} style={{marginRight: '8px'}} />
            Download Template
          </a>
          </label>
          <label htmlFor="file-sample-upload" className="cnicFileInput">
            <input onChange={(e) => {
              setFileSampleLoaded(true)
              parseExcelFile(e, setFileData)
            }} id="file-sample-upload" type="file" accept=".xlsx" />
            <FontAwesomeIcon icon={faUpload} style={{marginRight: '8px'}} />
            Upload File
          </label>
        </div>
        <div>
          <h4> OR </h4>
        </div>
        <div>
          <p> Upload your file directly here and we shall add the information </p>
          <label htmlFor="file-Data-upload" className="cnicFileInput">
            <input onChange={(e) => {
              setFileDataUploaded(true)
              setFile(e.currentTarget.files[0])
            }} id="file-Data-upload" type="file" accept=".xlsx" />
            <FontAwesomeIcon icon={faUpload} style={{marginRight: '8px'}} />
            Upload File
          </label>
        </div>
      </div>
    )
  }
}

const UploadedSuccessOrError = ({ uploadErrorIDs, uploadHasErrors, uploadSuccess }) => {
  if (uploadErrorIDs.length !== 0 ) {
    return (
      <p className="error" style ={{marginTop: "16px"}}> There was an issue uploading row number: {uploadErrorIDs.toString()} </p>    
    )
  } else if (uploadHasErrors) {
    return (
      <p className="error"> An error occurred with the upload </p>
    )
  } else if (uploadSuccess) {
    return (
      <p className="cnicSuccess cnicNote"> File was uploaded successfully and awaits review </p>
    )
  }

  return (
    null
  )
}

const MapStateToProps = (state) => ({
  supplier: state.userInfo.user.supplier,
  events: state.userInfo.user.supplier ? state.userInfo.user.supplier.events : null,
  selectedCnicEvent: state.cnicInfo.selectedCnicEvent,
  uploadLoading: state.cnicInfo.uploadLoading,
  uploadSuccess: state.cnicInfo.uploadSuccess,
  uploadHasErrors: state.cnicInfo.uploadHasErrors,
  uploadErrorIDs: state.cnicInfo.uploadErrorIDs,
})

export default connect(MapStateToProps)(CnicAddNew)