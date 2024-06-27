import React, { useState } from 'react';
import './style.css';
import { useLoading } from '../../Components/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import axios from 'axios';
const AgentRegistration = () => {
    let token = window.localStorage.getItem('accessToken')
    let navigate = useNavigate()
    let [showModal,setShowModal] = useState(false)
    let [modalTitle,setModalTitle] = useState('')
    let [modalBody,setModalBody] = useState('')
    let { setLoading, setLoadingText } = useLoading()
    const [dob, setDob] = useState('');
    const [nin, setNin] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [ninPicturePreview, setNinPicturePreview] = useState(null);
    const [passportPhotoPreview, setPassportPhotoPreview] = useState(null);
    const handleOk = () => {
        setShowModal(false);
        navigate('/')
      };
      const handleCancel = () => {
        setShowModal(false);
      };
    const handleNinPictureChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setNinPicturePreview(URL.createObjectURL(file));
    };
  
    const handlePassportPhotoChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setPassportPhoto(file);
      setPassportPhotoPreview(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setLoadingText('Sending Request... Please Wait')
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', passportPhoto);
        formData.append('officeAddress', officeAddress);
        formData.append('nin', nin);
    
        try {
          const response = await axios.post('https://aftib-6o3h.onrender.com/agentStatusRequest', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
          });
            setLoading(false)
            setShowModal(true)
            setLoadingText('')
            setModalTitle('Successfully submitted Request to become an agent at Aftib. Our Admin would reveiw your details')
            setModalBody('An email would be sent to you to notify you if it has been approved or requires modification.')
          console.log('Form Data:', response.data);
          // Handle success response
        } catch (error) {
            setLoading(false)
            setLoadingText('')
            setModalTitle('Unable to send request')
            setModalBody('Reason' + error.message)
          console.error('Error submitting form:', error);
          // Handle error response
        }
      };
  return (
    <div className="agent-registration-container">
        <Modal title={modalTitle} open={showModal} onOk={handleOk} onCancel={handleCancel} cancelText={'Try Again'}>
        <p>{modalBody}</p>
      </Modal>
      <h1 className='text-center'>Agent Registrations Form.</h1>
      <p className='text-center'>Kindly fill the form below and submit. Upon approval, you would be able to sell properties to our clients. Your request to be an Aftib Real Estate would be reviewed by the admins and</p>
        <p className='text-center'>
        Information to collect from the agent includes DOB, NIN number, NIN picture, Office Address, passport photograph
        </p>
        <div>
        <form className="agent-form" onSubmit={handleSubmit}>
     


      <div className="row">
      <h3 className='text-center mb-4'>Profile</h3>
<div className="col-md-6">
<div className="mb-3 ">
<label for="" className="form-label">Contact Name *</label>
<input className="form-control" name="name"  placeholder="e.g Musa Adamu (Name and Surname)" type="text" required="required"/>
</div>
</div>

<div className="col-md-6">
<div className="mb-3 ">
<label for="" className="form-label">Business Name</label>
<input className="form-control" name="businessName" value="" placeholder="e.g Properties Limited" type="text" required="required"/>
</div>
</div>

</div>
<hr className="my-4"/>

<div className="personal-detail mt-4">
<h3 classNameName='text-start mb-3'>Contact Info</h3>
<div className="row">
<div className="col-md-4">
<div className="mb-3 ">
<label for="dial ">Country Code</label>
<select name="dial" required="required" className="form-select" aria-label="Default select example" id="dial">
<option value="">Country Code</option>
<option value="93">Afghanistan(93)</option>
<option value="355">Albania(355)</option>
<option value="213">Algeria(213)</option>
<option value="1-684">American Samoa(1-684)</option>
<option value="376">Andorra(376)</option>
<option value="244">Angola(244)</option>
<option value="1-264">Anguilla(1-264)</option>
<option value="672">Norfolk Island(672)</option>
<option value="1-268">Antigua and Barbuda(1-268)</option>
<option value="54">Argentina(54)</option>
<option value="374">Armenia(374)</option>
<option value="297">Aruba(297)</option>
<option value="61">Cocos (Keeling) Islands(61)</option>
<option value="43">Austria(43)</option>
<option value="994">Azerbaijan(994)</option>
<option value="1-242">Bahamas(1-242)</option>
<option value="973">Bahrain(973)</option>
<option value="880">Bangladesh(880)</option>
<option value="1-246">Barbados(1-246)</option>
<option value="375">Belarus(375)</option>
<option value="32">Belgium(32)</option>
<option value="501">Belize(501)</option>
<option value="229">Benin(229)</option>
<option value="1-441">Bermuda(1-441)</option>
<option value="975">Bhutan(975)</option>
<option value="591">Bolivia, Plurinational State of(591)</option>
<option value="599">Curaçao(599)</option>
<option value="387">Bosnia and Herzegovina(387)</option>
<option value="267">Botswana(267)</option>
<option value="47">Svalbard and Jan Mayen(47)</option>
<option value="55">Brazil(55)</option>
<option value="246">British Indian Ocean Territory(246)</option>
<option value="673">Brunei Darussalam(673)</option>
<option value="359">Bulgaria(359)</option>
<option value="226">Burkina Faso(226)</option>
<option value="257">Burundi(257)</option>
<option value="855">Cambodia(855)</option>
<option value="237">Cameroon(237)</option>
<option value="1">United States(1)</option>
<option value="238">Cape Verde(238)</option>
<option value="1-345">Cayman Islands(1-345)</option>
<option value="236">Central African Republic(236)</option>
<option value="235">Chad(235)</option>
<option value="56">Chile(56)</option>
<option value="86">China(86)</option>
<option value="57">Colombia(57)</option>
<option value="269">Comoros(269)</option>
<option value="242">Congo(242)</option>
<option value="243">Congo, the Democratic Republic of the(243)</option>
<option value="682">Cook Islands(682)</option>
<option value="506">Costa Rica(506)</option>
<option value="385">Croatia(385)</option>
<option value="53">Cuba(53)</option>
<option value="357">Cyprus(357)</option>
<option value="420">Czech Republic(420)</option>
<option value="225">Côte d'Ivoire(225)</option>
<option value="45">Denmark(45)</option>
<option value="253">Djibouti(253)</option>
<option value="1-767">Dominica(1-767)</option>
<option value="1-809,1-829,1-849">Dominican Republic(1-809,1-829,1-849)</option>
<option value="593">Ecuador(593)</option>
<option value="20">Egypt(20)</option>
<option value="503">El Salvador(503)</option>
<option value="240">Equatorial Guinea(240)</option>
<option value="291">Eritrea(291)</option>
<option value="372">Estonia(372)</option>
<option value="251">Ethiopia(251)</option>
<option value="500">South Georgia and the South Sandwich Islands(500)</option>
<option value="298">Faroe Islands(298)</option>
<option value="679">Fiji(679)</option>
<option value="358">Åland Islands(358)</option>
<option value="33">France(33)</option>
<option value="594">French Guiana(594)</option>
<option value="689">French Polynesia(689)</option>
<option value="262">Réunion(262)</option>
<option value="241">Gabon(241)</option>
<option value="220">Gambia(220)</option>
<option value="995">Georgia(995)</option>
<option value="49">Germany(49)</option>
<option value="233">Ghana(233)</option>
<option value="350">Gibraltar(350)</option>
<option value="30">Greece(30)</option>
<option value="299">Greenland(299)</option>
<option value="1-473">Grenada(1-473)</option>
<option value="590">Saint Martin (French part)(590)</option>
<option value="1-671">Guam(1-671)</option>
<option value="502">Guatemala(502)</option>
<option value="44">United Kingdom(44)</option>
<option value="224">Guinea(224)</option>
<option value="245">Guinea-Bissau(245)</option>
<option value="592">Guyana(592)</option>
<option value="509">Haiti(509)</option>
<option value="39-06">Holy See (Vatican City State)(39-06)</option>
<option value="504">Honduras(504)</option>
<option value="852">Hong Kong(852)</option>
<option value="36">Hungary(36)</option>
<option value="354">Iceland(354)</option>
<option value="91">India(91)</option>
<option value="62">Indonesia(62)</option>
<option value="98">Iran, Islamic Republic of(98)</option>
<option value="964">Iraq(964)</option>
<option value="353">Ireland(353)</option>
<option value="972">Israel(972)</option>
<option value="39">Italy(39)</option>
<option value="1-876">Jamaica(1-876)</option>
<option value="81">Japan(81)</option>
<option value="962">Jordan(962)</option>
<option value="7">Russian Federation(7)</option>
<option value="254">Kenya(254)</option>
<option value="686">Kiribati(686)</option>
<option value="850">Korea, Democratic People's Republic of(850)</option>
<option value="82">Korea, Republic of(82)</option>
<option value="965">Kuwait(965)</option>
<option value="996">Kyrgyzstan(996)</option>
<option value="856">Lao People's Democratic Republic(856)</option>
<option value="371">Latvia(371)</option>
<option value="961">Lebanon(961)</option>
<option value="266">Lesotho(266)</option>
<option value="231">Liberia(231)</option>
<option value="218">Libya(218)</option>
<option value="423">Liechtenstein(423)</option>
<option value="370">Lithuania(370)</option>
<option value="352">Luxembourg(352)</option>
<option value="853">Macao(853)</option>
<option value="389">Macedonia, the Former Yugoslav Republic of(389)</option>
<option value="261">Madagascar(261)</option>
<option value="265">Malawi(265)</option>
<option value="60">Malaysia(60)</option>
<option value="960">Maldives(960)</option>
<option value="223">Mali(223)</option>
<option value="356">Malta(356)</option>
<option value="692">Marshall Islands(692)</option>
<option value="596">Martinique(596)</option>
<option value="222">Mauritania(222)</option>
<option value="230">Mauritius(230)</option>
<option value="52">Mexico(52)</option>
<option value="691">Micronesia, Federated States of(691)</option>
<option value="373">Moldova, Republic of(373)</option>
<option value="377">Monaco(377)</option>
<option value="976">Mongolia(976)</option>
<option value="382">Montenegro(382)</option>
<option value="1-664">Montserrat(1-664)</option>
<option value="212">Western Sahara(212)</option>
<option value="258">Mozambique(258)</option>
<option value="95">Myanmar(95)</option>
<option value="264">Namibia(264)</option>
<option value="674">Nauru(674)</option>
<option value="977">Nepal(977)</option>
<option value="31">Netherlands(31)</option>
<option value="687">New Caledonia(687)</option>
<option value="64">New Zealand(64)</option>
<option value="505">Nicaragua(505)</option>
<option value="227">Niger(227)</option>
<option value="234" selected="selected">Nigeria(234)</option>
<option value="683">Niue(683)</option>
<option value="1-670">Northern Mariana Islands(1-670)</option>
<option value="968">Oman(968)</option>
<option value="92">Pakistan(92)</option>
<option value="680">Palau(680)</option>
<option value="970">Palestine, State of(970)</option>
<option value="507">Panama(507)</option>
<option value="675">Papua New Guinea(675)</option>
<option value="595">Paraguay(595)</option>
<option value="51">Peru(51)</option>
<option value="63">Philippines(63)</option>
<option value="870">Pitcairn(870)</option>
<option value="48">Poland(48)</option>
<option value="351">Portugal(351)</option>
<option value="974">Qatar(974)</option>
<option value="40">Romania(40)</option>
<option value="250">Rwanda(250)</option>
<option value="290 n">Saint Helena, Ascension and Tristan da Cunha(290 n)</option>
<option value="1-869">Saint Kitts and Nevis(1-869)</option>
<option value="1-758">Saint Lucia(1-758)</option>
<option value="508">Saint Pierre and Miquelon(508)</option>
<option value="1-784">Saint Vincent and the Grenadines(1-784)</option>
<option value="685">Samoa(685)</option>
<option value="378">San Marino(378)</option>
<option value="239">Sao Tome and Principe(239)</option>
<option value="966">Saudi Arabia(966)</option>
<option value="221">Senegal(221)</option>
<option value="381 p">Serbia(381 p)</option>
<option value="248">Seychelles(248)</option>
<option value="232">Sierra Leone(232)</option>
<option value="65">Singapore(65)</option>
<option value="1-721">Sint Maarten (Dutch part)(1-721)</option>
<option value="421">Slovakia(421)</option>
<option value="386">Slovenia(386)</option>
<option value="677">Solomon Islands(677)</option>
<option value="252">Somalia(252)</option>
<option value="27">South Africa(27)</option>
<option value="211">South Sudan(211)</option>
<option value="34">Spain(34)</option>
<option value="94">Sri Lanka(94)</option>
<option value="249">Sudan(249)</option>
<option value="597">Suriname(597)</option>
<option value="268">Swaziland(268)</option>
<option value="46">Sweden(46)</option>
<option value="41">Switzerland(41)</option>
<option value="963">Syrian Arab Republic(963)</option>
<option value="886">Taiwan, Province of China(886)</option>
<option value="992">Tajikistan(992)</option>
<option value="255">Tanzania, United Republic of(255)</option>
<option value="66">Thailand(66)</option>
<option value="670">Timor-Leste(670)</option>
<option value="228">Togo(228)</option>
<option value="690">Tokelau(690)</option>
<option value="676">Tonga(676)</option>
<option value="1-868">Trinidad and Tobago(1-868)</option>
<option value="216">Tunisia(216)</option>
<option value="90">Turkey(90)</option>
<option value="993">Turkmenistan(993)</option>
<option value="1-649">Turks and Caicos Islands(1-649)</option>
<option value="688">Tuvalu(688)</option>
<option value="256">Uganda(256)</option>
<option value="380">Ukraine(380)</option>
<option value="971">United Arab Emirates(971)</option>
<option value=" ">United States Minor Outlying Islands( )</option>
<option value="598">Uruguay(598)</option>
<option value="998">Uzbekistan(998)</option>
<option value="678">Vanuatu(678)</option>
<option value="58">Venezuela, Bolivarian Republic of(58)</option>
<option value="84">Viet Nam(84)</option>
<option value="1-284">Virgin Islands, British(1-284)</option>
<option value="1-340">Virgin Islands, U.S.(1-340)</option>
<option value="681">Wallis and Futuna(681)</option>
<option value="967">Yemen(967)</option>
<option value="260">Zambia(260)</option>
<option value="263">Zimbabwe(263)</option>
</select>
</div>
</div>
<div className="col-md-4">
<div className="mb-3 ">
<label for="" className="form-label">Phone Number (Digits only)</label>
<input className="form-control" name="phone"  placeholder="" type="tel" pattern="[0-9+]+" required="required"  />
</div>
</div>
<div className="col-md-4">
<div className="mb-3 ">
<label for="" className="form-label">Whatsapp Number (Digits only)</label>
<input className="form-control" name="whatsapp" value="" placeholder="" type="tel" pattern="[0-9+]+" required="required" />
</div>
</div>
<div className="col-md-4">
<div className="mb-3 ">
<label for="" className="form-label">Email Address *</label>
<input className="form-control" name="email"  placeholder="e.g musa@gmail.com" type="text" required="required" />
</div>
</div>

</div>
</div>

<hr className="my-4"/>

<div className="personal-detail">
<h3>Address</h3>
<div className="row" id="officeDiv">
<div className="col-md-6">
<div className="mb-3 ">
<label for="" className="form-label">Office State</label>
<select name="primaryState" id="primaryState_select" className="form-select" aria-label="Default select example">
<option value="">- select -</option>

</select>
<span className="help-block"></span>
</div>
</div>
<div className="col-md-6">
<div className="mb-3 ">
<label for="" className="form-label">Office LGA</label>
<select name="primaryAxis" id="primaryAxis_select" className="form-select" aria-label="Default select example">
<option value="">- select -</option>
</select>

<span className="help-block"></span>
</div></div>

<div className="col-md-12">
<div className="mb-3 ">
<label for="" className="form-label">Your office address</label>
<input className="form-control" name="addressStreet" value="" placeholder="e.g No 28 Toyin Street, Ikeja" type="text"/>
</div>
</div>

</div>
</div>

<hr className="my-4"/>

<div className="personal-detail">
<h3>About your organization</h3>
<div className="row">
<div className="col-md-12">
<div className="mb-3 ">
<textarea name="about" id="profile-text-area" className="form-control height-100" rows="3" placeholder="Describe your organization"></textarea>
<span className="help-block"></span>
</div>
</div>

</div>
</div>

<hr classNameName='my-4'/>
<div className="personal-detail">
<h3>Services your organization provides</h3>
<div className="row">
<div className="col-md-12">
<div className="mb-3 ">
<textarea name="services" id="profile-service" className="form-control height-100" rows="3" placeholder="e.g. facility management,…"></textarea>
<span className="help-block"></span>
</div>
</div>

</div>
</div>

<hr classNameName='my-4'/>
<div className="personal-detail">
<h3>Address</h3>
<div className="row">
<div className="col-md-4">
<div className="mb-3 ">
<label for="" className="form-label">Business State</label>
<select name="businessState" id="businessState_select" className="form-select" aria-label="Default select example">
<option value="">- select -</option>

</select>
<span className="help-block"></span>
</div>
</div>
<div className="col-md-4">
<div className="mb-3 ">
<label for="" className="form-label">Business Axis</label>
<select name="businessAxis" id="businessAxis_select" className="form-select" aria-label="Default select example">
<option value="">- select -</option>
</select>

<span className="help-block"></span>
</div></div>

<div className="col-md-4">
<div className="mb-3">
<label for="" className="form-label">Business Category</label>
<select className="form-select" aria-label="Default select example" name="businessCategory" required="">
<option value="">- select -</option>

</select>
<span className="help-block"></span>
</div>
</div>

</div>
</div>

<hr classNameName='my-4'/>
<div className="personal-detail">
<h3>Upload Files</h3>
<div className="row">
<div className="col-md-12">
<div className="mb-3">
<div className="file-upload-single file-profile">
<div className="file-link">
<i className="loader fa fa-circle-o-notch fa-spin" ></i>Govt. Issued ID:
<span>
</span>
</div>
<input id="file_personal_id" type="file" placeholder="Add Govt. Issued ID" data-aid="117062" data-kind="personal_id" className="docUpload form-control height-auto"/>
<label for="file_personal_id">
Click to Upload
</label>
</div>
</div>
<div className="mb-3">
<div className="file-upload-single file-profile">
<div className="file-link">
<i className="loader fa fa-circle-o-notch fa-spin" ></i>Selfie Photo:
<span>
</span>
</div>
<input id="file_selfie" type="file" placeholder="Add Selfie Photo" data-aid="117062" data-kind="selfie" className="docUpload form-control height-auto"/>
<label for="file_selfie">
Click to Upload
</label>
</div>
</div>
<div className="mb-3">
<div className="file-upload-single file-profile">
<div className="file-link">
<i className="loader fa fa-circle-o-notch fa-spin" ></i>Business CAC Document:
<span>
</span>
</div>
<input id="file_business_id" type="file" placeholder="Add Business CAC Document" data-aid="117062" data-kind="business_id" className="docUpload form-control height-auto"/>
<label for="file_business_id">
Click to Upload
</label>
</div>
</div>
</div>

</div>
</div>

<div className="row">
    
<div className="col-md-12">
<div className="mb-3 ">
<label for="" className="form-label">NIN Number</label>
<input className="form-control" name="name"  placeholder="01234567891" type="text" required="required"/>
</div>
</div>



</div>

      <hr classNameName='my-4'/>
      <div className="personal-detail">
<h3>Social media</h3>
<div className="row">
<div className="col-md-3">
<div className="mb-3 ">
<label for="" className="form-label">Facebook</label>
<input className="form-control" name="facebook" value="" placeholder="facebook.com/johndoe" type="text"/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3 ">
<label for="" className="form-label">Twitter</label>
<input className="form-control" name="twitter" value="" placeholder="twitter.com/johndoe" type="text"/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3 ">
<label for="" className="form-label">LinkedIn</label>
<input className="form-control" name="linkedin" value="" placeholder="linkedin.com/johndoe" type="text"/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3 ">
<label for="" className="form-label">Instagram</label>
<input className="form-control" name="instagram" value="" placeholder="instagram.com/johndoe" type="text"/>
</div>
</div>

</div>
</div>

      <button type="submit">Register</button>
    </form>
        </div>
    </div>
  );
};

export default AgentRegistration;
