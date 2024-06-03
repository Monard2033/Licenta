
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

export const sessioncolumns = [
    {name: "ID", uid: "id", sortable: true},
    //{name: "SESIUNE", uid: "session_name", sortable: true},
    {name: "NUME", uid: "student_name" , sortable: true},
    {name: "ECHIPA", uid: "team_name", sortable: true},
    //{name: "PROIECT", uid: "project_name", sortable: true},
    {name: "NOTA", uid: "grade", sortable: true},
    {name: "PREZENTA", uid: "attendance"},
    {name: "DATA", uid: "date"},
    {name: "ACTIUNI", uid: "actions"},
];


export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .select('*');
        return data
};


