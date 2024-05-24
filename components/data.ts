import {createClient} from "@/utils/supabase/client";
import {ChipProps} from "@nextui-org/react";
export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NUME", uid: "name", sortable: true},
    {name: "VARSTA", uid: "age", sortable: true},
    {name: "ROL", uid: "role", sortable: true},
    {name: "ECHIPA", uid: "team"},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIUNI", uid: "actions"},
    {name: "avatar", uid: "avatar", sortable: true},
];
//export a function that return the column status from supabase
export const statusOptions = [
    {name: "Activ", uid: "active"},
    {name: "Lucreaza", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
export const fetchUsers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('users')
        .select("*");

    if (error) {
        console.error('Error fetching users:', error);
    }
    else{
        console.log(data);
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
