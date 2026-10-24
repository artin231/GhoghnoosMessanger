import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export let MessengerContext = createContext();



export let FuncContextProviderManager = ({children}) => {
    let [isLogedIn,ChnageActiveForm] = useState(false);
   
    let SubmitLoginHandler = () => {
        event.preventDefault();
        let ok = true;

        let input_name = document.querySelector('input#TextInput');
        let input_pass1 = document.querySelector('input#PasswordInput1');

        let alert_name = document.querySelector('h6.alertTextInput');
        let alert_pass1 = document.querySelector('h6.alertPasswordInput1');

        if (input_name.value == 0 || input_pass1.value == 0 ) {
            input_name.style.borderBottom = '2px solid red';
            alert_name.innerHTML = 'یکی از ورودی ها خالی هست';
            ok = false;
        } else {
            input_name.style.borderBottom = '2px solid #262537';
            alert_name.innerHTML = '';
        }

        if (ok) {
            fetch('http://127.0.0.1:8000/api/account/signin',{
                credentials: "include", // added for session
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
		    body : JSON.stringify({
		      user_name: input_name.value,
	              user_password: input_pass1.value
		    })
	    })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    if (data.message == "Login successful.") {
                        Swal.fire({
                            title: 'عملیات با موفقیت انجام شد',
                            html: '<a href="/" style="color: #006fed; text-decoration: none;">رفتن به صفحه اصلی</a>',
                            icon: "success"
                        });
 
                    } else {
                        Swal.fire({
                            title: "مشکلی پیش آمد",
                            icon: "error"
                        });
                   }

                })
        }
    }
    let SubmitSignUpHandler = async () => {

        event.preventDefault();

        let input = document.getElementById('password1');
        let input2 = document.getElementById('password2');
        let input3 = document.getElementById('TextInput');
        let input4 = document.getElementById('NameInput');

        let alertpass = document.querySelector('.alertpassword1');
        let alertpass2 = document.querySelector('.alertpassword2');
        let alertpass3 = document.querySelector('.alertTextInput');

        let ok = true;

        if (input.value.length > 0 && input2.value.length > 0 && input3.value.length > 0 && input4.value.length > 0) {
            input3.style.borderBottom = '2px solid #262537';
            ok = true;
            alertpass3.innerHTML = '';



            if (input.value !== input2.value) {
                input2.style.borderBottom = '2px solid red';
                alertpass2.innerHTML = 'این رمز با رمز بالا برابر نیست';
                ok = false;
            }
            else {
                input2.style.borderBottom = '2px solid #262537';
                alertpass2.innerHTML = '';

            }

        } else {
            input3.style.borderBottom = '2px solid red';
            alertpass3.innerHTML = 'یکی از ورودی ها خالی است';
            ok = false;
        }
        if (ok) {
		try{
			let res = await fetch('http://127.0.0.1:8000/api/account/signup/',{
			    method:'POST',
			    headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
  					"user_name": input3.value,
  					"name_user": input4.value,
  					"user_password": input.value
				    })
			});
			let dt = await res.json();
			
			if(dt.message == 'Acount successfuly created .'){
				withReactContent(Swal).fire({
  					title: "با موفقیت اکانت شما ساخته شد",
  					html: `<a href='/login' style="color:blue;"> رفتن به صفحه لاگین </a>`,
  					icon: "success"
				})
			}
			else{
				if(dt.error == 'User already exists.'){
					alertpass3.innerHTML = 'این نام کاربری وجود دارد';
					input3.style.border = '2px solid red';
				}else{
					alertpass3.innerHTML = '';
					input3.style.border = '2px solid rgb(38, 37, 55)';
				}
			}
		
		}catch(err){
			console.log(err);
				withReactContent(Swal).fire({
  					title: "مشکلی پیش آمد",
  					icon: "error"
				})

		}
        }



    }
 
    let ChangeFormActiveStatus = (value) => {
        ChnageActiveForm(value)
    }

    return(
        <MessengerContext.Provider value={{isLogedIn,ChnageActiveForm,SubmitLoginHandler,SubmitSignUpHandler}}>
            {children}
        </MessengerContext.Provider>
    )
}
