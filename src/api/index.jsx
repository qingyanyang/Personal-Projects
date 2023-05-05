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
