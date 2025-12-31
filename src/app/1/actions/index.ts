'use server';

import { formEntityType, inputID } from '../utils/consts';

export async function actionSubmit(
  prevState: formEntityType,
  formData: FormData
) {
  const newData: formEntityType = {
    question: formData.get(inputID.question) as string,
    response: formData.get(inputID.response) as string
  };

  console.log({ newData });
  if (!newData.question || !newData.response) return { ...newData };

  return { ...newData };
}
