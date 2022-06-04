import { baseResponseHandler } from '/somewhere';

const getBaseUrl = (userId) => `/api/admin/${userId}/program`;

export const savePupilProgramApi = ({ userId, subject, data, pupilKlass }) => {
  const query = `${`?pupil_class=${pupilKlass}`}${subject && `&subject=${subject}`}`;
  const baseUrl = getBaseUrl(userId);

  return fetch(`${baseUrl}${query}`, {
    ...postOptions,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(baseResponseHandler);
};
