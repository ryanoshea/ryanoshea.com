import { useEffect } from 'react';
import './SometimesLabel.scss';
import classNames from 'classnames';
import { AppDispatchParam, ACTIONS } from '../../State/AppState';

const SometimesLabel = (props: {
    identifier: string;
    selectedId: string;
    listItem: React.RefObject<HTMLLIElement>;
    dispatch: React.Dispatch<AppDispatchParam>;
}) => {
    const { selectedId, identifier: id, listItem, dispatch } = props;

    useEffect(() => {
        const setSelectedId = () => {
            dispatch({
                type: ACTIONS.SET_SELECTED_SOMETIMES_LABEL,
                payload: id,
            });
        };

        const elem = listItem.current;
        if (elem) {
            elem.addEventListener('mouseover', setSelectedId);
        }

        return () => {
            if (elem) {
                elem.removeEventListener('mouseover', setSelectedId);
            }
        };
    }, [dispatch, id, listItem]);

    return (
        <>
            <span
                className={classNames('sometimes', {
                    selected: selectedId === id,
                })}
            >
                You can find me on
            </span>{' '}
        </>
    );
};

export default SometimesLabel;
