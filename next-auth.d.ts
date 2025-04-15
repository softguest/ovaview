import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  image: string;
  firstName:                 string;
  middleName:                string;
  lastName:                  string;
  bloodGroup:                string;
  gender:                    string;
  dateOfBirth:               string;
  telePhone:                 string;

  currentAddress:             string;
  cityName:                   string;
  country:                    string;
  pinCode:                    string;

  parentFirstName:        string;
  parentMiddleName:       string;
  parentLastName:         string;
  parentGender:           string;
  parentDateOfBirth:      string;
  parentBloodGroup:       string;
  parentTelePhone:        string;
  parentEmail:            string;
  parentEducation:        string;
  parentProfession:       string;

  email:                    string;
  role:                     UserRole;
  isTwoFactorEnabled:       boolean;
  isOAuth:                  boolean;
  

  typeOfIdentificationCard: string;
  identificationCardNumber: string;
  identificationFile: string;
  
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
