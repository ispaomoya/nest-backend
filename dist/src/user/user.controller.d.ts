import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(updateUserDto: CreateUserDto): Promise<any>;
    remove(id: string): Promise<any>;
}
