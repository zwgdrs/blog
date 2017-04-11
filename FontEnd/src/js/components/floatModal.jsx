import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/modules/floatModal.scss';

@CSSModules(styles, {
    allowMultiple: true
})
class FloatModal extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {text} = this.props
        return (
            <div styleName="container">
                {text}
            </div>
        );
    }
}
FloatModal.propTypes = {
    text: PropTypes.string
};

export default FloatModal