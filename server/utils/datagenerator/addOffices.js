import mongoose from "mongoose";
import { OfficeModel } from "../../models/Office.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const officesData = [
  {
    name: "    المكتب الوطني ",
    phone: "0000000000",
    email: "email@national.dz",
  },
  {
    name: "المكتب الولائي - أدرار",
    phone: "0000000000",
    email: "email@adrar.dz",
  },
  {
    name: "المكتب الولائي - الشلف",
    phone: "0000000000",
    email: "email@chlef.dz",
  },
  {
    name: "المكتب الولائي - الأغواط",
    phone: "0000000000",
    email: "email@laghouat.dz",
  },
  {
    name: "المكتب الولائي - أم البواقي",
    phone: "0000000000",
    email: "email@oumelbouaghi.dz",
  },
  {
    name: "المكتب الولائي - باتنة",
    phone: "0000000000",
    email: "email@batna.dz",
  },
  {
    name: "المكتب الولائي - بجاية",
    phone: "0000000000",
    email: "email@bejaia.dz",
  },
  {
    name: "المكتب الولائي - بسكرة",
    phone: "0000000000",
    email: "email@biskra.dz",
  },
  {
    name: "المكتب الولائي - بشار",
    phone: "0000000000",
    email: "email@bechar.dz",
  },
  {
    name: "المكتب الولائي - البليدة",
    phone: "0000000000",
    email: "email@blida.dz",
  },
  {
    name: "المكتب الولائي - البويرة",
    phone: "0000000000",
    email: "email@bouira.dz",
  },
  {
    name: "المكتب الولائي - تمنراست",
    phone: "0000000000",
    email: "email@tamanrasset.dz",
  },
  {
    name: "المكتب الولائي - تبسة",
    phone: "0000000000",
    email: "email@tebessa.dz",
  },
  {
    name: "المكتب الولائي - تلمسان",
    phone: "0000000000",
    email: "email@tlemcen.dz",
  },
  {
    name: "المكتب الولائي - تيارت",
    phone: "0000000000",
    email: "email@tiaret.dz",
  },
  {
    name: "المكتب الولائي - تيزي وزو",
    phone: "0000000000",
    email: "email@tiziouzou.dz",
  },
  {
    name: "المكتب الولائي - الجزائر",
    phone: "0000000000",
    email: "email@alger.dz",
  },
  {
    name: "المكتب الولائي - الجلفة",
    phone: "0000000000",
    email: "email@djelfa.dz",
  },
  {
    name: "المكتب الولائي - جيجل",
    phone: "0000000000",
    email: "email@jijel.dz",
  },
  {
    name: "المكتب الولائي - سطيف",
    phone: "0000000000",
    email: "email@setif.dz",
  },
  {
    name: "المكتب الولائي - سعيدة",
    phone: "0000000000",
    email: "email@saida.dz",
  },
  {
    name: "المكتب الولائي - سكيكدة",
    phone: "0000000000",
    email: "email@skikda.dz",
  },
  {
    name: "المكتب الولائي - سيدي بلعباس",
    phone: "0000000000",
    email: "email@sidibelabbes.dz",
  },
  {
    name: "المكتب الولائي - عنابة",
    phone: "0000000000",
    email: "email@annaba.dz",
  },
  {
    name: "المكتب الولائي - قالمة",
    phone: "0000000000",
    email: "email@guelma.dz",
  },
  {
    name: "المكتب الولائي - قسنطينة",
    phone: "0000000000",
    email: "email@constantine.dz",
  },
  {
    name: "المكتب الولائي - المدية",
    phone: "0000000000",
    email: "email@medea.dz",
  },
  {
    name: "المكتب الولائي - مستغانم",
    phone: "0000000000",
    email: "email@mostaganem.dz",
  },
  {
    name: "المكتب الولائي - المسيلة",
    phone: "0000000000",
    email: "email@msila.dz",
  },
  {
    name: "المكتب الولائي - معسكر",
    phone: "0000000000",
    email: "email@mascara.dz",
  },
  {
    name: "المكتب الولائي - ورقلة",
    phone: "0000000000",
    email: "email@ouargla.dz",
  },
  {
    name: "المكتب الولائي - وهران",
    phone: "0000000000",
    email: "email@oran.dz",
  },
  {
    name: "المكتب الولائي - البيض",
    phone: "0000000000",
    email: "email@elbayadh.dz",
  },
  {
    name: "المكتب الولائي - إليزي",
    phone: "0000000000",
    email: "email@illizi.dz",
  },
  {
    name: "المكتب الولائي - برج بوعريريج",
    phone: "0000000000",
    email: "email@bordjbouarreridj.dz",
  },
  {
    name: "المكتب الولائي - بومرداس",
    phone: "0000000000",
    email: "email@boumerdes.dz",
  },
  {
    name: "المكتب الولائي - الطارف",
    phone: "0000000000",
    email: "email@eltarf.dz",
  },
  {
    name: "المكتب الولائي - تندوف",
    phone: "0000000000",
    email: "email@tindouf.dz",
  },
  {
    name: "المكتب الولائي - تيسمسيلت",
    phone: "0000000000",
    email: "email@tissemsilt.dz",
  },
  {
    name: "المكتب الولائي - الوادي",
    phone: "0000000000",
    email: "email@eloued.dz",
  },
  {
    name: "المكتب الولائي - خنشلة",
    phone: "0000000000",
    email: "email@khenchela.dz",
  },
  {
    name: "المكتب الولائي - سوق أهراس",
    phone: "0000000000",
    email: "email@soukahras.dz",
  },
  {
    name: "المكتب الولائي - تيبازة",
    phone: "0000000000",
    email: "email@tipaza.dz",
  },
  {
    name: "المكتب الولائي - ميلة",
    phone: "0000000000",
    email: "email@mila.dz",
  },
  {
    name: "المكتب الولائي - عين الدفلى",
    phone: "0000000000",
    email: "email@aindefla.dz",
  },
  {
    name: "المكتب الولائي - النعامة",
    phone: "0000000000",
    email: "email@naama.dz",
  },
  {
    name: "المكتب الولائي - عين تموشنت",
    phone: "0000000000",
    email: "email@aintemouchent.dz",
  },
  {
    name: "المكتب الولائي - غرداية",
    phone: "0000000000",
    email: "email@ghardaia.dz",
  },
  {
    name: "المكتب الولائي - غليزان",
    phone: "0000000000",
    email: "email@relizane.dz",
  },
];

function seedData() {
  OfficeModel.insertMany(officesData)
    .then(() => {
      console.log("Offices seeded successfully!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error seeding offices:", err);
      mongoose.connection.close();
      process.exit(1);
    });
}
