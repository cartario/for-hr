import firebaseAdapter from '../utils/firebaseAdapter';
import mongoAdapter from '../utils/mongoAdapter';
import { Http } from '../utils/http';
import { keys } from '../keys';

export const getLessonsFirebaseApi = async () => {
  try {
    const response = await Http.get(`${keys.FIREBASE_BASE_URL}/lessons.json`);
    const adaptedLessons = firebaseAdapter(response);
    return adaptedLessons;
  } catch (e) {
    throw new Error();
  }
};

export const getLessonsMongoApi = async () => {
  try {
    const response = await Http.get(`${keys.BASE_URL}/api/lessons`);
    const adaptedLessons = mongoAdapter(response.lessons);
    return adaptedLessons;
  } catch (e) {
    throw new Error();
  }
};
