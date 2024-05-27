import {createClient} from "@/utils/supabase/client";

export const usercolumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NUME", uid: "name", sortable: true},
    {name: "VARSTA", uid: "age", sortable: true},
    {name: "ROL", uid: "role", sortable: true},
    {name: "ECHIPA", uid: "team", sortable: true},
    {name: "EMAIL", uid: "email"},
    {name: "ACTIUNI", uid: "actions"},
    {name: "avatar", uid: "avatar", sortable: true},
];
//export a function that return the column status from supabase
export const statusOptions = [
    {name: "Activ", uid: "active"},
    {name: "Lucreaza", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];

export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .select('* , teams ( team_id)')

    if (error) {
        console.error('Error fetching users:', error);
    }
    else{
       return data
    }
};

export const deleteUsers = async (selectedKeys: string | number):Promise<any> => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', 1);
    if (error) {
        console.error('Error deleting users:', error);
    }
    else{
        console.log(data);
        return data
    }

};
export const projectcolumns = [
    {name: "ID", uid: "id"},
    {name: "NUME", uid: "name"},
    {name: "Descriere", uid: "description"},
    {name: "Statut", uid: "status"},
    {name: "Data Inceperii" , uid: "start_date"},
    {name: "Data Finalizarii" , uid: "end_date"},
];