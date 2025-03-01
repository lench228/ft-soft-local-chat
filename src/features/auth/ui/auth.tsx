import {FormEvent} from "react";
import {useDispatch} from "react-redux";
import {loginUser, regUser} from "../model";


export const Auth = () => {

    const dispatch = useDispatch();


    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = String(new FormData(e.currentTarget).get('name'));
        if(name) {
            const userId = localStorage.getItem(name);
            if(!userId){
                dispatch(regUser(name))
            }else{
                dispatch(loginUser({name: name, id: userId}));
            }
        }

    }
    return (
        <form className="w-full h-full bg-blue-500" onSubmit={(e) =>handleFormSubmit(e)}>

            Зарегайся братуха
            <fieldset className="w-full">
                <input id='name' name={'name'}/>
            </fieldset>

            <button type="submit">Регистрация</button>
        </form>
    );
};

