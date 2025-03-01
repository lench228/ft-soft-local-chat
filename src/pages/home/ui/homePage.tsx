import {useSelector} from "react-redux";
import {selectUser} from "features/auth/model";


export const HomePage = () => {
    const user = useSelector(selectUser);

    return (
        <div>
            <p className={'tex-2xl'}>Привет, {user.name} !</p>
        </div>
    );
};
