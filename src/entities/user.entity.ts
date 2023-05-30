import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
enum Role {
  Admin = "admin",
  user = "user",
}
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ length: 10 })
  phoneNo: string;
  @Column({ type: "enum", enum: Role, default: Role.user })
  role: Role;
}
