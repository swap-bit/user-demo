import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    async updateUser(UserId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(UserId, updateUserDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User #${UserId} not found`);
        }
        return existingUser;
    }

    async getAllUsers(): Promise<IUser[]> {

        const UserData = await this.userModel.find();
        if (!UserData || UserData.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return UserData;

    }
    async getUser(UserId: string): Promise<IUser> {

        const existingUser = await this.userModel.findById(UserId).exec();
        if (!existingUser) {
            throw new NotFoundException(`User #${UserId} not found`);
        }
        return existingUser;

    }
    async deleteUser(UserId: string): Promise<IUser> {
        const deletedUser = await this.userModel.findByIdAndDelete(UserId);
        if (!deletedUser) {
            throw new NotFoundException(`User #${UserId} not found`);
        }
        return deletedUser;
    }
}