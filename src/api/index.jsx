import ajax from './ajax'
export const reqLogin = (username, password) => ajax('/users/login',{username,password},"POST")
export const reqAddUser = (user) => ajax('/manage/user/add', user, "POST")
//获取一级二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, "POST")
//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName }, "POST")
//删除分类
export const reqDeleteCategory = (categoryId) => ajax('/manage/category/delete', { categoryId }, "POST")
//获取商品列表
export const reqItems = (pageNumber, pageSize) => ajax('/manage/item/list', { pageNumber, pageSize })
//搜索商品分页列表
export const reqSearchItems = ({ pageNumber, pageSize, searchName, searchType }) => ajax('/manage/item/search', { 
    pageNumber, 
    pageSize,
    [searchType]:searchName
    //[]是动态变化的,如果它的值是searchbyname,那么就变成searchbyname:searchName;如果它的值是searchbydesc,那么就变成searchbydesc:searchName
})
//获取一级二级分类名称
export const reqCategoryName = (categoryId) => ajax('/manage/category/name', { categoryId })
//更新item状态
export const reqUpdateItemsStatus = (itemId, itemStatus) => ajax('/manage/item/update_status', { itemId, itemStatus }, "POST")
//delete imgs
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, "POST")
//add item or update item
export const reqAddOrUpdateItem = (item) => ajax(`/manage/item/${item._id ? 'update' : 'add'}`, { item }, "POST");
//获取role分类的列表
export const reqRoles = () => ajax('/manage/role/list')
//添加role
export const reqAddRole = (name,time) => ajax('/manage/role/add', { name,time }, "POST")
//修改role name
export const reqUpdateRoleName = (roleId, name) => ajax('/manage/role/update', { roleId, name }, "POST")
//删除role
export const reqDeleteRole = (roleId) => ajax('/manage/role/delete', { roleId}, "POST")
//修改role auth
export const reqUpdateRoleAuth = (roleId, menus, time) => ajax('/manage/role/update_auth', { roleId, menus, time }, "POST")
//获取employee分类的列表
export const reqEmployees = () => ajax('/manage/employee/list')
//添加employee
export const reqAddEmployee = (employee) => ajax('/manage/employee/add', { employee }, "POST")
//update employee
export const reqUpdateEmployee = (employeeId, employee) => ajax('/manage/employee/update', { employeeId,employee }, "POST")
//delete employee
export const reqDeleteEmployee = (employeeId) => ajax('/manage/employee/delete', { employeeId }, "POST")
//获取order分页列表
export const reqOrders = (pageNumber, pageSize) => ajax('/manage/order/list', { pageNumber, pageSize })
//搜索order分页列表
export const reqSearchOrders = ({ pageNumber, pageSize, orderId }) => ajax('/manage/order/search', { pageNumber, pageSize, orderId })
//删除分类
export const reqDeleteOrder = (orderId) => ajax('/manage/order/delete', { orderId }, "POST")
//get sale ranks
export const reqOrdersRank = () => ajax('/manage/order/list_rank')
//获取StorageCategory的列表
export const reqStorageCategory = () => ajax('/manage/storage/category_list')
//添加StorageCategory
export const reqAddStorageCategory = (storageCategory) => ajax('/manage/storage/category_add', { storageCategory }, "POST")
//修改StorageCategory
export const reqUpdateStorageCategory = (storageCategoryId, storageCategory) => ajax('/manage/storage/category_update', { storageCategoryId, storageCategory }, "POST")
//删除StorageCategory
export const reqDeleteStorageCategory = (storageCategoryId) => ajax('/manage/storage/category_delete', { storageCategoryId }, "POST")
export const reqStorageItems = (pageNumber, pageSize) => ajax('/manage/storage/item_list', { pageNumber, pageSize })
//添加StorageCategory
export const reqAddOrUpdateStorageItem = (storageItem) => ajax(`/manage/storage/${storageItem._id?'item_update':'item_add'}`, { storageItem }, "POST")
//删除StorageCategory
export const reqDeleteStorageItem = (storageItemId) => ajax('/manage/storage/item_delete', { storageItemId }, "POST")
//搜索商品分页列表
export const reqSearchStorageItems = ({ pageNumber, pageSize, searchName, searchType }) => ajax('/manage/storage/item_search', {
    pageNumber,
    pageSize,
    [searchType]: searchName
    //[]是动态变化的,如果它的值是searchbyname,那么就变成searchbyname:searchName;如果它的值是searchbydesc,那么就变成searchbydesc:searchName
})