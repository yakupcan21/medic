import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from "framer-motion";

import peopleFill from '../assets/peopleFill.png';
import questionImg from '../assets/questionImg.png';
import informationImg from '../assets/informationImg.png';

import './menu/NavbarComponent.scss';
import './ProfileComponent.scss';

import { PopUp } from './PopUp';


interface NavbarComponentProps {
    isDoctor: boolean;
    isPatient: boolean;
}

const Profile: React.FC<NavbarComponentProps> = (props) => {
    const { isDoctor, isPatient } = props;
    const [bmiOpen, setBmiOpen] = useState(false);
    const [cardioOpen, setCardioOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [heightInput, setHeightInput] = useState<string>('');
    const [weightInput, setWeightInput] = useState<string>('');

    const profileName = "Buğra Burak Başer";
    const profileAge = "22";
    const profileTitle = "Prof. Dr.";
    const profileDepartment = "Göğüs Hastalıkları Anabilim Dalı";
    const profileHospital = "Ankara Gazi Üniversitesi Tıp Fakültesi Hastanesi";
    const [profileWeight, setProfileWeight] = useState<string>("92");
    const [profileHeight, setProfileHeight] = useState<string>("183");
    const [profileBodyMassIndex, setProfileBodyMassIndex] = useState<string>("27.47");

    const bmiPopUpToggle = () => {
        setBmiOpen(!bmiOpen);
        if (cardioOpen) {
            setCardioOpen(!cardioOpen);
        }
        if (updateOpen) {
            setUpdateOpen(!updateOpen);
        }
    };

    const cardioPopUpToggle = () => {
        setCardioOpen(!cardioOpen);
        if (bmiOpen) {
            setBmiOpen(!bmiOpen)
        }
        if (updateOpen) {
            setUpdateOpen(!updateOpen);
        }
    };

    const updatePopUpToggle = () => {
        setUpdateOpen(!updateOpen);
        if (bmiOpen) {
            setBmiOpen(!bmiOpen)
        }
        if (cardioOpen) {
            setCardioOpen(!cardioOpen);
        }
    };

    const updateBodyMassConsts = () => {
        if(heightInput != '' && weightInput != ''){
            setProfileHeight(heightInput);
            setProfileWeight(weightInput);
            BodyMassCalculate(weightInput, heightInput);
        }
        setHeightInput('');
        setWeightInput('');

    };

    const BodyMassCalculate = (weightInput: string, heightInput: string) => {
        const weight = parseFloat(weightInput);
        const height = parseFloat(heightInput) / 100;

        if (!isNaN(weight) && !isNaN(height) && height !== 0) {
            const bmi = (weight / (height * height)).toFixed(2);
            setProfileBodyMassIndex(bmi);
        } else {
            setProfileBodyMassIndex("00.00");
        }
    };

    return (
        <>
            {isDoctor && (
                <div>
                    <div id='profile-component'>
                        <img src={peopleFill} className="navbar-avatar-icon" id="navbar-big-avatar" alt="Big Avatar" />
                        <div className='header'>{profileTitle} {profileName}</div>
                        <div className='soft' id='department'>{profileDepartment}</div>
                        <div className='soft' id='hospital'>{profileHospital}</div>
                        <tr>
                            <td>
                                <div className='bold'>{profileAge}</div>
                                <div className='soft'>Yaş</div>
                            </td>
                        </tr>
                        <tr>
                            <td id='rows'>
                                <div className='bold'>{profileWeight} kg</div>
                                <div className='soft'>Kilo</div>
                            </td>
                            <td id='rows'>
                                <div className='bold'>{profileHeight} cm</div>
                                <div className='soft'>Boy</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='update' onClick={updatePopUpToggle}>Güncelle</div>
                                <PopUp isOpen={updateOpen}>
                                    <div className='profile'>
                                        <div className='pop-up' id='update'>
                                            <h1 className='bold'>Güncel Boy ve Kilonuzu Giriniz</h1>
                                            <input type="text" placeholder="Boyunuz:" value={heightInput} onChange={(e) => {if (!isNaN(parseFloat(e.target.value))) {setHeightInput(e.target.value);}}}/>
                                            <div className='soft' id='kg' style={{ position: 'absolute', marginLeft: '250px', marginTop: '126px'}}>kg</div>
                                            <input type="text" placeholder="Kilonuz:" value={weightInput} onChange={(e) => {if (!isNaN(parseFloat(e.target.value))) {setWeightInput(e.target.value);}}}/>
                                            <div className='soft' id='cm' style={{ position: 'absolute', marginLeft: '250px', marginTop: '71px'}}>cm</div>
                                            <div id="multiple-buttons">
                                            <div className='navbar-button' id='pop-up-return' onClick={updatePopUpToggle}>Geri Dön</div>
                                            <div className='navbar-button' id='pop-up-save' onClick={updateBodyMassConsts}>Kaydet</div>
                                            </div>
                                        </div>
                                    </div>
                                </PopUp>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className='bold'>{profileBodyMassIndex}</div>
                                    <img src={informationImg} alt="Question Icon" className="information-icon" onClick={bmiPopUpToggle} />
                                    <PopUp isOpen={bmiOpen}>
                                        <div className='profile'>
                                            <div className='pop-up' id='about'>
                                                <h1 className='bold'>Vücut Kütle İndeksi Nedir?</h1>
                                                <p className='soft'> Kilonun boy ile oranını ölçen bir endekstir.
                                                    18.5-24.9 arası normal, 25-29.9 arası hafiften ağır obez,
                                                    30 ve üzeri ise obez olarak sınıflandırılır.</p>
                                                <div className='navbar-button' id='pop-up-return' onClick={bmiPopUpToggle}>Geri Dön</div>
                                            </div>
                                        </div>
                                    </PopUp>
                                </div>
                                <div className='soft'>Vücut Kitle İndeksi</div>
                            </td>
                        </tr>
                    </div>
                </div>
            )}
            {isPatient && (
                <div>
                    <div id='profile-component'>
                        <img src={peopleFill} className="navbar-avatar-icon" id="navbar-big-avatar" alt="Big Avatar" />
                        <div className='header'>{profileName}</div>
                        <tr>
                            <td>
                                <div className='bold'>{profileAge}</div>
                                <div className='soft'>Yaş</div>
                            </td>
                        </tr>
                        <tr>
                            <td id='rows'>
                                <div className='bold'>{profileWeight} kg</div>
                                <div className='soft'>Kilo</div>
                            </td>
                            <td id='rows'>
                                <div className='bold'>{profileHeight} cm</div>
                                <div className='soft'>Boy</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='update' onClick={updatePopUpToggle}>Güncelle</div>
                                <PopUp isOpen={updateOpen}>
                                    <div className='profile'>
                                        <div className='pop-up' id='update'>
                                            <h1 className='bold'>Güncel Boy ve Kilonuzu Giriniz</h1>
                                            <input type="text" placeholder="Boyunuz:" value={heightInput} onChange={(e) => {if (!isNaN(parseFloat(e.target.value))) {setHeightInput(e.target.value);}}}/>
                                            <div className='soft' id='kg' style={{ position: 'absolute', marginLeft: '250px', marginTop: '126px'}}>kg</div>
                                            <input type="text" placeholder="Kilonuz:" value={weightInput} onChange={(e) => {if (!isNaN(parseFloat(e.target.value))) {setWeightInput(e.target.value);}}}/>
                                            <div className='soft' id='cm' style={{ position: 'absolute', marginLeft: '250px', marginTop: '71px'}}>cm</div>
                                            <div id="multiple-buttons">
                                            <div className='navbar-button' id='pop-up-return' onClick={updatePopUpToggle}>Geri Dön</div>
                                            <div className='navbar-button' id='pop-up-save' onClick={updateBodyMassConsts}>Kaydet</div>
                                            </div>
                                        </div>
                                    </div>
                                </PopUp>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                                    <div className='bold'>{profileBodyMassIndex}</div>
                                    <img style={{ marginRight: '0px' }} src={informationImg} alt="Question Icon" className="information-icon" onClick={bmiPopUpToggle} />
                                    <PopUp isOpen={bmiOpen}>
                                        <div className='profile'>
                                            <div className='pop-up' id='about'>
                                                <h1 className='bold'>Vücut Kütle İndeksi Nedir?</h1>
                                                <p className='soft'> Kilonun boy ile oranını ölçen bir endekstir.
                                                    18.5-24.9 arası normal, 25-29.9 arası hafiften ağır obez,
                                                    30 ve üzeri ise obez olarak sınıflandırılır.</p>
                                                <div className='navbar-button' id='pop-up-return' onClick={bmiPopUpToggle} >Geri Dön</div>
                                            </div>
                                        </div>
                                    </PopUp>
                                </div>
                                <div className='soft'>Vücut Kitle İndeksi</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='soft' id='cardio'>Kardiyovasküler Hastalık Riski</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className='bold'>?</div>
                                    <img style={{ marginRight: '0px' }} src={informationImg} alt="Question Icon" className="information-icon" onClick={cardioPopUpToggle} />
                                    <PopUp isOpen={cardioOpen}>
                                        <div className='profile'>
                                            <div className='pop-up' id='about'>
                                                <h1 className='bold'>Kardiyovasküler Hastalık Riski</h1>
                                                <p className='soft'> Ailenizde veya yakın akrabalarınızda kalp rahatsızlıkları varsa,
                                                    uzman bir doktora başvurmanız önemlidir.
                                                    Erken tanı ile sağlıklı bir yaşam için adım atabilirsiniz.</p>
                                                <div className='navbar-button' id='pop-up-return' onClick={cardioPopUpToggle}>Geri Dön</div>
                                            </div>
                                        </div>
                                    </PopUp>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='update' onClick={cardioPopUpToggle}>Hesapla</div>
                            </td>
                        </tr>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
