import { SampleType } from "../types";
import { Samples } from "../db";

export async function create(sampleData: SampleType) {
  sampleData.createdAt = Date.now();
  return await Samples.create(sampleData);
}

export async function list() {
  return await Samples.list();
}
