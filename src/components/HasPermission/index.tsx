import { useEffect, useState } from "react";
import { getRolePermissionListAPI } from "@/api/Role";
import { Permission } from "@/types/app/permission";
import { useUserStore } from '@/stores'

interface Props {
    code: string;
    children: React.ReactNode;
}

export default ({ code, children }: Props) => {
    const user = useUserStore(state => state.user);
    const [permissionList, setPermissionList] = useState<Permission[]>([]);

    // 获取权限列表
    const getPermissionList = async () => {
        const { data } = await getRolePermissionListAPI(user.id as number);
        setPermissionList(data);
    };

    useEffect(() => {
        getPermissionList();
    }, []);

    // 判断有没有这个权限
    const hasPermission = permissionList.some(permission => permission.name === code);

    return hasPermission ? children : null;
}