import { Button } from '@mui/material';

const ButtonComponent = ({
  variant,
  color,
  children,
}) => (
  <Button variant={variant} sx={{ backgroundColor: color }}>{children}</Button>
);

export default ButtonComponent;
