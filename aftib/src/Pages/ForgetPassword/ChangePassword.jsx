import React, {useState} from 'react' 
import { useLoading } from '../../Components/LoadingContext'
import { changePassword } from '../../utils/forgotPasswordRequest'
import { useLocation, useNavigate } from 'react-router-dom'

import { Modal } from 'antd';
export function ChangePassword () {
    let [newPassword,setNewPassword] = useState('')
    let [showModal,setShowModal] = useState(false)
    let [modalTitle,setModalTitle] = useState('')
    let {setLoading} = useLoading()
    let location = useLocation()
    let navigate = useNavigate()
    const urlParams = new URLSearchParams(location.search.split('?')[1]);

    const submit = async () =>{
        try {
            setLoading(true)
            let response = await changePassword(urlParams.get('email'),newPassword)
            console.log(response.data)
            navigate('/login')
            setLoading(false)
        }   
        catch(err){
            console.error(err.message)
            setLoading(false)
            setModalTitle(err.message)
            setShowModal(true)
        }
    }
    const handleOk = () => {
        setShowModal(false)
      };
      const handleCancel = () => {
        setShowModal(false)
      };
    return (
        <div className="p-5 text-center change-password-container">
            <Modal title={modalTitle} open={showModal} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
            <h3>Input your new password</h3>
            <div className="py-3">
                <input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
            </div>
            <button onClick={submit}>Confirm</button>
        </div>
    )   
}