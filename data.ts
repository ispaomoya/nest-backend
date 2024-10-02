import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dataBase: TypeOrmModuleOptions  = {
    type: 'mysql',
    host: '112.124.60.172',
    port: 33447,
    username: 'ispaomoya',
    password: '123Ispaom!',
    database: 'hs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // 开发阶段可以设置为 true，生产环境应设置为 false
}