import React from 'react';
import styled from 'styled-components';
import { FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
      <HeaderContainer>
        <ActionsContainer>
          <ThemeToggleButton $themeMode={themeMode} onClick={toggleTheme}>
              <ToggleDisplay>
                  {themeMode === 'dark' ? (
                      <FiSun color="#FFD600" size={36} />
                  ) : (
                      <FiMoon color="#2196F3" size={36} />
                  )}
              </ToggleDisplay>
          </ThemeToggleButton>
          <ProfileButton>
            <ProfileAvatar>
              <FiUser />
            </ProfileAvatar>
          </ProfileButton>
        </ActionsContainer>
      </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: ${props => props.theme.sizes.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background-color: ${props => props.theme.colors.headerBackground};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: background-color ${props => props.theme.transition};
`;


const ActionsContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin-left: auto;
`;

const ActionButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ThemeToggleButton = styled(ActionButton)<{ $themeMode: string }>`
    margin-left: 0.5rem;
`;

const ProfileButton = styled(ActionButton)`
  margin-left: 0.5rem;
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primaryLight};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleDisplay = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 1%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;