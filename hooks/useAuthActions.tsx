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

    const handleResetPasswordWithEmail = async(token : string , newPassword : string) => {
        try {
            const response = await fetch('/api/resetPasswordWithEmail', {
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

    const handleResetPassword = async(currentPassword : string , newPassword : string) => {
        try {
            const response = await fetch('/api/resetPassword', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({currentPassword , newPassword})
            });

            if(!response.ok) {
                const error = await response.json();
                return {error : error.message || 'Failed to change password'};
            }

            const data = await response.json();
            return data;

        } catch(e : any) {
            return console.error(e);
        }
    }
    return {handleSignUp , handleSendResetPassword , handleResetPasswordWithEmail , handleResetPassword}
}