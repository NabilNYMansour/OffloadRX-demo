import { getMedicineById } from "@/db/queries";

export const getMedicinePost = async () => {
  const dataQuery = await getMedicineById(1);
  if (!dataQuery) {
    throw new Error("No data found");
  }
  const data = dataQuery[0];
  return {
    image: data.imgUrl,
    size: 200,
    title: data.name,
    content: data.description,
    date: data.expiry,
  };
};
