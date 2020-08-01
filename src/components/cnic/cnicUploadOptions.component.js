import React, { useState } from 'react';
import xlsx from 'xlsx';

import { Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFileUpload, faDownload, faUpload, faPlusCircle} from '@fortawesome/pro-duotone-svg-icons';

import sampleXlsx from '../../assets/cnic_sample.xlsx';
import { uploadCnic, uploadFileCnic } from '../../Actions/cnicActions';

const CnicUploadOptions = ({ dispatch, selectedEvent, uploadLoading, uploadSuccess, uploadHasErrors, uploadErrorIDs }) => {
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

export default CnicUploadOptions