import React from 'react';
import { useMediaQueryContext } from 'src/App';
import HeaderBar from '../HeaderBar';
import SearchForm from "../SearchForm";
import { Action } from "../../App";

type Props = {
    dispatch: React.Dispatch<Action>
    state: any
};

export const LivePageForm: React.FC<Props> = (props: Props) => {

    const deviceType = useMediaQueryContext();

    return (
        <React.Fragment>
            <HeaderBar dispatch={props.dispatch} state={props.state} />
            <SearchForm />
        </React.Fragment>
    );
}