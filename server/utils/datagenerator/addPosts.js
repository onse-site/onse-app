import mongoose from "mongoose";
import { PostModel } from "../../models/Post.js";
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
    /*    seedPosts() */
    /*  addUserPosts("68273f55066cb58a6964780c"); */
    /*  addNationalOfficePosts(); */
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

function getRandomImageUrl(seed) {
  return `https://picsum.photos/800/600?random=${seed}`;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function seedPosts() {
  try {
    console.log("Fetching existing members...");
    const members = await MemberModel.find({}).populate("office");

    if (members.length === 0) {
      console.log(
        "No members found in the database. Please seed members first."
      );
      mongoose.connection.close();
      return;
    }

    console.log(`Found ${members.length} members. Generating posts...`);
    const postsToInsert = [];
    let globalPostCounter = 0;

    const postTypes = ["Ad", "Post"];
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date();

    for (const member of members) {
      for (let i = 0; i < 2; i++) {
        globalPostCounter++;

        const title = `مشاركة من ${member.office.name} - مشاركة #${i + 1}`;
        const content = `هذا هو محتوى المشاركة رقم ${globalPostCounter} من ${member.name}.`;
        const image = getRandomImageUrl(globalPostCounter);
        const type = getRandomItem(postTypes);
        const publishedAt = getRandomDate(startDate, endDate);

        postsToInsert.push({
          title,
          content,
          image,
          type,
          author: member._id,
          publishedAt,
        });
      }
    }

    console.log(`Attempting to insert ${postsToInsert.length} posts...`);
    await PostModel.insertMany(postsToInsert);
    console.log(`Successfully seeded ${postsToInsert.length} posts!`);
  } catch (error) {
    console.error("Error seeding posts:", error);
  } finally {
    console.log("Closing MongoDB connection.");
    mongoose.connection.close();
  }
}

async function addUserPosts(memberId) {
  try {
    console.log(`Fetching member with ID: ${memberId}...`);
    const member = await MemberModel.findById(memberId);

    if (!member) {
      console.log(
        `Member with ID ${memberId} not found. Please provide a valid member ID.`
      );
      return;
    }

    console.log(`Found member: ${member.name} . Generating posts...`);
    const postsToInsert = [];
    const startDate = new Date(2024, 0, 1); // Adjust start date as needed
    const endDate = new Date();
    let postCounter = 0; // For unique image seeds

    // Generate 7 "Post" type posts
    for (let i = 0; i < 7; i++) {
      postCounter++;
      const title = `مشاركة خاصة من ${member.name} - مشاركة #${i + 1}`;
      const content = `هذا هو محتوى المشاركة الخاصة رقم ${postCounter} المقدمة من ${member.name}.`;
      const image = getRandomImageUrl(`member_${memberId}_post_${postCounter}`);
      const publishedAt = getRandomDate(startDate, endDate);

      postsToInsert.push({
        title,
        content,
        image,
        type: "Post",
        author: member._id,
        publishedAt,
      });
    }

    // Generate 3 "Ad" type posts
    for (let i = 0; i < 3; i++) {
      postCounter++;
      const title = `إعلان خاص من ${member.name} - إعلان #${i + 1}`;
      const content = `هذا هو محتوى الإعلان الخاص رقم ${postCounter} المقدم من ${member.name}.`;
      const image = getRandomImageUrl(`member_${memberId}_ad_${postCounter}`);
      const publishedAt = getRandomDate(startDate, endDate);

      postsToInsert.push({
        title,
        content,
        image,
        type: "Ad",
        author: member._id,
        publishedAt,
      });
    }

    if (postsToInsert.length > 0) {
      console.log(
        `Attempting to insert ${postsToInsert.length} posts for member ${member.name}...`
      );
      await PostModel.insertMany(postsToInsert);
      console.log(
        `Successfully seeded ${postsToInsert.length} posts for member ${member.name}!`
      );
    } else {
      console.log(`No posts were generated for member ${member.name}.`);
    }
  } catch (error) {
    console.error(`Error seeding posts for member ${memberId}:`, error);
  } finally {
    console.log("Closing MongoDB connection (from seedData).");
    mongoose.connection.close();
  }
}

// add function to add posts for  national office members
// ...existing code...
// add function to add posts for  national office members
async function addNationalOfficePosts() {
  try {
    console.log("Fetching National Office...");
    const nationalOffice = await OfficeModel.findOne({ name: "المكتب الوطني" }); // Assuming "المكتب الوطني" is the name of the National Office

    if (!nationalOffice) {
      console.log(
        "National Office not found. Please ensure it exists in the database."
      );
      return;
    }

    console.log("Fetching members of the National Office...");
    const nationalOfficeMembers = await MemberModel.find({
      office: nationalOffice._id,
    });

    if (nationalOfficeMembers.length === 0) {
      console.log("No members found in the National Office.");
      return;
    }

    console.log(
      `Found ${nationalOfficeMembers.length} members in the National Office. Generating posts...`
    );
    const postsToInsert = [];
    const startDate = new Date(2024, 0, 1); // Adjust start date as needed
    const endDate = new Date();
    let globalPostCounter = 0; // For unique image seeds and post numbering

    for (const member of nationalOfficeMembers) {
      // Generate 5 "Post" type posts for each national office member
      for (let i = 0; i < 5; i++) {
        globalPostCounter++;
        const title = `مشاركة المكتب الوطني من ${member.name} - مشاركة #${
          i + 1
        }`;
        const content = `هذا هو محتوى المشاركة رقم ${globalPostCounter} المقدمة من ${member.name} عضو المكتب الوطني.`;
        const image = getRandomImageUrl(
          `national_office_${member._id}_post_${globalPostCounter}`
        );
        const publishedAt = getRandomDate(startDate, endDate);

        postsToInsert.push({
          title,
          content,
          image,
          type: "Post",
          author: member._id,
          publishedAt,
        });
      }

      // Generate 2 "Ad" type posts for each national office member
      for (let i = 0; i < 2; i++) {
        globalPostCounter++;
        const title = `إعلان المكتب الوطني من ${member.name} - إعلان #${i + 1}`;
        const content = `هذا هو محتوى الإعلان رقم ${globalPostCounter} المقدم من ${member.name} عضو المكتب الوطني.`;
        const image = getRandomImageUrl(
          `national_office_${member._id}_ad_${globalPostCounter}`
        );
        const publishedAt = getRandomDate(startDate, endDate);

        postsToInsert.push({
          title,
          content,
          image,
          type: "Ad",
          author: member._id,
          publishedAt,
        });
      }
    }

    if (postsToInsert.length > 0) {
      console.log(
        `Attempting to insert ${postsToInsert.length} posts for National Office members...`
      );
      await PostModel.insertMany(postsToInsert);
      console.log(
        `Successfully seeded ${postsToInsert.length} posts for National Office members!`
      );
    } else {
      console.log("No posts were generated for National Office members.");
    }
  } catch (error) {
    console.error("Error seeding posts for National Office members:", error);
  } finally {
    console.log("Closing MongoDB connection (from addNationalOfficePosts).");
    mongoose.connection.close();
  }
}

// Call the function if you want to execute it directly when running the script
// addNationalOfficePosts();
// ...existing code...
