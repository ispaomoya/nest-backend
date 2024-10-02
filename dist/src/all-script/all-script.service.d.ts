import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
export declare class AllScriptService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    runScript(): Promise<any>;
}
