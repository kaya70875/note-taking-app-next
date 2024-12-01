import jwt from 'jsonwebtoken'

interface Form {
    email: string,
    password: string,
}

export const useAuthActions = () => {

    const handleSignUp = async (form: Form) => {
        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSendResetPassword = async(email : string) => {
        try {
            const response = await fetch('/api/sendResetEmail' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email})
            });

            if(response.ok) {
               console.log('Reset link sent successfully!'); 
            } else {
                console.log('There was an error while sending reset link.');
            }
        } catch(e){
            console.error(e);
        }
    }

    const handleResetPassword = async(token : string , newPassword : string) => {
        try {
            const response = await fetch('/api/resetPassword', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({token , newPassword})
            });

            if(response.ok) {
                console.log('Password reset successfully.'); 
             } else {
                 console.log('There was an error while resetting password.');
             }
    } catch(e : any) {
        console.error(e);
    }

    }
    return {handleSignUp , handleSendResetPassword , handleResetPassword}
}