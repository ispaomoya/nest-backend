import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid') // 主键，使用 UUID
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false }) // varchar 类型，最大长度 255，不允许为空
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true }) // varchar 类型，最大长度 255，不允许为空，唯一
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false }) // varchar 类型，最大长度 255，不允许为空
  pwd: string;

  @Column({ type: 'bigint', nullable: false }) // bigint 类型，不允许为空
  phone: number;

  @Column({ type: 'int', nullable: true, default: 0 }) // int 类型，允许为空
  sex: number;

  @Column({ type: 'int', nullable: true }) // int 类型，允许为空
  age: number;

  @Column({ type: 'text', nullable: true }) // text 类型，允许为空
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: 'user' }) // varchar 类型，最大长度 255，不允许为空
  role: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // varchar 类型，最大长度 255，允许为空
  avatar: string;

  @Column({ type: 'text', nullable: true }) // text 类型，允许为空
  text: string;

  @Column({ type: 'bigint', nullable: false }) // bigint 类型，不允许为空
  orderId: number;


  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)', // 使用微秒精度
    precision: 6
})
createdAt: Date;

@UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)', // 使用微秒精度
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    precision: 6
})
updatedAt: Date;

@DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    precision: 6
})
deletedAt: Date;;

  @BeforeInsert()
  generateUUID() {
    this.id = uuidv4(); // 生成 UUID
  }
}