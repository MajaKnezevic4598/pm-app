import axiosInstance from '../helpers/axiosInstance';

function compare(a, b) {
    if (a.attributes.createdAt > b.attributes.createdAt) {
        return -1;
    }
    if (a.attributes.createdAt < b.attributes.createdAt) {
        return 1;
    }
    return 0;
}

const employee = {
    employeeData: async function (id, nameFilter, page) {
        try {
            //na pocetku ? ubaciti paginaciju prihvatiti page gore u parametre, promeniti pageSize na veci broj
            const response = await axiosInstance.get(
                `/projects?filters[employees][id][$eq]=${id}&filters[name][$containsi]=${nameFilter}&populate=project_manager.profilePhoto&populate=logo&populate=employees&pagination[pageSize]=2&pagination[page]=${page}`,
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default employee;
