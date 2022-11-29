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
    getAllProdi : () => {
        return Api().get("/prodi");
    }
}