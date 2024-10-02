import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import {
  hashPassword,
  toPost200,
  to400,
  to404,
  toGet200,
  toList200,
} from '../tools';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // 新增
  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { phone: createUserDto.phone }, withDeleted: true })
        
    if (user) return to400('该手机号已被注册');

    const userEmail = await this.usersRepository.findOne({ where: { email: createUserDto.email }, withDeleted: true })
        
    if (userEmail) return to400('该邮箱已存在');

    const pwd = await hashPassword(createUserDto.pwd);
    createUserDto.pwd = pwd;

    const newUser = this.usersRepository.create(createUserDto);

    this.usersRepository.save(newUser);

    return toPost200();
  }
  // 分页查
  async findAll(query: any): Promise<any> {
    let { pageNum, pageSize, id, phone, email, name, orderId, sex, columnKey = 'createdAt', order = 'desc' } = query;

    pageSize = Number(pageSize ?? 10);
    pageNum = Number(pageNum ?? 1) ;
    const skip = (pageNum - 1) * pageSize;
    const where: any = {};
    if (id) where.id = id;
    if (phone) where.phone = Number(phone);
    if (email) where.email = email;
    if (name) where.name = name;
    if (orderId) where.orderId = Number(orderId);
    if (sex === 1 || sex === 0 || sex === '1' || sex === '0') where.sex = Number(sex);
    const [users, total] = await this.usersRepository.findAndCount({
      skip,
      take: pageSize,
      withDeleted: true,
      where,
      order: {
        [columnKey]: order.toUpperCase(),
      }
      // where: otherParams, // 处理其他查询参数
    });

    const data = users.map((item: any) => {
      delete item.pwd;
      return item;
    });

    return toList200(total, pageNum, pageSize, data);
  }


  // 查找一个
  async findOneId(id: string): Promise<any> {
    // return this.usersRepository.findOne({ where: { id }, withDeleted: true }); // 包括已删除的记录
    const data = await this.usersRepository.findOne({ where: { id }, withDeleted: true })

    return toGet200(data);
  }
// 查找一个
  async findOneOrder(param: any, boo: boolean = false): Promise<any> {
    // return this.usersRepository.findOne({ where: { id }, withDeleted: true }); // 包括已删除的记录
    const data = await this.usersRepository.findOne({ where: { ...param }, withDeleted: true })
    if (!data) {
        return to404('用户不存在');
      }
    if (data && !boo) {
      delete data.pwd;
    }
    return toGet200(data);
  }

  async update(updateUserDto: UpdateUserDto): Promise<any> {
    updateUserDto.orderId = Number(updateUserDto.orderId);
    updateUserDto.phone = Number(updateUserDto.phone);
    updateUserDto.sex = Number(updateUserDto.sex);

    this.usersRepository.save({...updateUserDto });

    return toPost200();
  }

  async remove(id: string): Promise<any> {

    const user: any = await this.usersRepository.findOne({where: {id}}); // 软删除，设置 deletedAt 字段
   
    if (user) {
      user.deletedAt = new Date();
      
      await this.usersRepository.save(user);
      
    }
    return toPost200();
  }

  hardRemove(id: string): Promise<any> {
    return this.usersRepository.delete(id); // 硬删除，从数据库中彻底删除记录
  }
}
