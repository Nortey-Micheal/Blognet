import { useState } from "react"
import { setUser } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function useSignup() {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const signup = async (email:string,password:string) => {
        setIsLoading(true)

        const response = await fetch ('https://blognet-server.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({email,password})
        });

        const user = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(user.error)
        }

        if (response.ok) {
            setIsLoading(false);
            setError(null)

            //store in localStorage
            localStorage.setItem('User', JSON.stringify(user));

            dispatch(setUser(user))
        }

        return user

    }

    return {
        isLoading,
        error,
        signup
    }
    
}