export interface AboutState {
    data: string;
    fetching: boolean
}

export interface CombinedState {
    about: AboutState
}
