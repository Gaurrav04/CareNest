"use server";

import { ID , Query} from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
    try {
        const  newUser = await users.create(ID.unique(), 
        user.email, 
        user.phone,
        undefined,
        user.name
    )
      console.log({newUser})

      return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents?.users[0]
        }
    }
};

export const getUser = async (userId: string) => {
    try {
      const user = await users.get(userId);
  
      return parseStringify(user);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the user details:",
        error
      );
    }
  };
  export const registerPatient = async ({identificationDocument, userId, ...patient}: RegisterUserParams) => {
    try {
  
      let file;
  
      // Ensure that userId is included, either from the patient or the authenticated user
      const finalUserId = userId || "default-user-id"; // Replace with the logic to get the authenticated user's ID
      console.log('Final UserId:', finalUserId); // Debugging line
  
      if (identificationDocument) {
        const inputFile = InputFile.fromBuffer(
          identificationDocument?.get('blobFile') as Blob,
          identificationDocument?.get('fileName') as string,
        )
  
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        console.log('File created with ID:', file?.$id); // Debugging line
      }
  
      // Pass the patient object directly, ensuring userId is included
      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          userId: finalUserId, // Ensure userId is set here
          identificationDocumentId: file?.$id ? file.$id : null,
          identificationDocumentUrl: file?.$id
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
            : null,
          ...patient, // Spread the rest of the patient data
        }
      );
    
      console.log('New patient created:', newPatient); // Debugging line
  
      return parseStringify(newPatient);
    } catch (error) {
      console.error("An error occurred while creating a new patient:", error);
    }
};
