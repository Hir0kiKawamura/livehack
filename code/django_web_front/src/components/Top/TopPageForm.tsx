import React from 'react';
import { useMediaQueryContext } from '../../App';
import JapanMap from '../JapanMap';
import HeaderBar from '../HeaderBar';
import { Action } from "../../App";

type Props = {
    dispatch: React.Dispatch<Action>
    state: any
};

export const TopPageForm: React.FC<Props> = (props: Props) => {

    const deviceType = useMediaQueryContext();

    return (
        <React.Fragment>
            <HeaderBar dispatch={props.dispatch} state={props.state} />
            <JapanMap deviceType={deviceType} />
        </React.Fragment>
    );
}