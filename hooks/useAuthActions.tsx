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

    return {handleSignUp}
}