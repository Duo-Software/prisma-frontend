import React, {type ReactNode, type FormEvent } from 'react';
import styled from 'styled-components';
import { ButtonStyled } from '../layout/DefaultComponents';

interface FormPadraoProps {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
    submitLoadingLabel?: string;
    onCancel?: () => void;
    cancelLabel?: string;
    encType?: string;
    className?: string;
    showActions?: boolean;
    actionsAlignment?: 'left' | 'center' | 'right';
    gap?: number;
    padding?: number;
}

const StyledForm = styled.form<{
    $gap?: number;
    $padding?: number;
}>`
    display: flex;
    flex-direction: column;
    gap: ${props => props.$gap || 16}px;
    padding: ${props => props.$padding || 16}px;
    top: ${props => props.theme.sizes.headerHeight};
    left: ${props => props.theme.sizes.sidebarWidthCollapsed};
    right: 0;
    bottom: 0;
    width: calc(70vw - ${props => props.theme.sizes.sidebarWidthCollapsed});
    height: calc(60vh - ${props => props.theme.sizes.headerHeight});
    margin: 16px;
    padding-left: 36px;
    z-index: 100;
    transition: left ${props => props.theme.transition}, width ${props => props.theme.transition};
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: ${props => props.theme.borderRadius};

`;

const ActionsContainer = styled.div<{
    $alignment?: 'left' | 'center' | 'right';
}>`
  display: flex;
  justify-content: ${props => {
    switch (props.$alignment) {
        case 'left': return 'flex-start';
        case 'center': return 'center';
        default: return 'flex-end';
    }
}};
  gap: 8px;
  margin-top: 16px;
`;

const CancelButton = styled(ButtonStyled)`
  background: ${({ theme }) => theme.colors.secondary || '#6c757d'};
  
  &:hover {
    background: ${({ theme }) =>
    theme.colors.surface || theme.colors.secondary || '#5a6268'};
  }
`;

const FormPadrao: React.FC<FormPadraoProps> = ({
                                                   children,
                                                   onSubmit,
                                                   isSubmitting = false,
                                                   submitLabel = 'Salvar',
                                                   submitLoadingLabel = 'Salvando...',
                                                   onCancel,
                                                   cancelLabel = 'Cancelar',
                                                   encType,
                                                   className,
                                                   showActions = true,
                                                   actionsAlignment = 'right',
                                                   gap = 16,
                                                   padding = 16,
                                               }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <StyledForm
            onSubmit={handleSubmit}
            encType={encType}
            className={className}
            $gap={gap}
            $padding={padding}
        >
            {children}

            {showActions && (
                <ActionsContainer $alignment={actionsAlignment}>
                    {onCancel && (
                        <CancelButton
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            {cancelLabel}
                        </CancelButton>
                    )}

                    <ButtonStyled
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? submitLoadingLabel : submitLabel}
                    </ButtonStyled>
                </ActionsContainer>
            )}
        </StyledForm>
    );
};

export default FormPadrao;