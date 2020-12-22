import React from 'react'

import MoneyNumberDetails from '../../../sharedComponents/numberMoneyDetails.component';
import BankingDetails from '../../../sharedComponents/bankingDetails.component';

const OrgBank = ({ org }) => {
  return (
    <div className="orgCard orgCardC">
      <BankingDetails bankingDetails={org.bankingDetails} />
      <MoneyNumberDetails name="EasyPaisa" number={org.bankingDetails.easyPaisa} />
      <MoneyNumberDetails name="JazzCash" number={org.bankingDetails.jazzCash} />
    </div>
  )
}

export default OrgBank
