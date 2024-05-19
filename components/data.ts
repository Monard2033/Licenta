import {createClient} from "@/utils/supabase/client";
export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NUME", uid: "name", sortable: true},
    {name: "VARSTA", uid: "age", sortable: true},
    {name: "ROL", uid: "role", sortable: true},
    {name: "ECHIPA", uid: "team"},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIUNI", uid: "actions"},
];
export const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];
export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('students')
        .select();

    if (error) {
        console.error('Error fetching users:', error);
    } else {
        console.log(data);
       return data
    }
};
