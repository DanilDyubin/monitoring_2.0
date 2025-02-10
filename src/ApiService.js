const BASE_BACKEND_URL = document
    .querySelector(`meta[name="backend-url"]`)
    .getAttribute("content");

class ApiService {
    static async oauthSudir() {
        try {
            const res = await fetch(
                BASE_BACKEND_URL +
                    "/oauth/sudir?login=admin&password=adminadmin1"
            );

            if (!res.ok) {
                throw new Error(
                    `Ошибка: ${response.status} ${response.statusText}`
                );
            }

            return await res.json();
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            return { error: error.message };
        }
    }
    static async getRequests() {
        return fetch(BASE_BACKEND_URL + "/requests").then((res) => res.json());
    }
    static async getNews() {
        return fetch(BASE_BACKEND_URL + "/news").then((res) => res.json());
    }
    static async getRecommendation() {
        return fetch(BASE_BACKEND_URL + "/recommendations").then((res) =>
            res.json()
        );
    }
    static async getServices() {
        return fetch(BASE_BACKEND_URL + "/services").then((res) => res.json());
    }
    static async getService(serviceCode) {
        return fetch(BASE_BACKEND_URL + "/services/" + serviceCode).then(
            (res) => res.json()
        );
    }
    static async getProjects() {
        return fetch(BASE_BACKEND_URL + `/projects`).then((res) => res.json());
    }
    static async getObject(uin) {
        return fetch(BASE_BACKEND_URL + "/object/" + uin).then((res) =>
            res.json()
        );
    }
    static async post3DRequest(object) {
        return fetch(BASE_BACKEND_URL + "/3drequest", {
            method: "POST",
            body: JSON.stringify(object),
        }).then((res) => res.json());
    }
    static async getUserInformation() {
        return fetch(BASE_BACKEND_URL + "/user").then((res) => res.json());
    }
    static async getObjects() {
        return fetch(BASE_BACKEND_URL + "/objects").then((res) => res.json());
    }
    static async getPrivacy() {
        return fetch(BASE_BACKEND_URL + "/settings").then((res) => res.json());
    }
}

export default ApiService;
