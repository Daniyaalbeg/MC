import React from 'react';

import mcLogo from '../assets/svg/MCMCGray.svg';
import getRandomColour from './utilities/randomMCColour.component';
import '../css/misc.css'
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const randomColour = getRandomColour()

  return (
    <div className="tcPage" style={{backgroundColor: randomColour}}>
      <div className="tcContainer">
        <img className="mcLogoTC" src={mcLogo} alt="MC"/>
        <p className="tcHeader"> Privacy Policy </p>
        <p> This privacy policy applies between you, the User of this Website and Ministry of Change, the owner and provider of this Website. This privacy policy applies to our use of any and all Data collected by us or provided by you in relation to your use of the Website. </p>
        <p className="tcSubHeader"> Please read this privacy policy carefully. </p>
        <p className="tcSubHeader"> Definitions and interpretation </p>
        <ol>
          <li> In this privacy policy, the following definitions are used: </li>
          <table>
            <tr>
              <td> <span className="tcTableHead">Data</span> </td>
              <td> collectively all information that you submit to Ministry of Change via the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws; </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">Cookies</span> </td>
              <td> a small text file placed on your computer by this Website when you visit certain parts of the Website and/or when you use certain features of the Website. Details of the cookies used by this Website are set out in the clause below (Cookies); </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">Data Protection Laws</span> </td>
              <td> any applicable law relating to the processing of personal Data, including but not limited to the Directive 96/46/EC (Data Protection Directive) or the GDPR, and any national implementing laws, regulations and secondary legislation, for as long as the GDPR is effective in the UK; </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">GDPR</span> </td>
              <td> the General Data Protection Regulation (EU) 2016/679; </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">Ministry of Change, we  or us</span> </td>
              <td> Ministry of Change LTD, a company incorporated in England and Wales whose registered office is at 128, Cannon Worshops, Cannon Drive, London, E144AS </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">UK and EU Cookie Law</span> </td>
              <td> the Privacy and Electronic Communications (EC Directive) Regulations 2003 as amended by the Privacy and Electronic Communications (EC Directive) (Amendment) Regulations 2011; </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">User or you</span> </td>
              <td> any third party that accesses the Website and is not either (i) employed by Ministry of Change and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing services to Ministry of Change and accessing the Website in connection with the provision of such services; and </td>
            </tr>
            <tr>
              <td> <span className="tcTableHead">Website</span> </td>
              <td> the website that you are currently using https://ministryofchange.org/, and any sub-domains of this site unless expressly excluded by their own terms and conditions. </td>
            </tr>
          </table>
          <br />
          <li>
            In this privacy policy, unless the context requires a different interpretation:
            <ol type="1">
              <li> the singular includes the plural and vice versa; </li>
              <li> references to sub-clauses, clauses, schedules or appendices are to sub-clauses, clauses, schedules or appendices of this privacy policy; </li>
              <li> a reference to a person includes firms, companies, government entities, trusts and partnerships; </li>
              <li> "including" is understood to mean "including without limitation"; </li>
              <li> reference to any statutory provision includes any modification or amendment of it; </li>
              <li> the headings and sub-headings do not form part of this privacy policy. </li>
            </ol>
          </li>
        </ol>
        <p className="tcSubHeader"> Scope of this Privacy Policy </p>
        <ol>
          <li> This privacy policy applies only to the actions of Ministry of Change and Users with respect to this Website. It does not extend to any websites that can be accessed from this Website including, but not limited to, any links we may provide to social media websites. </li>
          <li> For purposes of the applicable Data Protection Laws, Ministry of Change is the "data controller". This means that Ministry of Change determines the purposes for which, and the manner in which, your Data is processed. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Data Collected </p>
        <ol>
          <li> Username; </li>
          <li> Password (safeguarded in storage and translated into scrambled representation of itself); </li>
          <li> Name; </li>
          <li> Age; </li>
          <li> Gender; </li>
          <li> Date of Birth; </li>
          <li> Address; </li>
          <li> Family Size; </li>
          <li> Email Address; </li>
          <li> Billing Address (If saved to your account); </li>
          <li> Contact Information, including social media; </li>
          <li> 12.	Location, IP address, and browser type (automatically collected when purchases are made); </li>
        </ol>
        <p> In each case, in accordance with this privacy policy </p>
        <br />
        <p className="tcSubHeader"> How we collect Data </p>
        <ol>
          <li>
          	We collect Data in the following ways:
            <ol>
              <li> data is given to us by you; and </li>
              <li> data is collected automatically </li>
            </ol>
          </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Data that is given to us by you </p>
        <ol>
          <li> 
            Ministry of Change will collect your Data in a number of ways, for example: 
            <ol>
              <li> when you contact us through the Website, by telephone, post, e-mail or through any other means; </li>
              <li> when you register with us and set up an account; </li>
              <li> when you make payments to us, through this Website or otherwise; </li>
              <li> when you purchase products on this Website; </li>
              <li> when you sign-up for our activities through this Website </li>
              <li> when you use our services; </li>
            </ol>
          </li>
        </ol>
        <p> in each case, in accordance with this privacy policy. </p>
        <br />
        <p className="tcSubHeader"> Data that is collected automatically </p>
        <ol>
          <li>
            To the extent that you access the Website, we will collect your Data automatically, for example:
          <ol>
            <li> We automatically collect some information about your visit to the Website. This information helps us to make improvements to Website content and navigation, and includes your IP address, the date, times and frequency with which you access the Website and the way you use and interact with its content. </li>
            <li> We will collect your Data automatically via cookies, in line with the cookie settings on your browser. For more information about cookies, and how we use them on the Website, see the section below, headed "Cookies". </li>
            <li> When you open our transactional emails, the read status will automatically be collected and recorded into our server. </li>
          </ol>
          </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Our Use of Data </p>
        <ol>
          <li>
            Any or all of the above Data may be required by us from time to time in order to provide you with the best possible service and experience when using our Website. Specifically, Data may be used by us for the following reasons:
            <ol>
              <li> processing purchases; </li>
              <li> organising our activities; </li>
              <li> internal record keeping; </li>
            </ol>
          </li>
          <li> Distributions, Projects or Groups that you add to the website will be available in the public map on our website; </li>
          <li> The distribution information associated with your CNIC number will be displayed to persons with your CNIC number; </li>
        </ol>
        <p> in each case, in accordance with this privacy policy. </p>
        <br />
        <p className="tcSubHeader"> Who we share Data with </p>
        <ol>
          <li> 
            We may share your Data with the following groups of people for the following reasons:
            <ol>
              <li> our staffs: given public information and your mobile number to process and validate your signups; </li>
              <li>
                third party service providers:
                <ol>
                  <li> for sending transactional emails and receiving email correspondence from you </li>
                  <li> for storing your email correspondence </li>
                  <li> for @ministryofchange.org email correspondence and information on website usage and information provided in the website </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
        <p> in each case, in accordance with this privacy policy. </p>
        <br />
        <p className="tcSubHeader"> Keeping Data secure </p>
        <ol>
          <li>
            We will use technical and organisational measures to safeguard your Data, for example:
            <ol>
              <li> access to your account is controlled by a password and a username that is unique to you. This is password is converted into an unreadable format (hashing) so that your password is never stored as plain text </li>
              <li> we store your Data on secure servers. </li>
            </ol>
          </li>
          <li> Technical and organisational measures include measures to deal with any suspected data breach. If you suspect any misuse or loss or unauthorised access to your Data, please let us know immediately by contacting us via this email address: info@ministryofchange.org. </li>
          <li> If you want detailed information from Get Safe Online on how to protect your information and your computers and devices against fraud, identity theft, viruses and many other online problems, please visit www.getsafeonline.org. Get Safe Online is supported by HM Government and leading businesses. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Data retention </p>
        <ol>
          <li>
            Unless a longer retention period is required or permitted by law, we will only hold your Data on our systems for the period necessary to fulfil the purposes outlined in this privacy policy or until you request that the Data be deleted.
            <ol>
              <li> Ministry of Change’s emailing system’s log clearing: within 30 days after the event </li>
              <li> Copy of outbound transactional email: 5 days </li>
              <li> Anonymised record of outbound transaction email: 30 days </li>
              <li> Record of inbound email correspondence: 3 days, before being forwarded to related Ministry of Change’s email </li>
              <li> Record of inbound email forwarded to related Ministry of Change’s email: 30 days after the related events </li>
              <li> Anonymising purchases information: within 30 days after the event </li>
              <li> Inactive user account clearing: within 180 days </li>
              <li> Record of your inquiry made on the contact form: within 1 year </li>
            </ol>
          </li>
          <li> Even if we delete your Data, it may persist on backup or archival media for legal, tax or regulatory purposes. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Your rights </p>
        <ol>
          <li>
            You have the following rights in relation to your Data:
          <ol>
            <li> <span className="tcTableHead"> Right to access </span> - the right to request (i) copies of the information we hold about you at any time, or (ii) that we modify, update or delete such information. If we provide you with access to the information we hold about you, we will not charge you for this, unless your request is "manifestly unfounded or excessive." Where we are legally permitted to do so, we may refuse your request. If we refuse your request, we will tell you the reasons why. </li>
            <li> <span className="tcTableHead"> Right to correct </span> - the right to have your Data rectified if it is inaccurate or incomplete. </li>
            <li> <span className="tcTableHead"> Right to erase </span> - the right to request that we delete or remove your Data from our systems. </li>
            <li> <span className="tcTableHead"> Right to restrict our use of your Data </span> - the right to "block" us from using your Data or limit the way in which we can use it. </li>
            <li> <span className="tcTableHead"> Right to data portability </span> - the right to request that we move, copy or transfer your Data. </li>
            <li> <span className="tcTableHead"> Right to object </span> - the right to object to our use of your Data including where we use it for our legitimate interests. </li>
          </ol>
          </li>
          <li> To make enquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data (where consent is our legal basis for processing your Data), please contact us via this e-mail address: info@ministryofchange.org. </li>
          <li> If you are not satisfied with the way a complaint you make in relation to your Data is handled by us, you may be able to refer your complaint to the relevant data protection authority. For the UK, this is the Information Commissioner's Office (ICO). The ICO's contact details can be found on their website at https://ico.org.uk/. </li>
          <li> It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes during the period for which we hold it. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Links to other websites </p>
        <ol>
          <li> This Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This privacy policy does not extend to your use of such websites. You are advised to read the privacy policy or statement of other websites prior to using them. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Cookies </p>
        <ol>
          <li> This Website may place and access certain Cookies on your computer. Ministry of Change uses Cookies to improve your experience of using the Website and to improve our range of products and services.   Ministry of Change has carefully chosen these Cookies and has taken steps to ensure that your privacy is protected and respected at all times. </li>
          <li> All Cookies used by this Website are used in accordance with current UK and EU Cookie Law. </li>
          <li> Before the Website places Cookies on your computer, you will be presented with a message bar requesting your consent to set those Cookies. By giving your consent to the placing of Cookies, you are enabling Ministry of Change to provide a better experience and service to you. You may, if you wish, deny consent to the placing of Cookies; however certain features of the Website may not function fully or as intended. </li>
          <li>
            This Website may place the following Cookies:
          <ol>
            <li> to store an authentication token when you sign in. </li>
            <li> to record your Cookies consent </li>
            <li> for the shopping cart functionality </li>
            <li> for identifying the account that your session is logged in, and saving your login information for 2 weeks should you choose ‘remember me’ </li>
            <li> for testing that your browser allow cookies </li>
            <li> 
              Amplitude cookies: (optional) for collecting statistics about how you use this Website
            <ol>
              <li> You can choose to enable or disable Cookies in your internet browser. By default, most internet browsers accept Cookies but this can be changed. For further details, please consult the help menu in your internet browser. </li>
              <li> You can choose to delete Cookies at any time; however you may lose any information that enables you to access the Website more quickly and efficiently including, but not limited to, personalisation settings. </li>
              <li> It is recommended that you ensure that your internet browser is up-to-date and that you consult the help and guidance provided by the developer of your internet browser if you are unsure about adjusting your privacy settings. </li>
              <li> For more information generally on cookies, including how to disable them, please refer to aboutcookies.org. You will also find details on how to delete cookies from your computer. </li>
            </ol>
            </li>
          </ol>
          </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Transfer of Data </p>
        <ol>
          <li> Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of the European Economic Area (‘EEA’). We comply with the Data Protection Act 1998 and the GDPR in respect of any such transfers. If you choose to provide information to us, please note that we transfer the data, including Personal Data, to Pakistan and process it there. <br /> Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Links to Other Sites </p>
        <ol>
          <li> Our Service may contain links to other sites that are not operated by us. If you click a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> General </p>
        <ol>
          <li> You may not transfer any of your rights under this privacy policy to any other person. We may transfer our rights under this privacy policy where we reasonably believe your rights will not be affected. </li>
          <li> If any court or competent authority finds that any provision of this privacy policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this privacy policy will not be affected. </li>
          <li> Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy. </li>
          <li> This Agreement will be governed by and interpreted according to the law of England and Wales. All disputes arising under the Agreement will be subject to the exclusive jurisdiction of the English and Welsh courts. </li>
          <li> Should you wish to report a complaint or if you feel that we have not addressed your concern in a satisfactory manner, you may contact the Information Commissioner’s Office. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Changes to this privacy policy </p>
        <ol>
          <li> Ministry of Change reserves the right to change this privacy policy as we may deem necessary from time to time or as may be required by law. Any changes will be immediately posted on the Website and you are deemed to have accepted the terms of the privacy policy on your first use of the Website following the alterations.  You may contact Ministry of Change by email at info@ministryofchange.org. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> Attribution </p>
        <ol>
          <li> This privacy policy was created using a document from <a target="_blank" rel="noopener noreferrer" href="https://www.rocketlawyer.com/gb/en"> Rocket Lawyer </a>. </li>
        </ol>
        <br />
        <p className="tcSubHeader"> 7 JUNE 2020 </p>
        <br />
      </div>
    </div>
  )
}

export default PrivacyPolicy