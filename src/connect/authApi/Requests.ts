export type SignInEmailRequest = {
    email: string
    password: string
}

export type SignUpEmailRequest = {
    nickname: string
    email: string
    phoneNumber: string
    password: string
}

export type ActivationRequest = {
    code: string
}

export type ForgotPasswordRequest = {
    email: string
}

export type ActivateNewPasswordRequest = {
    password: string
    email: string
}