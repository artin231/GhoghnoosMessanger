import { useEffect, useContext, use } from 'react'
import { FormLogin, InputSubmit2,TitleDiv2,InputHandelDiv,ImgLogoInput,FormLogin2 ,  PLinkElement } from '../../styled_components/StyledLoginPage'
import FormAuthSignUpItem from './FormAuthSignUpItem'
import { MessengerContext } from '../../Context/MessengerContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'

let FormAuthSignIn = ({ name }) => {
    let dt = useContext(MessengerContext);

   return (
        <FormLogin2 action="" className="login" onSubmit={() => { dt.SubmitSignUpHandler() }}>
            <TitleDiv2>
	   <ImgLogoInput src='/src/assets/1787474457 (Edited)-no-bg.png'/>
	    <h1>{name}</h1>
	    </TitleDiv2>
            <FormAuthSignUpItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' PlaceHolder='نام کاربری خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='نام' InputType='text' IDNAME='NameInput' PlaceHolder='نام خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='رمز عبور' InputType='password' IDNAME='password1' PlaceHolder='رمز عبور خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='تکرار رمز عبور' InputType='password' IDNAME='password2' PlaceHolder='تکرار رمز عبور خود را وارد کنید' />

            <InputSubmit2 type="submit" value="ثبت اطلاعات" className="sub"  />
<p className='LinkP'> حساب کاربری دارید؟ <Link to='/login' className='linkA'>وارد شوید</Link></p>
        </FormLogin2>
    )
}

export default FormAuthSignIn;
