import './ErrorMessage.css';
import { useParams } from 'react-router-dom';

const ErrorMessage = () => {
  var { status } = useParams();
  status = status || 404;
  const messages = errorMessages[status];
  return (
    <div className='error'>
      <h2>{`- ${status} ERROR -`}</h2>
      {messages.map((message, idx) => (
        <p key={`err_${idx}`}>{`${message}`}</p>
      ))}
    </div>
  );
};

export default ErrorMessage;

var errorMessages = {
  404: ['Page Not Found'],
  500: [
    'So sorry, something went wrong on our end.',
    'Reload the page and try again.',
  ],
};
