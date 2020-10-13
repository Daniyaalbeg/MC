import React from 'react';

const ProjectFundingPanel = ({ project }) => {
  if (project.funding) {
    return (
      <div className="mainProjectFundingPanelContainer">
      <div className="mainProjectFundingPanel">
        <div className="mainProjectFundsRequired">
          <p className="mainProjectFundingTitle"> Funding Requested </p>
          <p className="mainProjectAmountOfFunds"> PKR {project.funding.fundingNeeded.toLocaleString()} </p>
        </div>
        <div className="mainProjectFundsRequired">
          <p className="mainProjectFundingTitle"> Funding Recieved </p>
          <p className="mainProjectAmountOfFunds"> PKR {project.funding.fundingReceived.toLocaleString()} </p>
        </div>
      </div>

      <div className="mainProjectFundsDescription">
        <p className="mainProjectTitle">Funds will be used for: </p>
        <p className="mainProjectText"> {project.funding.fundingUsedFor} </p>
      </div>

      <div className="mainProjectFundsDescription">
        <p className="mainProjectTitle"> Note: </p>
        <p className="mainProjectText"> Project's will be able to accept donations in an upcoming release. </p>
      </div>
      
      <div className="mainProjectFundingPanelContainer">
        <BankDetailsCard project={project}/>
      </div>
      </div>
    )
  } else {
    return <p className="mainProjectEmpty"> This project does not need any funding. </p>
  }
}

const BankDetailsCard = ({ project }) => {
  const bi = project.createdByOrganisation.bankingDetails
  if (!bi) return null

  if (bi.bankName || bi.bankBranch || bi.accountTitle || bi.accountNumber || bi.IBAN || bi.swiftCode  || bi.jazzCash || bi.easyPaisa) {
    return (
      <>
      <p> Donate Funds To: </p>
      <div className="bankDetailsCardContainer">
        {bi.bankName &&
        <div>
          <p className="bankDetailsCardTitle"> Bank Name </p>
          <p className="bankDetailsCardText"> {bi.bankName} </p>
        </div>
        }
        {bi.bankBranch &&
        <div>
          <p className="bankDetailsCardTitle"> Bank Branch </p>
          <p className="bankDetailsCardText"> {bi.bankBranch} </p>
        </div>
        }
        {bi.accountTitle &&
        <div>
          <p className="bankDetailsCardTitle"> Account Title </p>
          <p className="bankDetailsCardText"> {bi.accountTitle} </p>
        </div>
        }
        {bi.accountNumber &&
        <div>
          <p className="bankDetailsCardTitle"> Account Number </p>
          <p className="bankDetailsCardText"> {bi.accountNumber} </p>
        </div>
        }
        {bi.IBAN &&
        <div>
          <p className="bankDetailsCardTitle"> IBAN </p>
          <p className="bankDetailsCardText"> {bi.IBAN} </p>
        </div>
        } 
        {bi.swiftCode &&
        <div>
          <p className="bankDetailsCardTitle"> Swift </p>
          <p className="bankDetailsCardText"> {bi.swiftCode} </p>
        </div>
        }
        {bi.jazzCash &&
        <div>
          <p className="bankDetailsCardTitle"> JazzCash </p>
          <p className="bankDetailsCardText"> {bi.jazzCash} </p>
        </div>
        }
        {bi.easyPaisa &&
        <div>
          <p className="bankDetailsCardTitle"> Easypaisa </p>
          <p className="bankDetailsCardText"> {bi.easyPaisa} </p>
        </div>
        }
      </div>
      </>
    ) 
  } else return null
}

export default ProjectFundingPanel