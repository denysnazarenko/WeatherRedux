import './spinner.scss';

const Spinner = ({ className }) => {
  return (
    <svg className={className} style={{ background: 'none', display: 'block' }} width="54" height="54" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle></g></svg>
  )
}

export default Spinner;