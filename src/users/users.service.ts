import { Injectable, BadRequestException } from '@nestjs/common';
@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(Member)
  //   private memberRepository: Repository<Member>,
  // ) {}

  async checkUser() {
    //TODO Database user check logic
    return true
  }

  async removeRefreshToken(id: number) {
    // return this.usersRepository.update(id, {
    //   currentHashedRefreshToken: null,
    // });
  }
}