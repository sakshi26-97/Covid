import { ActionUnion, createAction, ThunkAction } from '../utils/redux';

export enum AboutActionTypes {
    GET_ABOUT = 'GET_ABOUT',
    GET_ABOUT_SUCCESS = 'GET_ABOUT_SUCCESS',
    GET_ABOUT_FAILED = 'GET_ABOUT_FAILED',
}

const aboutActions = {
    getAbout: () => createAction(AboutActionTypes.GET_ABOUT),
    getAboutSuccess: (data: string) => createAction(AboutActionTypes.GET_ABOUT_SUCCESS, { data }),
    getAboutFailed: (error: any) => createAction(AboutActionTypes.GET_ABOUT_FAILED, { error }),
};

export type AboutActions = ActionUnion<typeof aboutActions>;

export const getAboutAsync = (): ThunkAction => async (dispatch): Promise<void> => {
    dispatch(aboutActions.getAbout());

    try {
        dispatch(aboutActions.getAboutSuccess('This is an about data'));
    } catch (error) {
        dispatch(aboutActions.getAboutFailed(error));
    }
};
