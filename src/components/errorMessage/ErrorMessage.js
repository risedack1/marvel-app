import error from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <div>
            <img className='errorMessage' src={error} alt="error" />
        </div>
    )
}

export default ErrorMessage;