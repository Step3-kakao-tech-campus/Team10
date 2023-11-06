import { fileInstance, instance } from "./instance";

export const getCarwashes = async () => {
  return instance.get("/api/owner/carwashes");
};

export const getCarwashesDetails = async (carwash_id) => {
  return fileInstance.get(`/api/owner/carwashes/${carwash_id}/details`);
};

export const putCarwashesDetails = async (carwash_id, data) => {
  return fileInstance.put(`/api/owner/carwashes/${carwash_id}/details`, data);
};

export const register = async (data) => {
  return instance.post("/api/owner/carwashes/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addBays = async (data) => {
  const { carwash_id, bay_number } = data;
  return instance.post(`/api/owner/carwashes/${carwash_id}/bays`, {
    bayNum: bay_number,
  });
};

export const getCarwashItem = async (carwash_id) => {
  return instance.get(`/api/owner/carwashes/${carwash_id}`);
};

export const getCarwashBayReservationHistory = async (carwash_id, bay_id) => {
  return instance.get(`/api/owner/reservation/${carwash_id}/${bay_id}`);
};
