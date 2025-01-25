export interface User {
 id: number
 username: string
 email: string
 firstName: string
 lastName: string
 role: UserRole
 isActive: boolean
 lastLogin?: Date
 createdAt: Date
 updatedAt: Date
}

export enum UserRole {
 ADMIN = 'ADMIN',
 MANAGER = 'MANAGER', 
 STAFF = 'STAFF'
}