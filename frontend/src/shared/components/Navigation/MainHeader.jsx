import PropTypes from "prop-types";

const MainHeader = props => {
  return (
    <header>
    <h5>MainHeader</h5>
    {props.children} 
    </header> 
  )
}

MainHeader.propTypes = {
  children: PropTypes.node
}

export default MainHeader