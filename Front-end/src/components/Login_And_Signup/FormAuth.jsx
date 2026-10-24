import { useContext } from 'react'
import { FormLogin, InputSubmit,TitleDiv,InputHandelDiv,ImgLogoInput} from '../../styled_components/StyledLoginPage'
import FormAuthItem from './FormAuthItem'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import { MessengerContext } from '../../Context/MessengerContext'

let FormAuth = ({ name,des }) => {
    let getCont = useContext(MessengerContext);

    return (
        <FormLogin action="" className="login" onSubmit={() => { getCont.SubmitLoginHandler() }}>
            <TitleDiv>
	   <ImgLogoInput src='/src/assets/1787474457 (Edited)-no-bg.png'/>
             <h1>{name}</h1>
            <p>{des}</p>
            </TitleDiv>
            <InputHandelDiv>
            <FormAuthItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' PlaceHolder='نام کاربری خود را وارد کنید'/>
            <FormAuthItem ItemName='رمز عبور' InputType='password' IDNAME='PasswordInput1' PlaceHolder='رمز عبور خود را وارد کنید'/>
            </InputHandelDiv>

            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
            <p className='LinkP'> حساب کاربری ندارید؟ <Link to='/signup' className='linkA'>ثبت نام کنید</Link></p>
        </FormLogin>
    )
}

export default FormAuth;
