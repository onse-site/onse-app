import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { OfficeModel } from "../../models/Office.js";
import { MemberModel } from "../../models/Member.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const MONGO_URI = process.env.DATABASE_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    /* seedMembers(); */
    /* addTenMembersToOffice("682616ecbd660747f6c38fed"); */
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

async function seedMembers() {
  try {
    console.log("Fetching existing offices...");
    const offices = await OfficeModel.find({});

    if (offices.length === 0) {
      console.log(
        "No offices found in the database. Please run the office seeding script first."
      );
      mongoose.connection.close();
      return;
    }

    console.log(
      `Found ${offices.length} offices. Preparing to generate members...`
    );
    const membersToInsert = [];
    let globalMemberCounter = 0;

    for (const office of offices) {
      const officeDomain = office.email.split("@")[1];

      for (let i = 0; i < 10; i++) {
        globalMemberCounter++;
        const isOfficePresident = i === 0;
        const role = isOfficePresident ? "OP" : "OM";

        const name = `Member${globalMemberCounter}`;
        const email = `member${globalMemberCounter}@${officeDomain}`;

        const phone = `000000000000${globalMemberCounter}`.slice(-12);

        const rawPassword = `member${globalMemberCounter}`;
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        membersToInsert.push({
          name,
          email,
          phone,
          password: hashedPassword,
          office: office._id,
          role,
        });
      }
    }

    console.log(`Attempting to insert ${membersToInsert.length} members...`);
    await MemberModel.insertMany(membersToInsert);
    console.log(`Successfully seeded ${membersToInsert.length} members!`);
  } catch (error) {
    if (error.code === 11000) {
      console.error(
        "Error seeding members: Duplicate email found. Some members might already exist.",
        error.message
      );
    } else {
      console.error("Error seeding members:", error);
    }
  } finally {
    console.log("Closing MongoDB connection.");
    mongoose.connection.close();
  }
}

async function addTenMembersToOffice(officeId) {
  try {
    console.log(`Attempting to add 10 members to office ID: ${officeId}`);

    const office = await OfficeModel.findById(officeId);
    if (!office) {
      console.log(`Office with ID ${officeId} not found.`);
      // Note: This function does not close the connection.
      // The calling context should handle it.
      return;
    }

    console.log(
      `Found office: "${office.name}" (${office.email}). Preparing to generate 10 members...`
    );
    const officeDomain = office.email.split("@")[1];
    const membersToInsert = [];

    // Determine the starting number for new members to ensure uniqueness globally
    let lastMemberNumericId = 0;
    const numericNamedMembers = await MemberModel.find(
      { name: { $regex: /^Member\d+$/ } },
      { name: 1 }
    )
      .sort({ name: -1 })
      .limit(1)
      .lean();
    if (numericNamedMembers.length > 0) {
      const nameParts = numericNamedMembers[0].name.match(/^Member(\d+)$/);
      if (nameParts && nameParts[1]) {
        lastMemberNumericId = parseInt(nameParts[1]);
      }
    }
    // Fallback if regex match fails or no numeric members, check all members by createdAt
    if (lastMemberNumericId === 0) {
      const lastAnyMember = await MemberModel.findOne({}, { name: 1 })
        .sort({ createdAt: -1 })
        .lean();
      if (
        lastAnyMember &&
        lastAnyMember.name &&
        lastAnyMember.name.startsWith("Member")
      ) {
        const num = parseInt(lastAnyMember.name.substring("Member".length));
        if (!isNaN(num) && num > lastMemberNumericId) {
          lastMemberNumericId = num;
        }
      }
    }
    let memberCounter = lastMemberNumericId;

    // Check if an Office President (OP) already exists for this office
    const existingOP = await MemberModel.findOne({
      office: office._id,
      role: "OP",
    });
    if (existingOP) {
      console.log(
        `Office "${office.name}" already has an Office President. New members will be Office Members (OM).`
      );
    }

    for (let i = 0; i < 10; i++) {
      memberCounter++; // Increment for each new member

      let role = "OM"; // Default to Office Member
      // Assign OP role to the first new member (i=0) only if no OP currently exists for this office
      if (i === 0 && !existingOP) {
        role = "OP";
      }

      const name = `Member${memberCounter}`;
      const email = `member${memberCounter}@${officeDomain}`;
      // Ensure phone generation is robust if memberCounter becomes very large
      const phoneSuffix = memberCounter.toString();
      const phone = `000000000000${phoneSuffix}`.slice(-12);

      const rawPassword = `member${memberCounter}`;
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      membersToInsert.push({
        name,
        email,
        phone,
        password: hashedPassword,
        office: office._id,
        role,
      });
    }

    if (membersToInsert.length > 0) {
      console.log(
        `Attempting to insert ${membersToInsert.length} new members into office "${office.name}"...`
      );
      await MemberModel.insertMany(membersToInsert);
      console.log(
        `Successfully added ${membersToInsert.length} new members to office "${office.name}"!`
      );
    } else {
      console.log("No new members were generated to insert for the office.");
    }
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      console.error(
        `Error adding members to office ${officeId}: Duplicate name or email found. Member with identifier "Member${
          error.keyValue?.name?.replace("Member", "") ||
          error.keyValue?.email?.split("@")[0].replace("member", "")
        }" might already exist.`,
        error.message
      );
    } else {
      console.error(`Error adding members to office ${officeId}:`, error);
    }
  }
  // This function does NOT close the MongoDB connection.
  // It relies on the calling context to manage the connection lifecycle.
}
