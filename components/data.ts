
import {createClient} from "@/utils/supabase/client";

export const usercolumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NUME", uid: "name", sortable: true},
    {name: "EMAIL", uid: "email" , sortable: true},
    {name: "ROL", uid: "role", sortable: true},
    {name: "ECHIPA", uid: "team", sortable: true},
    {name: "PROIECT", uid: "project_name", sortable: true},
    {name: "ACTIUNI", uid: "actions"},
];


export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .select('*');
        return data
};


