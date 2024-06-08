import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class User {
   @Prop()
   name: string;
   @Prop()
   email: string;
   @Prop()
   phoneNumber: string;
   @Prop()
   address: string;
}
export const UserSchema = SchemaFactory.createForClass(User);