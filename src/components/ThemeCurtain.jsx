import React from 'react';

const ThemeCurtain = ({ theme }) => {
    return (
        <div className={`curtain ${theme === 'dark' ? 'active' : ''}`} />
    );
};

export default ThemeCurtain;
