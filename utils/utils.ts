/* eslint-disable import/prefer-default-export */

export const generateNameVideo = () : string => Math.random().toString(36).substring(2, 7);

export const getVideoContentType = async (uri: string) : Promise<string> => {
  const response = await fetch(uri);
  const fileBody = await response.blob();
  return fileBody.type;
};
