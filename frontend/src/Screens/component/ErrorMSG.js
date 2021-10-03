import { BiError } from 'react-icons/bi';
const ErrorMsg = (props) => {
  return (
    <label className="text-error text-xs flex mt-1 ml-1">
      <BiError size="16" className="text-error mr-1" />
      {props.Text}
    </label>
  );
};
export default ErrorMsg;
