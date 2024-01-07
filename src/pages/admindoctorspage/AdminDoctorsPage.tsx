import "./AdminDoctorsPage.scss";
import { Reveal } from "../../components/Reveal";
import "../../components/BackgroundMotion.scss";

import BackgroundMotion from "../../components/BackgroundMotion.tsx";
import Navbar from "../../components/menu/NavbarComponent.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import sortImg from '../../assets/sortImg.png';
import penImg from '../../assets/penImg.png';

interface ListItem {
    doctorTitle: string;
    doctorName: string;
    doctorId: string;
    doctorDepartment: string;
    doctorHospital: string;
    doctorUserId: string;
}

interface AdminDoctorsPageProps {

}

const AdminDoctorsPage: React.FC<AdminDoctorsPageProps> = () => {
    const [eMailInput, seteMailInput] = useState<string>('');
    const [phoneNumInput, setPhoneNumInput] = useState<string>('');
    const [passWordInputOld, setPassWordInputOld] = useState<string>('');
    const [passWordInputNewFirst, setPassWordInputNewFirst] = useState<string>('');
    const [passWordInputNewSecond, setPassWordInputNewSecond] = useState<string>('');
    const [warningPhone, setWarningPhone] = useState(false);
    const [warningeMail, setWarningeMail] = useState(false);
    const [warningOldPassWord, setWarningOldPassWord] = useState(false);
    const [warningNewPassWordFirst, setWarningNewPassWordFirst] = useState(false);
    const [warningNewPassWordSecond, setWarningNewPassWordSecond] = useState(false);
    const [disabledPhoneInput, setDisabledPhoneInput] = useState(true);
    const [disabledeMailInput, setDisabledeMailInput] = useState(true);
    const [disabledPassWordInput, setDisabledPassWordInput] = useState(true);
  
  
    const profileName = "Buğra Burak Başer";
    const profileSNum = "28*******85";
    const profileDateOfBirth = "29/12/2000";
    const [profileEMail, setProfileEMail] = useState<string>("bugraburakbaser@gmail.com");
    const [profilePhoneNum, setProfilePhoneNum] = useState<string>("+90 537 271 35 91");
    const [profilePassWord, setProfilePassWord] = useState<string>("1234");
  
    const updateeMail = () => {
      setDisabledeMailInput(!disabledeMailInput);
      setWarningeMail(false);
      seteMailInput('');
    };
  
    const pusheMail = () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (eMailInput != '' && emailRegex.test(eMailInput)) {
        setProfileEMail(eMailInput);
        setWarningeMail(false);
        setDisabledPhoneInput(true);
        seteMailInput('');
      } else if (eMailInput != '' && !emailRegex.test(phoneNumInput)) {
        setWarningeMail(true);
      } else if (eMailInput == '') {
        setWarningeMail(false);
        setDisabledeMailInput(true);
      }
    };
  
    const updatePhoneNum = () => {
      setDisabledPhoneInput(!disabledPhoneInput);
      setWarningPhone(false);
      setPhoneNumInput('');
    };
  
    const pushPhoneNum = () => {
      const phoneNumRegex = /^\+\d{2}\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  
      if (phoneNumInput != '' && phoneNumRegex.test(phoneNumInput)) {
        setProfilePhoneNum(phoneNumInput);
        setWarningPhone(false);
        setDisabledPhoneInput(true);
        setPhoneNumInput('');
      } else if (phoneNumInput != '' && !phoneNumRegex.test(phoneNumInput)) {
        setWarningPhone(true);
      } else if (phoneNumInput == '') {
        setWarningPhone(false);
        setDisabledPhoneInput(true);
      }
  
  
    };
  
    const updatePassWord = () => {
      setDisabledPassWordInput(!disabledPassWordInput);
      setWarningOldPassWord(false);
      setWarningNewPassWordFirst(false);
      setWarningNewPassWordSecond(false);
  
      setPassWordInputOld('');
      setPassWordInputNewFirst('');
      setPassWordInputNewSecond('');
    };
  
    const pushPassWord = () => {
      const PassWordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
  
      setWarningOldPassWord(false);
      setWarningNewPassWordFirst(false);
      setWarningNewPassWordSecond(false);
  
      if (passWordInputOld == profilePassWord) {
        if (PassWordRegex.test(passWordInputNewFirst)) {
          if (PassWordRegex.test(passWordInputNewSecond) && passWordInputNewFirst == passWordInputNewSecond) {
            setProfilePassWord(passWordInputNewSecond);
  
            setWarningNewPassWordFirst(false);
            setDisabledPassWordInput(true);
            setWarningOldPassWord(false);
            setDisabledPassWordInput(true);
  
            setPassWordInputOld('');
            setPassWordInputNewFirst('');
            setPassWordInputNewSecond('');
          } else if (!PassWordRegex.test(passWordInputNewSecond)) {
            if (PassWordRegex.test(passWordInputNewFirst)) {
              setWarningNewPassWordFirst(false);
            }
            setWarningNewPassWordSecond(true);
  
          }
        } else {
          setWarningNewPassWordFirst(true);
          if (!(passWordInputNewFirst == passWordInputNewSecond)) {
            setWarningNewPassWordSecond(true);
          }
  
        }
      } else {
        setWarningOldPassWord(true);
      }
    };


    return (
        <div className="admin-page-main-container">
            <BackgroundMotion />
            <Navbar isDoctor={false} isPatient={false} isAdmin={true}></Navbar>
            <div className="content-panel">
                <Reveal>
                    <div className="upper" >
                        <div className='informations-header'>Genel Bilgiler</div>
                        <div>
                            <div className='information-type'>İsim Soyisim</div>
                            <input type="text" className="information-input" id='disabled' placeholder={profileName} disabled={true} />
                            <hr />
                        </div>
                        <div>
                            <div className='information-type'>TC Kimlik No</div>
                            <input type="text" className="information-input" id='disabled' placeholder={profileSNum} disabled={true} />
                            <hr />
                        </div>
                        <div>
                            <div className='information-type'>Doğum Tarihi</div>
                            <input type="text" className="information-input" id='disabled' placeholder={profileDateOfBirth} disabled={true} />
                            <hr />
                        </div>
                        <div>
                            <img src={penImg} className="pen-icon" onClick={updatePhoneNum} style={{ marginLeft: '160px' }} />
                            {!disabledPhoneInput && <div className='information-update-button' style={{ marginLeft: '190px' }} onClick={pushPhoneNum}>Düzenle</div>}
                            <div className='information-type'>Telefon Numarası</div>
                            <input type="text" className="information-input" id={`${disabledPhoneInput ? 'disabled' : ''}`} placeholder={profilePhoneNum} value={phoneNumInput} onChange={(e) => setPhoneNumInput(e.target.value)} disabled={disabledPhoneInput} />
                            {!warningPhone && <hr />}
                            {warningPhone && <hr style={{ border: '1px solid #DC5353', boxShadow: '0px 3px 6px #DC5353' }} />}
                        </div>
                        <div>
                            <img src={penImg} className="pen-icon" onClick={updateeMail} style={{ marginLeft: '135px' }} />
                            {!disabledeMailInput && <div className='information-update-button' style={{ marginLeft: '165px' }} onClick={pusheMail} >Düzenle</div>}
                            <div className='information-type'>E-posta Adresi</div>
                            <input type="email" className="information-input" id={`${disabledeMailInput ? 'disabled' : ''}`} placeholder={profileEMail} value={eMailInput} onChange={(e) => seteMailInput(e.target.value)} disabled={disabledeMailInput} />
                            {!warningeMail && <hr />}
                            {warningeMail && <hr style={{ border: '1px solid #DC5353', boxShadow: '0px 3px 6px #DC5353' }} />}
                        </div>
                        <div>
                            <img src={penImg} className="pen-icon" onClick={updatePassWord} style={{ marginLeft: '67px' }} />
                            {!disabledPassWordInput && <div className='information-update-button' style={{ marginLeft: '98px' }} onClick={pushPassWord} >Düzenle</div>}
                            <div className='information-type' >Parola</div>
                            {disabledPassWordInput && <>
                                <input type="text" className="information-input" id='disabled' placeholder="••••••••••••" disabled={true} />
                                <hr />
                            </>
                            }

                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default AdminDoctorsPage;
