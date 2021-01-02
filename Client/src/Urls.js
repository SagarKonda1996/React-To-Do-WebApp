export const routes={
    todo:"todo",
    label:"label",
    user:"loadUser"
}
export const baseUrl=process.env.REACT_APP_API_BaseUrl
export const Urls={
    todo:`${baseUrl}/${routes.todo}`,
    label:`${baseUrl}/${routes.label}`,
    loadUser:`${baseUrl}/${routes.user}`
    
}