import { ServerURls } from '../../routes/+server';
import { type Writable, writable } from 'svelte/store';

interface IUserService {
    login(username: string, password: string): Promise<IUserLoginResponse | null>;
}

export class UserService implements IUserService {
    async login(username: string, password: string):Promise<IUserLoginResponse | null> {
        let request: ILoginRequest = {
            username: username,
            password: password
        };

        const response = await fetch(`${ServerURls.usersLogin}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            
            console.log("No login for you");
            return null;
        }
        const data = await response.json() as IUserLoginResponse;
        console.log(data);
        return data;
    }
}

const userService = new UserService();
export default userService;
