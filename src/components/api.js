import axiosClient from '../axiosClient';

const api = {
    login: async function(creds) {
        const loginResponse = await axiosClient.post('/users/login', creds);
        return loginResponse.data.user;
    },
    unenrollSection: async function(userId, sectionId) {
        const request = {
            userId,
            sectionId
          }
          const unenrollResponse = await axiosClient.post('/courses/unenrollUserForSection', request);
          return unenrollResponse.data.user;
    },
    enrollSection: async function(userId, sectionId) {
        const request = {
            userId,
            sectionId
          }
          const enrollResponse = await axiosClient.post('/courses/enrollUserForSection', request);
          return enrollResponse.data.user;
    },
    getCourses: async function() {
        const listcoursesResponse = await axiosClient.post('/courses/list');
        return listcoursesResponse.data.courses;
    }
}


export default api