import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneId(id: string): Promise<any>;
    findOneOrder(param: any, boo?: boolean): Promise<any>;
    update(updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<any>;
    hardRemove(id: string): Promise<any>;
}
