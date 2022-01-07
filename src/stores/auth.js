import create from "zustand"

export const useAuth = create(set => ({
    user : null,
    token: null,
    setUser : user => set(_ =>({ user })),
    setToken: token => set(_ => ({token}))
}))