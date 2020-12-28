import * as React from 'react';

import container from 'src/containers/ImportShow';
import { CreateShowButton } from './CreateShowButton';
import { AddShowModal } from './old/AddShowModal';
import CreateShowModal from './old/Create';
import { ButtonWrapper, HeaderWrapper, PinkButton, Title } from './style';

interface Props {
    isOpen: boolean;
    isFetching: boolean;
    open: () => void;
    close: () => void;
    importShow: () => void;
    handleSubmit: () => void;
}

export const HeaderPure: React.FC<Props> = ({ isOpen, open, close, isFetching, importShow, handleSubmit }) => (
    <>
        <HeaderWrapper>
            <Title>My Podcasts</Title>

            <ButtonWrapper>
                <CreateShowButton />

                <PinkButton onClick={open}>Add Show</PinkButton>
            </ButtonWrapper>
        </HeaderWrapper>
        <AddShowModal
            isOpen={isOpen}
            close={close}
            handleSubmit={handleSubmit}
            isFetching={isFetching}
            importShow={importShow}
        />

        <CreateShowModal />
    </>
);

export const Header = container(HeaderPure);
