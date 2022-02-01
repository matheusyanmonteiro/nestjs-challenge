import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService
  ) 
  {}

  @Query(() => [User])
  async users(): Promise<User[]>{
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Query(() => User) 
  async user(@Args('id') id:string) : Promise<User>{
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id:string, @Args('data') data: UpdateUserInput)
  : Promise<User> {
    const user = this.userService.updateUser(id, data);
    return user;
  }


  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.userService.deleteUser(id);
    return deleted;
  }
}
