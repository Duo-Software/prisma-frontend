import React from 'react';

type InputPadraoProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerStyle?: React.CSSProperties;
};

const inputStyle: React.CSSProperties = {
  width: "80%",
  padding: 8,
  marginTop: 4,
};

export const InputPadrao: React.FC<InputPadraoProps> = ({
  label,
  containerStyle,
  style,
  ...rest
}) => (
  <div style={containerStyle}>
    {label && <label style={{marginBottom: 4, display: "block"}}>{label}</label>}
    <input
      style={{ ...inputStyle, ...style }}
      {...rest}
    />
  </div>
);