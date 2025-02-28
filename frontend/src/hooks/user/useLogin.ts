import { useState } from "react"
import { setUser } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function useLogin() {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const login = async (email:string, password:string) => {
        setIsLoading(true)

        const response = await fetch ('http://localhost:5050/api/user/login', {
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
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(setUser(user))
        }

        return user
        
    }

    return {
        isLoading,
        error,
        login
    }
    
}