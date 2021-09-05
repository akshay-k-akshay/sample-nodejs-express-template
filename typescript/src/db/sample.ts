import { Sample } from "../models";
import { SampleType } from "../types";

export async function create(sampleData: SampleType) {
  const sample = new Sample(sampleData);
  return await sample.save();
}

export async function list(limit: number, skip: number) {
  const total = await Sample.countDocuments({});
  const samples = await Sample.find({}, "_id title createdAt", {
    skip,
    limit
  });
  return {
    data: samples,
    meta: {
      total,
      limit
    }
  };
}
