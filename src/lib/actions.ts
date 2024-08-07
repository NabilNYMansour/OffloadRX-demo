"use server";

import { createEmail, createMessage, getEmail } from "@/db/queries";
import * as checks from "./checks";

export async function addToMailingList(name: string, email: string) {
  try {
    name = name.trim();
    email = email.trim();

    checks.emailSchema.parse({ name, email });

    try {
      await createEmail(name, email);
    } catch (error: any) {
      return { error: "Email already exists" };
    }
    return { error: null };
  } catch (error: any) {
    console.error("Error add mailist at", new Date().toISOString());
    console.error(error);
    return { error: "Failed to add to mailing list! Please try again." };
  }
}

export async function sendMessage(name: string, email: string, subject: string, message: string) {
  try {
    name = name.trim();
    email = email.trim();
    subject = subject.trim();
    message = message.trim();

    checks.messageSchema.parse({ name, email, subject, message });

    const emailQuery = await getEmail(email);
    let emailId;
    if (emailQuery.length === 0) {
      name = name.trim();
      email = email.trim();
  
      checks.emailSchema.parse({ name, email });
      const createEmailResult = await createEmail(name, email);
      emailId = createEmailResult.lastInsertRowid as number;
    } else {
      emailId = emailQuery[0].id;
    }

    await createMessage(emailId, subject, message);
    return { error: null };
  } catch (error: any) {
    console.error("Error creating message at", new Date().toISOString());
    console.error(error);
    return { error: "Failed to send message! Please try again." };
  }
}