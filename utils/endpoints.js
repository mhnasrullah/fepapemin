import Api from './api'

export default {
    login : (data) => {
        return Api().post("/auth/login",data);
    },
    register : (data) => {
        return Api().post("/auth/register",data);
    },
    getAllMahasiswa : () => {
        return Api().get("/mahasiswa");
    },
    getOneMahasiswa : (nim) => {
        return Api().get(`/mahasiswa/${nim}`);
    },
    getAllProdi : () => {
        return Api().get("/prodi");
    },
    getAllMataKuliah : () => {
        return Api().get("/matakuliah");
    }
}