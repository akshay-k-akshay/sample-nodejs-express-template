import { Sample } from "../models";
import { SampleType } from "../types";

export async function create(sampleData: SampleType) {
  const sample = new Sample(sampleData);
  return await sample.save();
}

export async function list() {
  return await Sample.find();
}
