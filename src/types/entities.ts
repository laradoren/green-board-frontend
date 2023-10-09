export type Teacher = {
    id: string
    name: string
    surname: string
    lastname: string
    email: string
}

export type Subject = {
    id: string
    title: string
    tasks: Task[]
}

export type Task = {
    id: string
    title: string
    description: string
    file: string
    deadline: string
}

export type HomeTask = {
    id: string
    student: string
    file: string
    date: string
    status: "success"|"pending"|"fail"
}

export type Group = {
    id: string
    title: string
    students: Student[]
}

export type Student = {
    id: string
    name: string
    surname: string
    lastname: string
    currentScore: string
    firstAttestation: boolean|null
    secondAttestation: boolean|null
    result: string

}
