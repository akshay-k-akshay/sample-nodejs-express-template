import { SampleType } from "../types";
import { Samples } from "../db";
import { BadRequestError } from "../errors";

export async function create(sampleData: SampleType) {
  if (!sampleData.title) {
    throw new BadRequestError("title is empty");
  }
  return await Samples.create(sampleData);
}

export async function list(limit: number, page: number) {
  const skip = (page - 1) * limit;
  return await Samples.list(limit, skip);
}
