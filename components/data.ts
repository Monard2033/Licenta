
import {createClient} from "@/utils/supabase/client";

export const usercolumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NUME", uid: "name", sortable: true},
    {name: "VARSTA", uid: "age", sortable: true},
    {name: "ROL", uid: "role", sortable: true},
    {name: "ECHIPA", uid: "team", sortable: true},
    {name: "EMAIL", uid: "email" , sortable: true},
    {name: "ACTIUNI", uid: "actions" ,sortable: true},
    {name: "avatar", uid: "avatar", sortable: true},
];

export const statusOptions = [
    {name: "Activ", uid: "active"},
    {name: "Lucreaza", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];

export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .select('*');
        return data
};


